import { useState } from "react";
import { useLoaderData, useNavigate, useLocation } from "react-router-dom";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  FiSearch, FiX, FiFilter, FiEye, FiChevronLeft, FiChevronRight,
  FiTruck, FiPackage, FiCheckCircle, FiClock, FiXCircle, FiDollarSign,
} from "react-icons/fi";
import { FaMapMarkerAlt } from "react-icons/fa";
import Wrapper from "../assets/wrappers/AdminOrders";
import { ORDERS, DELIVERY } from "../utils/constants";
import customFetch from "../utils/customFetch";
import Loading from "../components/Loading";

/* ── helpers ─────────────────────────────────────────── */
const fmt = (n) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency", currency: "NGN", maximumFractionDigits: 0,
  }).format(n || 0);

const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-NG", {
    day: "numeric", month: "short", year: "numeric",
  });

const ORDER_STATUS_META = {
  Pending:    { bg: "#fef9c3", color: "#854d0e", icon: <FiClock /> },
  Processing: { bg: "#dbeafe", color: "#1e40af", icon: <FiPackage /> },
  Processed:  { bg: "#ffedd5", color: "#9a3412", icon: <FiPackage /> },
  Delivered:  { bg: "#dcfce7", color: "#166534", icon: <FiCheckCircle /> },
  Cancelled:  { bg: "#fee2e2", color: "#991b1b", icon: <FiXCircle /> },
};

const DELIVERY_STATUS_META = {
  Scheduled:          { bg: "#e0f2fe", color: "#0369a1" },
  Clearing:           { bg: "#fef3c7", color: "#92400e" },
  "Out for Delivery": { bg: "#ede9fe", color: "#5b21b6" },
  Delivered:          { bg: "#dcfce7", color: "#166534" },
  Failed:             { bg: "#fee2e2", color: "#991b1b" },
};

const StatusBadge = ({ value, meta }) => {
  const m = meta[value] || { bg: "#f1f5f9", color: "#475569" };
  return (
    <span className="status-badge" style={{ background: m.bg, color: m.color }}>
      {m.icon && <span className="badge-icon">{m.icon}</span>}
      {value}
    </span>
  );
};

