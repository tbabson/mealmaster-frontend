import { useState, useEffect } from "react";
import { useLoaderData, useNavigate, useLocation } from "react-router-dom";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import {
  FaUsers,
  FaUser,
  FaTrash,
  FaEye,
  FaEnvelope,
  FaCalendar,
  FaShoppingCart,
  FaBell,
  FaSearch,
  FaArrowLeft,
  FaShieldAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/AdminUsers";
import { adminUsersQuery } from "../actionsAndLoaders/AdminUsersLoader";
import Loading from "../components/Loading";
import { formatPrice } from "../utils/formatPrice";
import customFetch from "../utils/customFetch";

const ROLE_META = {
  admin: { bg: "#dcfce7", color: "#166534", Icon: FaShieldAlt },
  user:  { bg: "#f1f5f9", color: "#475569", Icon: FaUser },
};

const STATUS_COLORS = {
  pending:    { bg: "#fef9c3", color: "#854d0e" },
  processing: { bg: "#dbeafe", color: "#1e40af" },
  delivered:  { bg: "#dcfce7", color: "#166534" },
  cancelled:  { bg: "#fee2e2", color: "#991b1b" },
};

const AdminUsers = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const { searchValues = {} } = useLoaderData();

  const [showUserDetails, setShowUserDetails] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [filters, setFilters] = useState({
    search: searchValues.search || "",
    role: searchValues.role || "all",
    sort: searchValues.sort || "newest",
    page: Number(searchValues.page) || 1,
  });

  const {
    data: usersData,
    isLoading,
    error,
  } = useQuery({
    ...adminUsersQuery({
      search: filters.search,
      role: filters.role,
      sort: filters.sort,
      page: filters.page,
    }),
    keepPreviousData: true,
  });

  const {
    users = [],
    totalUsers = 0,
    numOfPages = 1,
    currentPage = 1,
  } = usersData || {};

  const {
    data: selectedUserData,
    isLoading: isLoadingUser,
    error: userError,
  } = useQuery({
    queryKey: ["user", selectedUserId],
    queryFn: async () => {
      if (!selectedUserId) return null;
      const response = await customFetch.get(`/users/${selectedUserId}`);
      return {
        user: response.data.user,
        orders: response.data.orders || [],
        cartItems: response.data.cartItems || [],
        reminders: response.data.reminders || [],
      };
    },
    enabled: !!selectedUserId && showUserDetails,
    retry: 1,
  });

  const selectedUser = selectedUserData?.user;
  const userOrders   = selectedUserData?.orders   || [];
  const userCartItems = selectedUserData?.cartItems || [];
  const userReminders = selectedUserData?.reminders || [];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setFilters({
      search: params.get("search") || "",
      role:   params.get("role")   || "all",
      sort:   params.get("sort")   || "newest",
      page:   Number(params.get("page")) || 1,
    });
  }, [location.search]);

  if ((showUserDetails && isLoadingUser) || isLoading) {
    return (
      <Wrapper>
        <Loading />
      </Wrapper>
    );
  }

  if (error || (showUserDetails && userError)) {
    return (
      <Wrapper>
        <div className="error-box">
          <h3>Something went wrong</h3>
          <p>{error?.message || userError?.message}</p>
          {userError && (
            <button className="back-btn" onClick={() => setShowUserDetails(false)}>
              <FaArrowLeft /> Back to Users
            </button>
          )}
        </div>
      </Wrapper>
    );
  }

  const handleFilterChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    if (field !== "page") newFilters.page = 1;

    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, val]) => {
      if (val && val !== "all" && val !== "") params.set(key, val);
    });

    setFilters(newFilters);
    navigate(`?${params.toString()}`);
  };

  const clearFilters = () => {
    setFilters({ search: "", role: "all", sort: "newest", page: 1 });
    navigate("");
  };

  const handleViewUser = (userId) => {
    setSelectedUserId(userId);
    setShowUserDetails(true);
  };

  const handleBackToUsers = () => {
    setShowUserDetails(false);
    setSelectedUserId(null);
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Delete this user? This cannot be undone.")) return;
    try {
      await customFetch.delete(`/users/${userId}`);
      toast.success("User deleted");
      queryClient.invalidateQueries(["adminUsers"]);
      if (showUserDetails) handleBackToUsers();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete user");
    }
  };

  const hasActiveFilters =
    filters.search || filters.role !== "all" || filters.sort !== "newest";

  /* ── Helpers ──────────────────────────────────────────────────── */
  const Avatar = ({ src, name, size = "sm" }) =>
    src ? (
      <img src={src} alt={name} className={`avatar-img ${size}`} />
    ) : (
      <div className={`avatar-init ${size}`}>
        {(name || "?").charAt(0).toUpperCase()}
      </div>
    );

  const cartItemPrice = (item) =>
    (item.ingredients || []).reduce(
      (s, i) => s + (i.price || 0) * (i.quantity || 0),
      0
    );

  /* ────────────────────────────────────────────────────────────── */
  return (
    <Wrapper>
      {showUserDetails && selectedUser ? (
        /* ══ DETAIL VIEW ═════════════════════════════════════════ */
        <div className="detail-view">
          {/* Back + delete row */}
          <div className="detail-topbar">
            <button className="back-btn" onClick={handleBackToUsers}>
              <FaArrowLeft /> Back to Users
            </button>
            {selectedUser.role !== "admin" && (
              <button
                className="danger-btn"
                onClick={() => handleDeleteUser(selectedUser._id)}
              >
                <FaTrash /> Delete User
              </button>
            )}
          </div>

          {/* Hero card */}
          <div className="profile-hero">
            <Avatar src={selectedUser.profileImage} name={selectedUser.fullName} size="lg" />
            <div className="hero-info">
              <h2 className="hero-name">{selectedUser.fullName}</h2>
              <p className="hero-email">
                <FaEnvelope className="hi" /> {selectedUser.email}
              </p>
              <div className="hero-meta">
                {(() => {
                  const meta = ROLE_META[selectedUser.role] || ROLE_META.user;
                  return (
                    <span className="role-badge" style={{ background: meta.bg, color: meta.color }}>
                      <meta.Icon /> {selectedUser.role}
                    </span>
                  );
                })()}
                <span className="hero-date">
                  <FaCalendar className="hi" />
                  Joined {new Date(selectedUser.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric", month: "short", year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Stats strip */}
          <div className="stats-strip">
            {[
              { label: "Orders",     num: userOrders.length,   accent: "var(--secondary)" },
              { label: "Cart Items", num: userCartItems.length, accent: "#3b82f6" },
              { label: "Reminders",  num: userReminders.length, accent: "#a855f7" },
              {
                label: "Calendar",
                num: selectedUser.googleCalendarSyncEnabled ? "On" : "Off",
                accent: selectedUser.googleCalendarSyncEnabled ? "#16a34a" : "#94a3b8",
              },
            ].map(({ label, num, accent }) => (
              <div key={label} className="stat-chip">
                <span className="chip-num" style={{ color: accent }}>{num}</span>
                <span className="chip-label">{label}</span>
              </div>
            ))}
          </div>

          {/* Recent Orders */}
          {userOrders.length > 0 && (
            <div className="data-section">
              <h3 className="section-title">
                <FaShoppingCart className="si" /> Recent Orders
              </h3>
              <div className="data-rows">
                {userOrders.slice(0, 5).map((order) => {
                  const sc = STATUS_COLORS[order.status] || STATUS_COLORS.pending;
                  return (
                    <div key={order._id} className="data-row">
                      <div className="dr-left">
                        <p className="dr-title">Order #{(order._id || "").slice(-8).toUpperCase()}</p>
                        <p className="dr-sub">
                          {new Date(order.createdAt).toLocaleDateString("en-GB", {
                            day: "numeric", month: "short", year: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="dr-right">
                        <span
                          className="status-chip"
                          style={{ background: sc.bg, color: sc.color }}
                        >
                          {order.status}
                        </span>
                        <span className="dr-amount">{formatPrice(order.totalAmount)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Cart Items */}
          {userCartItems.length > 0 && (
            <div className="data-section">
              <h3 className="section-title">
                <FaShoppingCart className="si" /> Cart Items
              </h3>
              <div className="data-rows">
                {userCartItems.slice(0, 5).map((item, idx) => (
                  <div key={item._id || idx} className="data-row">
                    <div className="dr-left">
                      <p className="dr-title">{item.name || "Unnamed Item"}</p>
                      <p className="dr-sub">
                        {item.ingredients?.length || 0} ingredient
                        {item.ingredients?.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <span className="dr-amount">{formatPrice(cartItemPrice(item))}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reminders */}
          {userReminders.length > 0 && (
            <div className="data-section">
              <h3 className="section-title">
                <FaBell className="si" /> Reminders
              </h3>
              <div className="data-rows">
                {userReminders.slice(0, 5).map((reminder) => (
                  <div key={reminder._id} className="data-row">
                    <div className="dr-left">
                      <p className="dr-title">
                        {reminder.meal?.name || "Unnamed Meal"}
                      </p>
                      <p className="dr-sub">
                        <MdAccessTime style={{ verticalAlign: "middle" }} />{" "}
                        {new Date(reminder.reminderTime).toLocaleString("en-GB", {
                          day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
                        })}
                        {reminder.isRecurring && ` · ${reminder.recurringFrequency}`}
                      </p>
                    </div>
                    <span className="method-chip">{reminder.notificationMethod}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ══ LIST VIEW ═══════════════════════════════════════════ */
        <div className="list-view">
          {/* Page header */}
          <div className="page-header">
            <div>
              <h1 className="page-title">
                <FaUsers className="title-icon" /> Users
              </h1>
              <p className="page-sub">Manage all registered members</p>
            </div>
            <div className="header-badge">
              <span className="badge-num">{totalUsers}</span>
              <span className="badge-label">total users</span>
            </div>
          </div>

          {/* Filter bar */}
          <div className="filter-bar">
            <div className="search-wrap">
              <FaSearch className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search by name or email…"
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
            </div>

            <select
              className="filter-select"
              value={filters.role}
              onChange={(e) => handleFilterChange("role", e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <select
              className="filter-select"
              value={filters.sort}
              onChange={(e) => handleFilterChange("sort", e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="a-z">A – Z</option>
              <option value="z-a">Z – A</option>
            </select>

            {hasActiveFilters && (
              <button className="clear-btn" onClick={clearFilters}>
                Clear
              </button>
            )}
          </div>

          {/* Users table */}
          {users.length === 0 ? (
            <div className="empty-state">
              <FaUsers className="empty-icon" />
              <h4>No users found</h4>
              <p>Try adjusting your search or filters</p>
              {hasActiveFilters && (
                <button className="clear-btn" onClick={clearFilters}>
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="users-table">
              <div className="table-head">
                <span>User</span>
                <span>Role</span>
                <span>Joined</span>
                <span>Actions</span>
              </div>
              {users.map((user) => {
                const meta = ROLE_META[user.role] || ROLE_META.user;
                return (
                  <div key={user._id} className="user-row">
                    {/* Avatar + info */}
                    <div className="ur-user">
                      <Avatar src={user.profileImage} name={user.fullName} size="sm" />
                      <div>
                        <p className="ur-name">{user.fullName}</p>
                        <p className="ur-email">{user.email}</p>
                      </div>
                    </div>

                    {/* Role badge */}
                    <span
                      className="role-badge"
                      style={{ background: meta.bg, color: meta.color }}
                    >
                      <meta.Icon /> {user.role}
                    </span>

                    {/* Join date */}
                    <span className="ur-date">
                      {new Date(user.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                    </span>

                    {/* Actions */}
                    <div className="ur-actions">
                      <button
                        className="act-btn view"
                        onClick={() => handleViewUser(user._id)}
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      {user.role !== "admin" && (
                        <button
                          className="act-btn del"
                          onClick={() => handleDeleteUser(user._id)}
                          title="Delete User"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {numOfPages > 1 && (
            <div className="pagination">
              <button
                className="page-btn"
                disabled={currentPage === 1}
                onClick={() => handleFilterChange("page", 1)}
              >
                First
              </button>
              <button
                className="page-btn icon"
                disabled={currentPage === 1}
                onClick={() => handleFilterChange("page", currentPage - 1)}
              >
                <FaChevronLeft />
              </button>

              {Array.from({ length: numOfPages }, (_, i) => i + 1)
                .filter(
                  (p) =>
                    p === 1 ||
                    p === numOfPages ||
                    Math.abs(p - currentPage) <= 1
                )
                .reduce((acc, p, idx, arr) => {
                  if (idx > 0 && p - arr[idx - 1] > 1)
                    acc.push(<span key={`e-${p}`} className="ellipsis">…</span>);
                  acc.push(
                    <button
                      key={p}
                      className={`page-btn num${currentPage === p ? " active" : ""}`}
                      onClick={() => handleFilterChange("page", p)}
                    >
                      {p}
                    </button>
                  );
                  return acc;
                }, [])}

              <button
                className="page-btn icon"
                disabled={currentPage === numOfPages}
                onClick={() => handleFilterChange("page", currentPage + 1)}
              >
                <FaChevronRight />
              </button>
              <button
                className="page-btn"
                disabled={currentPage === numOfPages}
                onClick={() => handleFilterChange("page", numOfPages)}
              >
                Last
              </button>
            </div>
          )}
        </div>
      )}
    </Wrapper>
  );
};

export default AdminUsers;
