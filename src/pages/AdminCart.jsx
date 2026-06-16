import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/AdminCart";
import { fetchAllCarts, deleteCart } from "../Features/Cart/cartSlice";
import { formatPrice } from "../utils/formatPrice";
import {
  FaSearch,
  FaEye,
  FaTrash,
  FaShoppingCart,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaExclamationTriangle,
} from "react-icons/fa";

const getCartTotal = (cart) =>
  cart.cartItems.reduce(
    (total, meal) =>
      total + meal.ingredients.reduce((sum, ing) => sum + ing.price * ing.quantity, 0),
    0
  );

const shortId = (id) => String(id).slice(-8).toUpperCase();

const AdminCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { carts, totalCarts, numOfPages, loading } = useSelector(
    (store) => store.cart
  );

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);
  const [viewCart, setViewCart] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchCarts = useCallback(
    (params) => dispatch(fetchAllCarts(params)),
    [dispatch]
  );

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const s = params.get("search") || "";
    const so = params.get("sort") || "latest";
    const p = Number(params.get("page")) || 1;
    setSearch(s);
    setSort(so);
    setPage(p);
    fetchCarts({ search: s, sort: so, page: p });
  }, [location.search, fetchCarts]);

  const applyFilters = (overrides = {}) => {
    const next = { search, sort, page, ...overrides };
    if ("search" in overrides || "sort" in overrides) next.page = 1;
    const params = new URLSearchParams();
    if (next.search) params.set("search", next.search);
    if (next.sort !== "latest") params.set("sort", next.sort);
    if (next.page > 1) params.set("page", String(next.page));
    navigate(`?${params.toString()}`);
  };

  const handleClear = () => {
    setSearch("");
    setSort("latest");
    navigate("?");
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await dispatch(deleteCart(deleteTarget)).unwrap();
      toast.success("Cart deleted successfully");
      setDeleteTarget(null);
      fetchCarts({ search, sort, page });
    } catch (err) {
      toast.error(err?.message || "Failed to delete cart");
    } finally {
      setDeleting(false);
    }
  };

  const pageList = (() => {
    if (numOfPages <= 7) return Array.from({ length: numOfPages }, (_, i) => i + 1);
    const pages = [1];
    if (page > 3) pages.push("...");
    for (
      let i = Math.max(2, page - 1);
      i <= Math.min(numOfPages - 1, page + 1);
      i++
    )
      pages.push(i);
    if (page < numOfPages - 2) pages.push("...");
    pages.push(numOfPages);
    return pages;
  })();

  return (
    <Wrapper>
      {/* Page header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Cart Management</h1>
          <p className="page-sub">
            {totalCarts} cart{totalCarts !== 1 ? "s" : ""} in total
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="filter-bar">
        <div className="search-wrap">
          <FaSearch className="search-icon" />
          <input
            className="search-input"
            type="text"
            placeholder="Search by customer name or item…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyFilters({ search })}
          />
        </div>
        <select
          className="filter-select"
          value={sort}
          onChange={(e) => applyFilters({ sort: e.target.value })}
        >
          <option value="latest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="total-highest">Total: High → Low</option>
          <option value="total-lowest">Total: Low → High</option>
        </select>
        <button className="search-btn" onClick={() => applyFilters({ search })}>
          Search
        </button>
        <button className="clear-btn" onClick={handleClear}>
          Clear
        </button>
      </div>

      {/* Table card */}
      <div className="table-card">
        {loading ? (
          <div className="loading-state">
            <div className="spinner" />
            <span>Loading carts…</span>
          </div>
        ) : carts.length === 0 ? (
          <div className="empty-state">
            <FaShoppingCart className="empty-icon" />
            <p>No carts found</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table className="carts-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Cart ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Last Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {carts.map((cart, idx) => {
                  const total = getCartTotal(cart);
                  const mealCount = cart.cartItems.length;
                  const ingCount = cart.cartItems.reduce(
                    (s, m) => s + m.ingredients.length,
                    0
                  );
                  return (
                    <tr key={cart._id}>
                      <td className="row-num">{(page - 1) * 10 + idx + 1}</td>
                      <td>
                        <span className="mono">#{shortId(cart._id)}</span>
                      </td>
                      <td>
                        <div className="customer-cell">
                          <span className="customer-name">
                            {cart.userId?.name || "—"}
                          </span>
                          <span className="customer-email">
                            {cart.userId?.email || "—"}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className="items-badge">
                          {mealCount} meal{mealCount !== 1 ? "s" : ""} ·{" "}
                          {ingCount} item{ingCount !== 1 ? "s" : ""}
                        </span>
                      </td>
                      <td className="total-cell">{formatPrice(total)}</td>
                      <td className="date-cell">
                        {new Date(cart.updatedAt).toLocaleDateString("en-NG", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td>
                        <div className="action-row">
                          <button
                            className="view-btn"
                            title="View cart details"
                            onClick={() => setViewCart(cart)}
                          >
                            <FaEye />
                          </button>
                          <button
                            className="del-btn"
                            title="Delete cart"
                            onClick={() => setDeleteTarget(cart._id)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {numOfPages > 1 && (
        <div className="pagination">
          <button
            className="page-nav"
            onClick={() => applyFilters({ page: page - 1 })}
            disabled={page === 1}
          >
            <FaChevronLeft />
          </button>
          {pageList.map((p, i) =>
            p === "..." ? (
              <span key={`e-${i}`} className="ellipsis">
                …
              </span>
            ) : (
              <button
                key={p}
                className={`page-btn${p === page ? " active" : ""}`}
                onClick={() => applyFilters({ page: p })}
              >
                {p}
              </button>
            )
          )}
          <button
            className="page-nav"
            onClick={() => applyFilters({ page: page + 1 })}
            disabled={page === numOfPages}
          >
            <FaChevronRight />
          </button>
          <span className="page-info">
            {page} / {numOfPages}
          </span>
        </div>
      )}

      {/* ── View Cart Modal ── */}
      {viewCart && (
        <div className="modal-overlay" onClick={() => setViewCart(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2 className="modal-title">Cart Details</h2>
                <p className="modal-sub">
                  #{shortId(viewCart._id)} &middot;{" "}
                  {viewCart.userId?.name || "Unknown customer"}
                </p>
              </div>
              <button className="modal-close" onClick={() => setViewCart(null)}>
                <FaTimes />
              </button>
            </div>

            <div className="modal-body">
              {/* Customer info */}
              <div className="modal-section">
                <h3 className="section-heading">Customer</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Name</span>
                    <span className="info-val">{viewCart.userId?.name || "—"}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Email</span>
                    <span className="info-val">
                      {viewCart.userId?.email || "—"}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Created</span>
                    <span className="info-val">
                      {new Date(viewCart.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Last Updated</span>
                    <span className="info-val">
                      {new Date(viewCart.updatedAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Cart items */}
              <div className="modal-section">
                <h3 className="section-heading">
                  Cart Items ({viewCart.cartItems.length})
                </h3>
                <div className="items-list">
                  {viewCart.cartItems.map((meal, mIdx) => {
                    const mealTotal = meal.ingredients.reduce(
                      (s, ing) => s + ing.price * ing.quantity,
                      0
                    );
                    return (
                      <div key={meal.mealID || mIdx} className="meal-block">
                        <div className="meal-block-header">
                          <span className="meal-block-name">{meal.name}</span>
                          <span className="meal-block-total">
                            {formatPrice(mealTotal)}
                          </span>
                        </div>
                        {meal.ingredients.map((ing, iIdx) => (
                          <div key={iIdx} className="ing-row">
                            <span className="ing-name">{ing.name}</span>
                            <span className="ing-qty">×{ing.quantity}</span>
                            <span className="ing-price">
                              {formatPrice(ing.price * ing.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Summary */}
              <div className="modal-summary">
                <div className="summary-row">
                  <span>Total Meals</span>
                  <strong>{viewCart.cartItems.length}</strong>
                </div>
                <div className="summary-row">
                  <span>Total Items</span>
                  <strong>
                    {viewCart.cartItems.reduce(
                      (s, m) => s + m.ingredients.length,
                      0
                    )}
                  </strong>
                </div>
                <div className="summary-row grand">
                  <span>Grand Total</span>
                  <strong>{formatPrice(getCartTotal(viewCart))}</strong>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn-close-modal"
                onClick={() => setViewCart(null)}
              >
                Close
              </button>
              <button
                className="btn-delete-modal"
                onClick={() => {
                  setViewCart(null);
                  setDeleteTarget(viewCart._id);
                }}
              >
                <FaTrash /> Delete Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm Modal ── */}
      {deleteTarget && (
        <div
          className="modal-overlay"
          onClick={() => !deleting && setDeleteTarget(null)}
        >
          <div
            className="modal confirm-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="confirm-icon">
              <FaExclamationTriangle />
            </div>
            <h2 className="confirm-title">Delete Cart?</h2>
            <p className="confirm-text">
              This action cannot be undone. The cart and all its items will be
              permanently removed.
            </p>
            <div className="confirm-actions">
              <button
                className="btn-cancel"
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                className="btn-confirm-delete"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting…" : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default AdminCart;