/* ── component ───────────────────────────────────────── */
const AdminOrders = () => {
  const queryClient = useQueryClient();
  const navigate    = useNavigate();
  const location    = useLocation();

  const qp = new URLSearchParams(location.search);
  const [filters, setFilters] = useState({
    search:   qp.get("search")   || "",
    status:   qp.get("status")   || "all",
    delivery: qp.get("delivery") || "all",
    sort:     qp.get("sort")     || "latest",
    page:     Number(qp.get("page")) || 1,
  });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updating, setUpdating]           = useState({});

  /* fetch */
  const { data: ordersData, isLoading } = useQuery({
    queryKey: ["adminOrders", filters],
    queryFn: async () => {
      const p = new URLSearchParams();
      Object.entries(filters).forEach(([k, v]) => {
        if (v && v !== "all") p.append(k, v);
      });
      const { data } = await customFetch.get(`/orders?${p.toString()}`);
      return data;
    },
  });

  const { orders = [], totalOrders = 0, numOfPages = 1 } = ordersData || {};

  /* filter helpers */
  const setFilter = (field, value) => {
    const next = { ...filters, [field]: value, ...(field !== "page" ? { page: 1 } : {}) };
    setFilters(next);
    const p = new URLSearchParams();
    Object.entries(next).forEach(([k, v]) => { if (v && v !== "all") p.append(k, v); });
    navigate(`?${p.toString()}`);
  };

  const clearFilters = () => {
    setFilters({ search: "", status: "all", delivery: "all", sort: "latest", page: 1 });
    navigate("?");
  };

  const hasActiveFilters =
    filters.search || filters.status !== "all" || filters.delivery !== "all";

  /* update helpers */
  const withUpdating = async (id, key, fn) => {
    setUpdating((p) => ({ ...p, [`${id}-${key}`]: true }));
    try { await fn(); } finally {
      setUpdating((p) => ({ ...p, [`${id}-${key}`]: false }));
      queryClient.invalidateQueries({ queryKey: ["adminOrders"] });
    }
  };

  const updateOrderStatus = (id, status) =>
    withUpdating(id, "status", async () => {
      await customFetch.patch(`/orders/${id}/status`, { status });
      toast.success("Order status updated");
      if (selectedOrder?._id === id) setSelectedOrder((p) => ({ ...p, status }));
    });

  const updateDelivery = (id, deliveryStatus) =>
    withUpdating(id, "delivery", async () => {
      await customFetch.patch(`/orders/${id}/delivery`, { deliveryStatus });
      toast.success("Delivery status updated");
      if (selectedOrder?._id === id) setSelectedOrder((p) => ({ ...p, deliveryStatus }));
    });

  const togglePayment = (id, isPaid) =>
    withUpdating(id, "payment", async () => {
      await customFetch.patch(`/orders/${id}/payment`, { isPaid });
      toast.success(isPaid ? "Marked as paid" : "Marked as unpaid");
      if (selectedOrder?._id === id) setSelectedOrder((p) => ({ ...p, isPaid }));
    });

  /* ── render ── */
  return (
    <Wrapper>
      {/* Page header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Order Management</h1>
          <p className="page-sub">
            {isLoading ? "Loading…" : `${totalOrders} total order${totalOrders !== 1 ? "s" : ""}`}
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="filter-bar">
        <div className="search-wrap">
          <FiSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by customer name or tracking number…"
            value={filters.search}
            onChange={(e) => setFilter("search", e.target.value)}
          />
          {filters.search && (
            <button className="search-clear" onClick={() => setFilter("search", "")}>
              <FiX />
            </button>
          )}
        </div>

        <div className="filter-row">
          <div className="select-wrap">
            <label>Order Status</label>
            <select value={filters.status} onChange={(e) => setFilter("status", e.target.value)}>
              <option value="all">All Statuses</option>
              {Object.values(ORDERS).map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="select-wrap">
            <label>Delivery</label>
            <select value={filters.delivery} onChange={(e) => setFilter("delivery", e.target.value)}>
              <option value="all">All Deliveries</option>
              {Object.values(DELIVERY).map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="select-wrap">
            <label>Sort By</label>
            <select value={filters.sort} onChange={(e) => setFilter("sort", e.target.value)}>
              <option value="latest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="amount-highest">Amount: High → Low</option>
              <option value="amount-lowest">Amount: Low → High</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button className="clear-btn" onClick={clearFilters}>
              <FiX /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="table-card">
        {isLoading ? (
          <Loading variant="admin-rows" />
        ) : orders.length === 0 ? (
          <div className="empty-state">
            <FiFilter size={40} />
            <p>No orders match your filters.</p>
            <button className="clear-btn" onClick={clearFilters}>Clear Filters</button>
          </div>
        ) : (
          <div className="table-wrap">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Order Status</th>
                  <th>Delivery</th>
                  <th>Payment</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const busyStatus   = updating[`${order._id}-status`];
                  const busyDelivery = updating[`${order._id}-delivery`];
                  const busyPayment  = updating[`${order._id}-payment`];

                  return (
                    <tr key={order._id}>
                      {/* Order ID + tracking */}
                      <td>
                        <p className="order-id">#{order._id.slice(-6).toUpperCase()}</p>
                        <p className="order-track">{order.trackingNumber}</p>
                      </td>

                      {/* Customer */}
                      <td>
                        <p className="customer-name">{order.shippingAddress?.fullName}</p>
                        <p className="customer-email">{order.userId?.email || ""}</p>
                      </td>

                      {/* Items count */}
                      <td>
                        <span className="items-count">
                          {order.cartItems?.length} meal{order.cartItems?.length !== 1 ? "s" : ""}
                        </span>
                      </td>

                      {/* Total */}
                      <td className="amount">{fmt(order.totalAmount)}</td>

                      {/* Order status */}
                      <td>
                        <select
                          className="inline-select"
                          value={order.status}
                          disabled={busyStatus}
                          onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                          style={{
                            background: ORDER_STATUS_META[order.status]?.bg,
                            color: ORDER_STATUS_META[order.status]?.color,
                          }}
                        >
                          {Object.values(ORDERS).map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>

                      {/* Delivery */}
                      <td>
                        <select
                          className="inline-select"
                          value={order.deliveryStatus}
                          disabled={busyDelivery}
                          onChange={(e) => updateDelivery(order._id, e.target.value)}
                          style={{
                            background: DELIVERY_STATUS_META[order.deliveryStatus]?.bg,
                            color: DELIVERY_STATUS_META[order.deliveryStatus]?.color,
                          }}
                        >
                          {Object.values(DELIVERY).map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>

                      {/* Payment toggle */}
                      <td>
                        <button
                          className={`pay-toggle ${order.isPaid ? "paid" : "unpaid"}`}
                          disabled={busyPayment}
                          onClick={() => togglePayment(order._id, !order.isPaid)}
                        >
                          <FiDollarSign />
                          {order.isPaid ? "Paid" : "Unpaid"}
                        </button>
                      </td>

                      {/* Date */}
                      <td className="date-cell">{fmtDate(order.createdAt)}</td>

                      {/* Actions */}
                      <td>
                        <button
                          className="view-btn"
                          onClick={() => setSelectedOrder(order)}
                          title="View details"
                        >
                          <FiEye />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {numOfPages > 1 && (
          <div className="pagination">
            <button
              className="page-btn"
              disabled={filters.page === 1}
              onClick={() => setFilter("page", filters.page - 1)}
            >
              <FiChevronLeft /> Prev
            </button>

            <div className="page-numbers">
              {Array.from({ length: numOfPages }, (_, i) => i + 1)
                .filter((n) => n === 1 || n === numOfPages || Math.abs(n - filters.page) <= 1)
                .reduce((acc, n, idx, arr) => {
                  if (idx > 0 && n - arr[idx - 1] > 1) acc.push("…");
                  acc.push(n);
                  return acc;
                }, [])
                .map((n, i) =>
                  n === "…" ? (
                    <span key={`dot-${i}`} className="dots">…</span>
                  ) : (
                    <button
                      key={n}
                      className={`page-num ${n === filters.page ? "active" : ""}`}
                      onClick={() => setFilter("page", n)}
                    >
                      {n}
                    </button>
                  )
                )}
            </div>

            <button
              className="page-btn"
              disabled={filters.page === numOfPages}
              onClick={() => setFilter("page", filters.page + 1)}
            >
              Next <FiChevronRight />
            </button>
          </div>
        )}
      </div>

      {/* ── Detail Modal ── */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>

            {/* Modal header */}
            <div className="modal-header">
              <div>
                <h2 className="modal-title">Order Details</h2>
                <div className="modal-meta">
                  <span className="modal-id">#{selectedOrder._id.slice(-8).toUpperCase()}</span>
                  <span className="modal-track">
                    <FiTruck /> {selectedOrder.trackingNumber}
                  </span>
                  <span className="modal-date">{fmtDate(selectedOrder.createdAt)}</span>
                </div>
              </div>
              <button className="modal-close" onClick={() => setSelectedOrder(null)}>
                <FiX />
              </button>
            </div>

            {/* Status badges row */}
            <div className="modal-badges">
              <StatusBadge value={selectedOrder.status} meta={ORDER_STATUS_META} />
              <StatusBadge value={selectedOrder.deliveryStatus} meta={DELIVERY_STATUS_META} />
              <span className={`pay-pill ${selectedOrder.isPaid ? "paid" : "unpaid"}`}>
                <FiDollarSign />
                {selectedOrder.isPaid
                  ? `Paid · ${fmtDate(selectedOrder.paidAt)}`
                  : "Payment Pending"}
              </span>
            </div>

            <div className="modal-body">
              {/* Left col */}
              <div className="modal-left">
                {/* Ordered items */}
                <section className="modal-section">
                  <h3 className="modal-section-title"><FiPackage /> Ordered Items</h3>
                  <div className="item-list">
                    {selectedOrder.cartItems.map((item, i) => {
                      const mealTotal = item.ingredients.reduce(
                        (s, ing) => s + ing.price * ing.quantity, 0
                      );
                      return (
                        <div key={i} className="item-row">
                          <img
                            src={item.image || "/placeholder-meal.jpg"}
                            alt={item.name}
                            className="item-img"
                          />
                          <div className="item-info">
                            <p className="item-name">{item.name}</p>
                            <ul className="ing-list">
                              {item.ingredients.map((ing, j) => (
                                <li key={j}>
                                  {ing.name} — {ing.quantity}{ing.unit || "g"}
                                  <span className="ing-price">{fmt(ing.price * ing.quantity)}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <p className="item-total">{fmt(mealTotal)}</p>
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* Shipping */}
                <section className="modal-section">
                  <h3 className="modal-section-title"><FaMapMarkerAlt /> Shipping Address</h3>
                  <div className="address-block">
                    <p className="addr-name">{selectedOrder.shippingAddress.fullName}</p>
                    <p>{selectedOrder.shippingAddress.address}</p>
                    <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.postalCode}</p>
                    <p>{selectedOrder.shippingAddress.country}</p>
                    <p className="addr-phone">{selectedOrder.shippingAddress.phone}</p>
                  </div>
                </section>
              </div>

              {/* Right col */}
              <div className="modal-right">
                {/* Order summary */}
                <section className="modal-section summary-section">
                  <h3 className="modal-section-title">Order Summary</h3>
                  <div className="summary-rows">
                    <div className="sum-row">
                      <span>Subtotal</span>
                      <span>{fmt(selectedOrder.totalAmount - selectedOrder.taxPrice - selectedOrder.shippingPrice)}</span>
                    </div>
                    <div className="sum-row">
                      <span>Tax (10%)</span>
                      <span>{fmt(selectedOrder.taxPrice)}</span>
                    </div>
                    <div className="sum-row">
                      <span>Shipping</span>
                      <span>{fmt(selectedOrder.shippingPrice)}</span>
                    </div>
                    <div className="sum-row total-row">
                      <strong>Total</strong>
                      <strong>{fmt(selectedOrder.totalAmount)}</strong>
                    </div>
                    <div className="sum-row">
                      <span>Payment Method</span>
                      <span className="capitalize">{selectedOrder.paymentMethod}</span>
                    </div>
                  </div>
                </section>

                {/* Update controls */}
                <section className="modal-section controls-section">
                  <h3 className="modal-section-title">Update Order</h3>

                  <div className="control-group">
                    <label>Order Status</label>
                    <select
                      value={selectedOrder.status}
                      disabled={updating[`${selectedOrder._id}-status`]}
                      onChange={(e) => updateOrderStatus(selectedOrder._id, e.target.value)}
                    >
                      {Object.values(ORDERS).map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div className="control-group">
                    <label>Delivery Status</label>
                    <select
                      value={selectedOrder.deliveryStatus}
                      disabled={updating[`${selectedOrder._id}-delivery`]}
                      onChange={(e) => updateDelivery(selectedOrder._id, e.target.value)}
                    >
                      {Object.values(DELIVERY).map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    className={`payment-action-btn ${selectedOrder.isPaid ? "is-paid" : "is-unpaid"}`}
                    disabled={updating[`${selectedOrder._id}-payment`]}
                    onClick={() => togglePayment(selectedOrder._id, !selectedOrder.isPaid)}
                  >
                    <FiDollarSign />
                    {selectedOrder.isPaid ? "Mark as Unpaid" : "Mark as Paid"}
                  </button>
                </section>
              </div>
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default AdminOrders;
