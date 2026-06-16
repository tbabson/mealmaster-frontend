import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FaCamera,
  FaEdit,
  FaKey,
  FaTimes,
  FaShoppingBag,
  FaBell,
  FaShoppingCart,
  FaChevronRight,
  FaCheck,
  FaSync,
  FaUser,
  FaLock,
  FaClipboardList,
  FaTrash,
  FaSave,
  FaClock,
  FaRedo,
  FaEnvelope,
  FaCalendarAlt,
  FaUtensils,
} from "react-icons/fa";
import { MdEmail, MdAccessTime } from "react-icons/md";
import moment from "moment";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/Profile";
import { ModalOverlay, ModalContent } from "../assets/wrappers/UserReminder";
import Loading from "../components/Loading";
import { Link, useLoaderData } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { fetchCurrentUser, setUser } from "../Features/user/userSlice";
import {
  fetchSingleUserReminders,
  updateReminder,
  deleteReminder,
} from "../Features/Reminder/reminderSlice";
import customFetch from "../utils/customFetch";

const STATUS_STYLES = {
  pending:    { bg: "#fef9c3", color: "#854d0e" },
  processing: { bg: "#dbeafe", color: "#1e40af" },
  delivered:  { bg: "#dcfce7", color: "#166534" },
  cancelled:  { bg: "#fee2e2", color: "#991b1b" },
};

const shortId = (order) =>
  ((order.transactionId || order._id) + "").slice(-10).toUpperCase();

