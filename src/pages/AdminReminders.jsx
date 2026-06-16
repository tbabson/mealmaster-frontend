import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import {
  fetchUserReminders,
  deleteReminder,
  updateReminder,
  sendPushNotification,
  syncWithCalendar,
  createReminder,
} from "../Features/Reminder/reminderSlice";
import Wrapper from "../assets/wrappers/AdminReminders";
import Loading from "../components/Loading";
import customFetch from "../utils/customFetch";
import {
  FaPlus,
  FaArrowLeft,
  FaEdit,
  FaTrash,
  FaBell,
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaEnvelope,
  FaRedo,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import { MdOutlineNotificationsActive } from "react-icons/md";
import moment from "moment";

const METHOD_META = {
  email:    { label: "Email",    color: "#3b82f6", bg: "#eff6ff" },
  push:     { label: "Push",     color: "#ff5722", bg: "#fff5f2" },
  calendar: { label: "Calendar", color: "#a855f7", bg: "#faf5ff" },
};

const FREQ_LABELS = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
};

const EMPTY_FORM = {
  meal: "",
  reminderTime: "",
  notificationMethod: "email",
  isRecurring: false,
  recurringFrequency: "daily",
  note: "",
};

const getInitials = (name = "") =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "?";

const AdminReminders = () => {
  const dispatch = useDispatch();
  const { isLoading, reminders } = useSelector((store) => store.reminders);

  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    dispatch(fetchUserReminders());
  }, [dispatch]);

  const { data: mealsData } = useQuery({
    queryKey: ["adminMealsDropdown"],
    queryFn: () =>
      customFetch.get("/meals?limit=200").then((r) => r.data.meals || []),
    staleTime: 1000 * 60 * 5,
  });

  const totalCount = Array.isArray(reminders) ? reminders.length : 0;
  const recurringCount = Array.isArray(reminders)
    ? reminders.filter((r) => r.isRecurring).length
    : 0;
  const emailCount = Array.isArray(reminders)
    ? reminders.filter((r) => r.notificationMethod === "email").length
    : 0;

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setSelectedReminder(null);
    setIsEditing(false);
    setShowForm(true);
  };

  const openEdit = (reminder) => {
    setSelectedReminder(reminder);
    setForm({
      meal: reminder.meal?._id || reminder.meal || "",
      reminderTime: moment(reminder.reminderTime).format("YYYY-MM-DDTHH:mm"),
      notificationMethod: reminder.notificationMethod || "email",
      isRecurring: !!reminder.isRecurring,
      recurringFrequency: reminder.recurringFrequency || "daily",
      note: reminder.note || "",
    });
    setIsEditing(true);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setIsEditing(false);
    setSelectedReminder(null);
    setForm(EMPTY_FORM);
  };

  const handleChange = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isEditing) {
        await dispatch(
          updateReminder({ id: selectedReminder._id, reminderData: form })
        ).unwrap();
      } else {
        await dispatch(createReminder(form)).unwrap();
      }
      closeForm();
      dispatch(fetchUserReminders());
    } catch {
      // toast is handled in slice
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this reminder? This cannot be undone.")) {
      await dispatch(deleteReminder(id));
    }
  };

  return (
    <Wrapper>
      {/* ── Page header ─────────────────────────── */}
      <div className="page-header">
        <div className="header-left">
          <h1 className="page-title">
            <MdOutlineNotificationsActive className="title-icon" />
            Reminders
          </h1>
          <p className="page-sub">Manage and monitor all meal reminders</p>
        </div>
        {!showForm && (
          <button className="add-btn" onClick={openCreate}>
            <FaPlus /> Add Reminder
          </button>
        )}
      </div>

      {/* ── Stats strip ─────────────────────────── */}
      {!showForm && (
        <div className="stats-strip">
          <div className="stat-chip">
            <span className="chip-num">{totalCount}</span>
            <span className="chip-label">Total</span>
          </div>
          <div className="stat-chip recurring">
            <span className="chip-num">{recurringCount}</span>
            <span className="chip-label">Recurring</span>
          </div>
          <div className="stat-chip email">
            <span className="chip-num">{emailCount}</span>
            <span className="chip-label">Email</span>
          </div>
        </div>
      )}

      {/* ── List view ───────────────────────────── */}
      {!showForm && (
        <div className="list-view">
          {isLoading ? (
            <div className="loading-state">
              <Loading />
            </div>
          ) : !Array.isArray(reminders) || reminders.length === 0 ? (
            <div className="empty-state">
              <FaBell className="empty-icon" />
              <h3>No reminders yet</h3>
              <p>Click "Add Reminder" to create the first one.</p>
              <button className="add-btn" onClick={openCreate}>
                <FaPlus /> Add Reminder
              </button>
            </div>
          ) : (
            <div className="reminders-grid">
              {reminders.map((reminder) => {
                const method = reminder.notificationMethod || "email";
                const meta = METHOD_META[method] || METHOD_META.email;
                const mealName = reminder.meal?.name || "—";
                const userName =
                  reminder.userDetails?.fullName || "Unknown User";
                const userEmail =
                  reminder.userDetails?.email || "No email";

                return (
                  <div
                    className="reminder-card"
                    key={reminder._id}
                    style={{ "--accent": meta.color }}
                  >
                    <div className="card-accent" />

                    <div className="card-top">
                      <h3 className="meal-name">{mealName}</h3>
                      <div className="badge-row">
                        <span
                          className="method-badge"
                          style={{ color: meta.color, background: meta.bg }}
                        >
                          {meta.label}
                        </span>
                        {reminder.isRecurring && (
                          <span className="recurring-badge">
                            <FaRedo className="badge-icon" />
                            {FREQ_LABELS[reminder.recurringFrequency] ||
                              reminder.recurringFrequency}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="card-meta">
                      <p className="meta-row">
                        <FaClock className="meta-icon" />
                        {moment(reminder.reminderTime).format(
                          "ddd, MMM Do YYYY [at] h:mm a"
                        )}
                      </p>
                      <p className="meta-row">
                        <FaUser className="meta-icon" />
                        {userName}
                      </p>
                      <p className="meta-row dim">
                        <FaEnvelope className="meta-icon" />
                        {userEmail}
                      </p>
                    </div>

                    {reminder.note && (
                      <p className="card-note">"{reminder.note}"</p>
                    )}

                    <div className="card-actions">
                      <button
                        className="action-btn edit"
                        title="Edit"
                        onClick={() => openEdit(reminder)}
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        className="action-btn notify"
                        title="Send notification"
                        onClick={() =>
                          dispatch(sendPushNotification(reminder._id))
                        }
                      >
                        <FaBell /> Notify
                      </button>
                      <button
                        className="action-btn sync"
                        title="Sync to calendar"
                        onClick={() =>
                          dispatch(syncWithCalendar(reminder._id))
                        }
                      >
                        <FaCalendarAlt /> Sync
                      </button>
                      <button
                        className="action-btn delete"
                        title="Delete"
                        onClick={() => handleDelete(reminder._id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── Create / Edit form ───────────────────── */}
      {showForm && (
        <div className="form-view">
          <button className="back-btn" onClick={closeForm}>
            <FaArrowLeft /> Back to Reminders
          </button>

          <div className="form-card">
            <div className="form-header">
              <h2 className="form-title">
                {isEditing
                  ? `Edit Reminder — ${selectedReminder?.meal?.name || "Reminder"}`
                  : "New Reminder"}
              </h2>
              <p className="form-sub">
                {isEditing
                  ? "Update the details below."
                  : "Fill in the details to schedule a new reminder."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="reminder-form">
              <div className="form-grid">
                {/* Left column */}
                <div className="form-col">
                  <div className="field-group">
                    <label className="field-label">Meal</label>
                    {mealsData && mealsData.length > 0 ? (
                      <select
                        className="field-input"
                        value={form.meal}
                        onChange={(e) => handleChange("meal", e.target.value)}
                        required
                      >
                        <option value="">Select a meal…</option>
                        {mealsData.map((m) => (
                          <option key={m._id} value={m._id}>
                            {m.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        className="field-input"
                        type="text"
                        placeholder="Meal ID"
                        value={form.meal}
                        onChange={(e) => handleChange("meal", e.target.value)}
                        required
                      />
                    )}
                  </div>

                  <div className="field-group">
                    <label className="field-label">Reminder Time</label>
                    <input
                      className="field-input"
                      type="datetime-local"
                      value={form.reminderTime}
                      onChange={(e) =>
                        handleChange("reminderTime", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="field-group">
                    <label className="field-label">Notification Method</label>
                    <select
                      className="field-input"
                      value={form.notificationMethod}
                      onChange={(e) =>
                        handleChange("notificationMethod", e.target.value)
                      }
                    >
                      <option value="email">Email</option>
                      <option value="push">Push Notification</option>
                      <option value="calendar">Calendar</option>
                    </select>
                  </div>
                </div>

                {/* Right column */}
                <div className="form-col">
                  <div className="field-group">
                    <label className="field-label">Note (optional)</label>
                    <textarea
                      className="field-input field-textarea"
                      placeholder="Add a note for this reminder…"
                      value={form.note}
                      onChange={(e) => handleChange("note", e.target.value)}
                      maxLength={500}
                    />
                    <span className="char-count">
                      {form.note.length}/500
                    </span>
                  </div>

                  <div className="field-group">
                    <label className="toggle-label">
                      <span className="field-label" style={{ margin: 0 }}>
                        Recurring Reminder
                      </span>
                      <div
                        className={`toggle${form.isRecurring ? " on" : ""}`}
                        onClick={() =>
                          handleChange("isRecurring", !form.isRecurring)
                        }
                      >
                        <div className="toggle-knob" />
                      </div>
                    </label>
                  </div>

                  {form.isRecurring && (
                    <div className="field-group">
                      <label className="field-label">Frequency</label>
                      <select
                        className="field-input"
                        value={form.recurringFrequency}
                        onChange={(e) =>
                          handleChange("recurringFrequency", e.target.value)
                        }
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>

              {/* Form actions */}
              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={closeForm}
                >
                  <FaTimes /> Cancel
                </button>
                <button
                  type="submit"
                  className="save-btn"
                  disabled={saving}
                >
                  <FaSave />
                  {saving
                    ? "Saving…"
                    : isEditing
                    ? "Update Reminder"
                    : "Create Reminder"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default AdminReminders;
