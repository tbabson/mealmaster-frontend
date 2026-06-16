import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import moment from "moment";
import {
  fetchSingleUserReminders,
  deleteReminder,
  updateReminder,
} from "../Features/Reminder/reminderSlice";
import { Loading } from "../components";
import Wrapper, { ModalOverlay, ModalContent } from "../assets/wrappers/UserReminder";
import "react-calendar/dist/Calendar.css";
import {
  FaBell,
  FaEnvelope,
  FaCalendarAlt,
  FaClock,
  FaEdit,
  FaTrash,
  FaRedo,
  FaTimes,
  FaSave,
  FaUtensils,
} from "react-icons/fa";
import { MdOutlineNotificationsActive } from "react-icons/md";

const METHOD_META = {
  email:    { icon: <FaEnvelope />,    color: "#3b82f6", bg: "#eff6ff",  label: "Email" },
  push:     { icon: <FaBell />,        color: "#ff5722", bg: "#fff5f2",  label: "Push" },
  calendar: { icon: <FaCalendarAlt />, color: "#a855f7", bg: "#faf5ff",  label: "Calendar" },
};

const Reminders = () => {
  const dispatch = useDispatch();
  const { reminders, isLoading, error } = useSelector((s) => s.reminders);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [editingReminder, setEditingReminder] = useState(null);
  const [editText, setEditText] = useState("");
  const [editTime, setEditTime] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    dispatch(fetchSingleUserReminders());
  }, [dispatch]);

  useEffect(() => {
    if (error) toast.error(typeof error === "string" ? error : "Failed to load reminders");
  }, [error]);

  const allReminders = Array.isArray(reminders) ? reminders : [];
  const now = new Date();
  const upcomingCount = allReminders.filter((r) => new Date(r.reminderTime) > now).length;
  const recurringCount = allReminders.filter((r) => r.isRecurring).length;

  const remindersForDate = allReminders.filter((r) => {
    const rd = new Date(r.reminderTime);
    return (
      rd.getFullYear() === selectedDate.getFullYear() &&
      rd.getMonth() === selectedDate.getMonth() &&
      rd.getDate() === selectedDate.getDate()
    );
  });

  const openEdit = (reminder) => {
    setEditingReminder(reminder);
    setEditText(reminder.note || "");
    setEditTime(new Date(reminder.reminderTime).toISOString().substring(11, 16));
  };

  const closeEdit = () => {
    setEditingReminder(null);
    setEditText("");
    setEditTime("");
  };

  const handleSaveEdit = async () => {
    if (!editingReminder) return;
    setSaving(true);
    const updatedTime = new Date(editingReminder.reminderTime);
    const [h, m] = editTime.split(":");
    updatedTime.setHours(Number(h));
    updatedTime.setMinutes(Number(m));

    try {
      await dispatch(
        updateReminder({
          id: editingReminder._id,
          reminderData: { note: editText, reminderTime: updatedTime.toISOString() },
        })
      ).unwrap();
      toast.success("Reminder updated");
      closeEdit();
    } catch (err) {
      toast.error(err?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this reminder? This cannot be undone.")) return;
    dispatch(deleteReminder(id))
      .unwrap()
      .then(() => toast.success("Reminder deleted"))
      .catch((err) => toast.error(err?.message || "Delete failed"));
  };

  const tileContent = ({ date, view }) => {
    if (view !== "month") return null;
    const has = allReminders.some(
      (r) => new Date(r.reminderTime).toDateString() === date.toDateString()
    );
    return has ? <span className="cal-dot" /> : null;
  };

  return (
    <Wrapper>
      {/* ── Page header ─────────────────────────── */}
      <div className="page-header">
        <div className="header-left">
          <h1 className="page-title">
            <MdOutlineNotificationsActive className="title-icon" />
            My Reminders
          </h1>
          <p className="page-sub">
            {allReminders.length} reminder{allReminders.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <Link to="/meals" className="browse-btn">
          <FaUtensils /> Browse Meals
        </Link>
      </div>

      {/* ── Stats strip ─────────────────────────── */}
      <div className="stats-strip">
        <div className="stat-chip">
          <span className="chip-num">{allReminders.length}</span>
          <span className="chip-label">Total</span>
        </div>
        <div className="stat-chip upcoming">
          <span className="chip-num">{upcomingCount}</span>
          <span className="chip-label">Upcoming</span>
        </div>
        <div className="stat-chip recurring">
          <span className="chip-num">{recurringCount}</span>
          <span className="chip-label">Recurring</span>
        </div>
      </div>

      {/* ── Main layout ──────────────────────────── */}
      <div className="main-layout">
        {/* Calendar */}
        <div className="calendar-col">
          <div className="calendar-card">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              tileContent={tileContent}
            />
          </div>
          <p className="cal-legend">
            <span className="legend-dot" /> Days with reminders
          </p>
        </div>

        {/* Reminder list */}
        <div className="list-col">
          <h2 className="list-heading">
            <FaClock className="heading-icon" />
            {moment(selectedDate).format("dddd, MMMM Do")}
          </h2>

          {isLoading ? (
            <div className="loading-wrap"><Loading /></div>
          ) : remindersForDate.length === 0 ? (
            <div className="empty-state">
              <FaBell className="empty-icon" />
              <h3>No reminders for this day</h3>
              <p>Pick a highlighted date or browse meals to set a new reminder.</p>
              <Link to="/meals" className="empty-cta">
                Browse Meals
              </Link>
            </div>
          ) : (
            <ul className="cards-list">
              {remindersForDate.map((reminder) => {
                const method = reminder.notificationMethod || "email";
                const meta = METHOD_META[method] || METHOD_META.email;
                const mealName = reminder.meal?.name || "Unnamed Meal";
                const isPast = new Date(reminder.reminderTime) < now;

                return (
                  <li key={reminder._id} className={`reminder-card${isPast ? " past" : ""}`}
                    style={{ "--accent": meta.color }}>
                    <div className="card-accent" />

                    <div className="card-top">
                      <h3 className="card-meal">{mealName}</h3>
                      <div className="badge-row">
                        <span className="method-badge"
                          style={{ color: meta.color, background: meta.bg }}>
                          {meta.icon} {meta.label}
                        </span>
                        {reminder.isRecurring && (
                          <span className="recurring-badge">
                            <FaRedo className="b-icon" />
                            {reminder.recurringFrequency || "recurring"}
                          </span>
                        )}
                        {isPast && <span className="past-badge">Past</span>}
                      </div>
                    </div>

                    <p className="card-time">
                      <FaClock className="time-icon" />
                      {moment(reminder.reminderTime).format("h:mm A")}
                    </p>

                    {reminder.note && (
                      <p className="card-note">"{reminder.note}"</p>
                    )}

                    <div className="card-actions">
                      <button className="action-btn edit"
                        onClick={() => openEdit(reminder)}>
                        <FaEdit /> Edit
                      </button>
                      <button className="action-btn delete"
                        onClick={() => handleDelete(reminder._id)}>
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* ── Edit modal ───────────────────────────── */}
      <AnimatePresence>
        {editingReminder && (
          <ModalOverlay
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && closeEdit()}
          >
            <ModalContent
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <div className="modal-header">
                <div>
                  <h3 className="modal-title">
                    {editingReminder.meal?.name || "Edit Reminder"}
                  </h3>
                  <p className="modal-sub">
                    {moment(editingReminder.reminderTime).format("MMM Do, YYYY")}
                  </p>
                </div>
                <button className="close-btn" onClick={closeEdit}>
                  <FaTimes />
                </button>
              </div>

              <div className="modal-body">
                <div className="field-group">
                  <label className="field-label">Time</label>
                  <input
                    className="field-input"
                    type="time"
                    value={editTime}
                    onChange={(e) => setEditTime(e.target.value)}
                  />
                </div>
                <div className="field-group">
                  <label className="field-label">Note (optional)</label>
                  <textarea
                    className="field-input field-textarea"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    placeholder="Add a note…"
                    maxLength={500}
                  />
                  <span className="char-count">{editText.length}/500</span>
                </div>
              </div>

              <div className="modal-footer">
                <button className="modal-cancel" onClick={closeEdit}>
                  <FaTimes /> Cancel
                </button>
                <button className="modal-save" onClick={handleSaveEdit}
                  disabled={saving}>
                  <FaSave /> {saving ? "Saving…" : "Save Changes"}
                </button>
              </div>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </Wrapper>
  );
};

export default Reminders;