const Profile = () => {
  const dispatch = useDispatch();
  const { user: currentUser, loading: userLoading } = useSelector(
    (state) => state.user
  );
  const { reminders, isLoading: reminderLoading } = useSelector(
    (state) => state.reminders
  );

  const { orders } = useLoaderData();
  const cartItems = useSelector((state) => state.cart.cartItems) || [];

  const [activeTab,           setActiveTab]           = useState("orders");
  const fileInputRef                                   = useRef(null);
  const [showEditModal,       setShowEditModal]        = useState(false);
  const [showPasswordModal,   setShowPasswordModal]    = useState(false);
  const [showReminderModal,   setShowReminderModal]    = useState(false);
  const [selectedReminder,    setSelectedReminder]     = useState(null);
  const [editingReminder,     setEditingReminder]      = useState(null);
  const [editText,            setEditText]             = useState("");
  const [editTime,            setEditTime]             = useState("");
  const [editFormData,        setEditFormData]         = useState({ fullName: "", email: "" });
  const [passwordFormData,    setPasswordFormData]     = useState({
    oldPassword: "", newPassword: "", confirmPassword: "",
  });
  const [savingProfile,       setSavingProfile]        = useState(false);
  const [savingPassword,      setSavingPassword]       = useState(false);

  useEffect(() => {
    if (currentUser?._id) {
      dispatch(fetchCurrentUser());
      dispatch(fetchSingleUserReminders());
    }
  }, [dispatch, currentUser?._id]);

  useEffect(() => {
    if (currentUser) {
      setEditFormData({ fullName: currentUser.fullName || "", email: currentUser.email || "" });
    }
  }, [currentUser]);

  const handleReminderClick = (reminder) => {
    setSelectedReminder(reminder);
    setEditText(reminder.note || "");
    setEditTime(new Date(reminder.reminderTime).toISOString().substring(11, 16));
    setEditingReminder(null);
    setShowReminderModal(true);
  };

  const handleSaveReminderEdit = () => {
    const updatedDateTime = new Date(selectedReminder.reminderTime);
    const [hours, minutes] = editTime.split(":");
    updatedDateTime.setHours(Number(hours));
    updatedDateTime.setMinutes(Number(minutes));
    dispatch(
      updateReminder({
        id: editingReminder,
        reminderData: { note: editText, reminderTime: updatedDateTime.toISOString() },
      })
    )
      .unwrap()
      .then(() => { setEditingReminder(null); toast.success("Reminder updated"); })
      .catch((err) => toast.error(err?.message || "Failed to update reminder"));
  };

  const handleDeleteReminder = (id) => {
    dispatch(deleteReminder(id))
      .unwrap()
      .then(() => { setShowReminderModal(false); toast.success("Reminder deleted"); })
      .catch((err) => toast.error(err?.message || "Failed to delete reminder"));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { toast.error("Please upload an image file"); return; }
    const formData = new FormData();
    formData.append("profileImage", file);
    try {
      const response = await customFetch.patch("/users/update-profile-image", formData);
      dispatch(setUser(response.data.user));
      toast.success("Profile image updated");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update profile image");
    }
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      const response = await customFetch.patch("/users/update-profile", editFormData);
      dispatch(setUser(response.data.user));
      setShowEditModal(false);
      toast.success("Profile updated");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update profile");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordFormData.newPassword !== passwordFormData.confirmPassword) {
      toast.error("Passwords do not match"); return;
    }
    setSavingPassword(true);
    try {
      await customFetch.patch("/users/change-password", passwordFormData);
      setShowPasswordModal(false);
      setPasswordFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      toast.success("Password changed successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to change password");
    } finally {
      setSavingPassword(false);
    }
  };

  if (userLoading || reminderLoading) return <Loading variant="profile" />;
  if (!currentUser) return (
    <Wrapper>
      <div className="guest-screen">
        <div className="guest-card">
          <div className="guest-avatar">
            <FaUser />
          </div>
          <h1 className="guest-title">Your Profile</h1>
          <p className="guest-sub">
            Sign in to track orders, manage your reminders, and access your saved cart.
          </p>

          <div className="guest-features">
            <div className="feature-item">
              <span className="feature-icon orders-icon"><FaClipboardList /></span>
              <div>
                <p className="feature-label">Order History</p>
                <p className="feature-desc">View and track all your past and current orders</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon reminders-icon"><FaBell /></span>
              <div>
                <p className="feature-label">Meal Reminders</p>
                <p className="feature-desc">Set custom reminders to never miss your favourite meals</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon cart-icon"><FaShoppingCart /></span>
              <div>
                <p className="feature-label">Saved Cart</p>
                <p className="feature-desc">Pick up right where you left off every time you return</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon account-icon"><FaLock /></span>
              <div>
                <p className="feature-label">Account Security</p>
                <p className="feature-desc">Manage your password, profile photo, and personal details</p>
              </div>
            </div>
          </div>

          <div className="guest-actions">
            <Link to="/login" className="btn-login">Sign In</Link>
            <Link to="/register" className="btn-register">Create Account</Link>
          </div>

          <p className="guest-footer-text">
            Already have an account? <Link to="/login" className="inline-link">Sign in here</Link>
          </p>
        </div>
      </div>
    </Wrapper>
  );

  const initials = currentUser.fullName
    ? currentUser.fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  const tabs = [
    { id: "orders",    label: "Orders",    icon: <FaShoppingBag />,  count: orders.length },
    { id: "reminders", label: "Reminders", icon: <FaBell />,         count: reminders.length },
    { id: "cart",      label: "Cart",      icon: <FaShoppingCart />, count: cartItems.length },
  ];

  return (
    <Wrapper>
      <div className="page-layout">

        {/* ══ LEFT: User Card ══════════════════════════════════════════ */}
        <aside className="user-card">
          {/* Avatar */}
          <div
            className="avatar-wrap"
            onClick={() => fileInputRef.current?.click()}
            title="Change photo"
          >
            {currentUser.profileImage ? (
              <img src={currentUser.profileImage} alt={currentUser.fullName} className="avatar-img" />
            ) : (
              <div className="avatar-initials">{initials}</div>
            )}
            <div className="avatar-overlay">
              <FaCamera />
              <span>Change</span>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              hidden
            />
          </div>

          {/* Name + email + badges */}
          <h2 className="user-name">{currentUser.fullName}</h2>
          <p className="user-email">
            <MdEmail className="meta-icon" />
            {currentUser.email}
          </p>

          {currentUser.role === "admin" && (
            <span className="role-badge">Admin</span>
          )}

          {currentUser.createdAt && (
            <p className="member-since">
              <MdAccessTime className="meta-icon" />
              Member since {moment(currentUser.createdAt).format("MMM YYYY")}
            </p>
          )}

          <div className="divider" />

          {/* Stat pills */}
          <div className="stat-pills">
            <div className="stat-pill">
              <span className="pill-val">{orders.length}</span>
              <span className="pill-label">Orders</span>
            </div>
            <div className="stat-pill">
              <span className="pill-val">{reminders.length}</span>
              <span className="pill-label">Reminders</span>
            </div>
            <div className="stat-pill">
              <span className="pill-val">{cartItems.length}</span>
              <span className="pill-label">Cart</span>
            </div>
          </div>

          <div className="divider" />

          {/* Actions */}
          <button className="action-btn primary" onClick={() => setShowEditModal(true)}>
            <FaEdit /> Edit Profile
          </button>
          <button className="action-btn outline" onClick={() => setShowPasswordModal(true)}>
            <FaKey /> Change Password
          </button>
        </aside>

        {/* ══ RIGHT: Content ════════════════════════════════════════════ */}
        <main className="content-col">

          {/* Tabs */}
          <div className="tabs-bar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-btn${activeTab === tab.id ? " active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                {tab.label}
                <span className="tab-count">{tab.count}</span>
              </button>
            ))}
          </div>

          {/* ── Orders ────────────────────────────────────────────────── */}
          {activeTab === "orders" && (
            <div className="tab-panel">
              {orders.length === 0 ? (
                <div className="empty-state">
                  <FaShoppingBag className="empty-icon" />
                  <p>No orders yet</p>
                  <Link to="/meals" className="empty-link">Browse Meals</Link>
                </div>
              ) : (
                <div className="item-list">
                  {orders.map((order) => {
                    const statusStyle = STATUS_STYLES[order.status] || STATUS_STYLES.pending;
                    return (
                      <Link to={`/orders/${order._id}`} key={order._id} className="row-card">
                        <div className="row-icon-wrap orders-icon">
                          <FaShoppingBag />
                        </div>
                        <div className="row-body">
                          <div className="row-top">
                            <span className="row-title">Order #{shortId(order)}</span>
                            <span
                              className="status-badge"
                              style={{ background: statusStyle.bg, color: statusStyle.color }}
                            >
                              {order.status}
                            </span>
                          </div>
                          <div className="row-meta">
                            <span>{moment(order.createdAt).format("MMM D, YYYY · h:mm a")}</span>
                            <span className="dot">·</span>
                            <span className="row-total">₦{order.totalAmount?.toLocaleString()}</span>
                          </div>
                        </div>
                        <FaChevronRight className="row-arrow" />
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ── Reminders ─────────────────────────────────────────────── */}
          {activeTab === "reminders" && (
            <div className="tab-panel">
              {reminders.length === 0 ? (
                <div className="empty-state">
                  <FaBell className="empty-icon" />
                  <p>No reminders set</p>
                  <Link to="/create-reminders" className="empty-link">Create Reminder</Link>
                </div>
              ) : (
                <div className="item-list">
                  {reminders.map((reminder) => (
                    <div
                      key={reminder._id}
                      className="row-card clickable"
                      onClick={() => handleReminderClick(reminder)}
                    >
                      <div className="row-icon-wrap reminder-icon">
                        <FaBell />
                      </div>
                      <div className="row-body">
                        <div className="row-top">
                          <span className="row-title">
                            {reminder.meal?.name || "Unnamed Meal"} Reminder
                          </span>
                          <div className="badge-group">
                            {reminder.isRecurring && (
                              <span className="badge-pill recurring">
                                <FaSync /> {reminder.recurringFrequency}
                              </span>
                            )}
                            <span className="badge-pill method">
                              {reminder.notificationMethod}
                            </span>
                          </div>
                        </div>
                        <div className="row-meta">
                          <MdAccessTime className="meta-icon-sm" />
                          <span>{moment(reminder.reminderTime).format("MMM D, YYYY · h:mm a")}</span>
                        </div>
                        {reminder.note && (
                          <p className="reminder-note">{reminder.note}</p>
                        )}
                      </div>
                      <FaChevronRight className="row-arrow" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Cart ──────────────────────────────────────────────────── */}
          {activeTab === "cart" && (
            <div className="tab-panel">
              {!Array.isArray(cartItems) || cartItems.length === 0 ? (
                <div className="empty-state">
                  <FaShoppingCart className="empty-icon" />
                  <p>Your cart is empty</p>
                  <Link to="/meals" className="empty-link">Add Meals</Link>
                </div>
              ) : (
                <div className="item-list">
                  {cartItems.map((item, idx) => {
                    const price = (item.ingredients || []).reduce(
                      (sum, i) => sum + (i.price || 0) * (i.quantity || 0),
                      0
                    );
                    const ingCount = item.ingredients?.length || 0;
                    return (
                      <Link
                        to="/cart"
                        key={item._id || item.mealID || idx}
                        className="row-card"
                      >
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="cart-thumb"
                          />
                        ) : (
                          <div className="row-icon-wrap cart-icon">
                            <FaShoppingCart />
                          </div>
                        )}
                        <div className="row-body">
                          <div className="row-top">
                            <span className="row-title">
                              {item.name || "Unnamed Item"}
                            </span>
                            <span className="row-total">
                              ₦{price.toLocaleString()}
                            </span>
                          </div>
                          <div className="row-meta">
                            <span>
                              {ingCount} ingredient{ingCount !== 1 ? "s" : ""}
                            </span>
                          </div>
                        </div>
                        <FaChevronRight className="row-arrow" />
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* ══ Reminder Detail Modal ════════════════════════════════════════ */}
      <AnimatePresence>
        {showReminderModal && selectedReminder && (() => {
          const METHOD_META = {
            email:    { color: "#3b82f6", bg: "#eff6ff", Icon: FaEnvelope },
            push:     { color: "#ff5722", bg: "#fff5f2", Icon: FaBell },
            calendar: { color: "#a855f7", bg: "#faf5ff", Icon: FaCalendarAlt },
          };
          const method = selectedReminder.notificationMethod || "email";
          const { color, bg, Icon: MethodIcon } = METHOD_META[method] || METHOD_META.email;
          const isEditing = editingReminder === selectedReminder._id;

          return (
            <ModalOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ModalContent
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Header */}
                <div className="modal-header">
                  <div>
                    <p className="modal-title">
                      {isEditing ? "Edit Reminder" : (selectedReminder.meal?.name || "Reminder")}
                    </p>
                    <p className="modal-sub">
                      {isEditing
                        ? selectedReminder.meal?.name || "Unnamed Meal"
                        : moment(selectedReminder.reminderTime).format("ddd, MMM Do YYYY")}
                    </p>
                  </div>
                  <button
                    className="close-btn"
                    onClick={() => {
                      setShowReminderModal(false);
                      setEditingReminder(null);
                    }}
                  >
                    <FaTimes />
                  </button>
                </div>

                {isEditing ? (
                  <>
                    {/* Edit body */}
                    <div className="modal-body">
                      <div className="field-group">
                        <label className="field-label">Reminder Time</label>
                        <input
                          type="time"
                          className="field-input"
                          value={editTime}
                          onChange={(e) => setEditTime(e.target.value)}
                        />
                      </div>
                      <div className="field-group">
                        <label className="field-label">Note</label>
                        <textarea
                          className="field-input field-textarea"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          placeholder="Add a note…"
                          maxLength="500"
                        />
                        <span className="char-count">{500 - editText.length}</span>
                      </div>
                    </div>

                    {/* Edit footer */}
                    <div className="modal-footer">
                      <button
                        className="modal-cancel"
                        onClick={() => setEditingReminder(null)}
                      >
                        Cancel
                      </button>
                      <button
                        className="modal-save"
                        onClick={handleSaveReminderEdit}
                      >
                        <FaSave /> Save Changes
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* View body */}
                    <div className="modal-body">
                      <div className="info-row">
                        <FaClock className="info-icon" />
                        <div className="info-content">
                          <span className="info-label">Time</span>
                          <span className="info-value">
                            {moment(selectedReminder.reminderTime).format("h:mm A")}
                          </span>
                        </div>
                      </div>

                      <div className="info-row">
                        <MethodIcon className="info-icon" style={{ color }} />
                        <div className="info-content">
                          <span className="info-label">Notification</span>
                          <span className="method-chip" style={{ background: bg, color }}>
                            <MethodIcon /> {method}
                          </span>
                        </div>
                      </div>

                      <div className="info-row">
                        <FaRedo className="info-icon" />
                        <div className="info-content">
                          <span className="info-label">Recurring</span>
                          <span className="info-value">
                            {selectedReminder.isRecurring
                              ? `Yes — ${selectedReminder.recurringFrequency || "weekly"}`
                              : "No"}
                          </span>
                        </div>
                      </div>

                      {selectedReminder.note && (
                        <div className="note-block">
                          <span className="info-label">Note</span>
                          <p>{selectedReminder.note}</p>
                        </div>
                      )}
                    </div>

                    {/* View footer */}
                    <div className="modal-footer">
                      {selectedReminder.meal?._id && (
                        <Link
                          to={`/meals/${selectedReminder.meal._id}`}
                          className="modal-order-btn"
                          onClick={() => setShowReminderModal(false)}
                        >
                          <FaUtensils /> Order Meal
                        </Link>
                      )}
                      <button
                        className="modal-edit-btn"
                        onClick={() => setEditingReminder(selectedReminder._id)}
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        className="modal-delete-btn"
                        onClick={() => handleDeleteReminder(selectedReminder._id)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </>
                )}
              </ModalContent>
            </ModalOverlay>
          );
        })()}
      </AnimatePresence>

      {/* ══ Edit Profile Modal ═══════════════════════════════════════════ */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h3>Edit Profile</h3>
              <button className="modal-close" onClick={() => setShowEditModal(false)}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleEditProfile} className="modal-form">
              <div className="field-group">
                <label className="field-label">Full Name</label>
                <input
                  type="text"
                  className="field-input"
                  value={editFormData.fullName}
                  onChange={(e) => setEditFormData({ ...editFormData, fullName: e.target.value })}
                  placeholder="Your full name"
                />
              </div>
              <div className="field-group">
                <label className="field-label">Email</label>
                <input
                  type="email"
                  className="field-input"
                  value={editFormData.email}
                  onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                  placeholder="your@email.com"
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit" disabled={savingProfile}>
                  {savingProfile ? "Saving…" : <><FaCheck /> Save Changes</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══ Change Password Modal ════════════════════════════════════════ */}
      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h3>Change Password</h3>
              <button className="modal-close" onClick={() => setShowPasswordModal(false)}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleChangePassword} className="modal-form">
              <div className="field-group">
                <label className="field-label">Current Password</label>
                <input
                  type="password"
                  className="field-input"
                  value={passwordFormData.oldPassword}
                  placeholder="••••••••"
                  onChange={(e) => setPasswordFormData({ ...passwordFormData, oldPassword: e.target.value })}
                />
              </div>
              <div className="field-group">
                <label className="field-label">New Password</label>
                <input
                  type="password"
                  className="field-input"
                  value={passwordFormData.newPassword}
                  placeholder="••••••••"
                  onChange={(e) => setPasswordFormData({ ...passwordFormData, newPassword: e.target.value })}
                />
              </div>
              <div className="field-group">
                <label className="field-label">Confirm New Password</label>
                <input
                  type="password"
                  className="field-input"
                  value={passwordFormData.confirmPassword}
                  placeholder="••••••••"
                  onChange={(e) => setPasswordFormData({ ...passwordFormData, confirmPassword: e.target.value })}
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowPasswordModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit" disabled={savingPassword}>
                  {savingPassword ? "Saving…" : <><FaKey /> Update Password</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default Profile;
