import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment-timezone";
import {
  createReminder,
  syncWithCalendar,
  subscribeToPushNotifications,
} from "../Features/Reminder/reminderSlice";
import customFetch from "../utils/customFetch";
import { getPushSubscription, getExistingPushSubscription } from "../utils/push";
import Wrapper from "../assets/wrappers/Reminder";
import {
  FaArrowLeft,
  FaBell,
  FaEnvelope,
  FaCalendarAlt,
  FaClock,
  FaRedo,
  FaCheckCircle,
  FaLeaf,
} from "react-icons/fa";
import { MdOutlineNotificationsActive } from "react-icons/md";

const METHOD_OPTIONS = [
  {
    value: "email",
    label: "Email",
    icon: <FaEnvelope />,
    desc: "Get notified via email",
  },
  {
    value: "push",
    label: "Push",
    icon: <FaBell />,
    desc: "Browser push notification",
  },
  {
    value: "calendar",
    label: "Calendar",
    icon: <FaCalendarAlt />,
    desc: "Add to Google Calendar",
  },
];

const FREQ_OPTIONS = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];

const CreateReminder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const mealData = location.state?.meal?.meal || location.state?.meal || {};
  const [meal] = useState(mealData);

  const [reminderDate, setReminderDate] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [period, setPeriod] = useState("PM");
  const [notificationMethod, setNotificationMethod] = useState("email");
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringFrequency, setRecurringFrequency] = useState("daily");
  const [note, setNote] = useState("");
  const [isCalendarAuthorized, setIsCalendarAuthorized] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [enabledPush, setEnabledPush] = useState(false);
  const [isCheckingPush, setIsCheckingPush] = useState(true);
  // What this browser actually holds — used if the server round-trip is stale
  const [deviceSubscription, setDeviceSubscription] = useState(null);

  const { isLoading, pushSubscription } = useSelector(
    (state) => state.reminders
  );

  // Redirect if no meal data
  useEffect(() => {
    if (!mealData || Object.keys(mealData).length === 0) {
      const searchParams = new URLSearchParams(location.search);
      const authStatus = searchParams.get("calendar_auth");
      const storedMeal = localStorage.getItem("pendingReminderMeal");

      if (authStatus && storedMeal) {
        localStorage.removeItem("pendingReminderMeal");
      } else {
        navigate("/meals");
      }
    }
  }, []);

  // Push is a per-device, one-time opt-in. The browser keeps the subscription
  // across sessions, so restore it on load instead of asking the user again.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const existing = await getExistingPushSubscription();
      if (cancelled) return;
      if (existing) {
        setEnabledPush(true);
        setDeviceSubscription(existing);
        // Re-assert it server-side: the upsert is idempotent, and this heals
        // devices whose row was lost or whose keys were rotated.
        dispatch(subscribeToPushNotifications(existing));
      }
      setIsCheckingPush(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  // Check calendar auth
  useEffect(() => {
    const checkCalendarAuth = async () => {
      try {
        const response = await customFetch.get("/users/current-user");
        setIsCalendarAuthorized(
          response.data.user.googleCalendarSyncEnabled
        );
      } catch {
        // silent
      } finally {
        setIsCheckingAuth(false);
      }
    };
    checkCalendarAuth();

    const searchParams = new URLSearchParams(location.search);
    const authStatus = searchParams.get("calendar_auth");
    const err = searchParams.get("error");
    if (authStatus === "success") {
      setIsCalendarAuthorized(true);
      toast.success("Connected to Google Calendar");
    } else if (authStatus === "failed") {
      toast.error(err || "Failed to connect to Google Calendar");
    }
  }, [location]);

  const handleGoogleAuth = () => {
    localStorage.setItem("pendingReminderMeal", JSON.stringify(meal));
    window.location.href = `${
      import.meta.env.VITE_API_URL || "http://localhost:5000"
    }/api/v1/auth/google`;
  };

  const handleRevokeCalendar = async () => {
    try {
      await customFetch.post("/auth/google/revoke");
      setIsCalendarAuthorized(false);
      toast.success("Google Calendar disconnected");
    } catch {
      toast.error("Failed to disconnect Google Calendar");
    }
  };

  const handleEnablePush = async () => {
    try {
      const subData = await getPushSubscription();
      setDeviceSubscription(subData);
      await dispatch(subscribeToPushNotifications(subData)).unwrap();
      setEnabledPush(true);
      toast.success("Push notifications enabled on this device");
    } catch (error) {
      toast.error(error?.message || "Failed to enable push notifications");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!reminderDate || !reminderTime) {
      toast.error("Please select a date and time");
      return;
    }
    if (notificationMethod === "push" && !pushSubscription && !deviceSubscription) {
      toast.error("Please enable push notifications first");
      return;
    }
    if (notificationMethod === "calendar" && !isCalendarAuthorized) {
      toast.error("Please connect your Google Calendar first");
      return;
    }

    const combined = `${reminderDate} ${reminderTime} ${period}`;
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const utcTime = moment.tz(combined, "YYYY-MM-DD hh:mm A", userTimezone).utc().toISOString();

    const reminderData = {
      meal: meal._id,
      reminderTime: utcTime,
      timezone: userTimezone,
      notificationMethod,
      isRecurring,
      note,
      ...(isRecurring && { recurringFrequency }),
      ...(notificationMethod === "push" &&
        (pushSubscription || deviceSubscription) && {
          subscription: pushSubscription || deviceSubscription,
        }),
    };

    dispatch(createReminder(reminderData))
      .unwrap()
      .then((response) => {
        toast.success("Reminder created!");
        if (notificationMethod === "calendar") {
          dispatch(syncWithCalendar(response.reminder?._id))
            .unwrap()
            .then(() => toast.success("Synced with Google Calendar"))
            .catch(() => toast.error("Failed to sync with calendar"));
        }
        navigate("/reminders");
      })
      .catch((err) => {
        toast.error(err?.message || "Failed to create reminder");
      });
  };

  const previewTime =
    reminderDate && reminderTime
      ? moment(
          `${reminderDate} ${reminderTime} ${period}`,
          "YYYY-MM-DD hh:mm A"
        ).format("ddd, MMM Do YYYY [at] h:mm A")
      : null;

  const {
    name,
    image,
    mealType,
    dietary,
    ingredients = [],
    preparationSteps = [],
  } = meal;

  const dietaryArr = Array.isArray(dietary)
    ? dietary.filter(Boolean)
    : [dietary].filter(Boolean);
  const displayDietary = dietaryArr.find((d) => d !== "none") || null;

  return (
    <Wrapper>
      {/* ── Hero ────────────────────────────────── */}
      <div
        className="page-hero"
        style={image ? { "--hero-img": `url(${image})` } : {}}
      >
        <div className="hero-overlay" />
        <div className="hero-inner">
          <Link to={-1} className="back-link">
            <FaArrowLeft /> Back
          </Link>
          <div className="hero-content">
            <span className="hero-eyebrow">
              <MdOutlineNotificationsActive /> Set a Reminder
            </span>
            <h1 className="hero-title">{name || "Meal Reminder"}</h1>
            <div className="hero-badges">
              {mealType && <span className="hero-badge">{mealType}</span>}
              {displayDietary && (
                <span className="hero-badge green">
                  <FaLeaf /> {displayDietary}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Content ─────────────────────────────── */}
      <div className="page-content">
        {/* ── Form card ───────────────────────── */}
        <div className="form-card">
          <form onSubmit={handleSubmit}>
            {/* When? */}
            <div className="section-block">
              <h3 className="section-title">
                <FaClock className="section-icon" /> When?
              </h3>
              <div className="datetime-row">
                <div className="field-group">
                  <label className="field-label">Date</label>
                  <input
                    className="field-input"
                    type="date"
                    value={reminderDate}
                    onChange={(e) => setReminderDate(e.target.value)}
                    required
                  />
                </div>
                <div className="field-group">
                  <label className="field-label">Time</label>
                  <input
                    className="field-input"
                    type="time"
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                    required
                  />
                </div>
                <div className="field-group period-group">
                  <label className="field-label">Period</label>
                  <div className="period-toggle">
                    {["AM", "PM"].map((p) => (
                      <button
                        key={p}
                        type="button"
                        className={`period-btn${period === p ? " active" : ""}`}
                        onClick={() => setPeriod(p)}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {previewTime && (
                <div className="time-preview">
                  <FaCheckCircle className="preview-icon" />
                  Reminder set for <strong>{previewTime}</strong>
                </div>
              )}
            </div>

            {/* How? */}
            <div className="section-block">
              <h3 className="section-title">
                <FaBell className="section-icon" /> How to notify?
              </h3>
              <div className="method-pills">
                {METHOD_OPTIONS.map((m) => (
                  <button
                    key={m.value}
                    type="button"
                    className={`method-pill${
                      notificationMethod === m.value ? " active" : ""
                    }`}
                    onClick={() => setNotificationMethod(m.value)}
                  >
                    <span className="pill-icon">{m.icon}</span>
                    <span className="pill-label">{m.label}</span>
                    <span className="pill-desc">{m.desc}</span>
                  </button>
                ))}
              </div>

              {/* Push extras */}
              {notificationMethod === "push" && !isCheckingPush && (
                <div className="method-extra">
                  {pushSubscription || enabledPush ? (
                    <div className="connected-status">
                      <FaCheckCircle className="connected-icon" />
                      Push notifications enabled on this device
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="connect-btn"
                      onClick={handleEnablePush}
                    >
                      <FaBell /> Enable Push Notifications
                    </button>
                  )}
                </div>
              )}

              {/* Calendar extras */}
              {notificationMethod === "calendar" && !isCheckingAuth && (
                <div className="method-extra">
                  {isCalendarAuthorized ? (
                    <div className="connected-status">
                      <FaCheckCircle className="connected-icon" />
                      Connected to Google Calendar
                      <button
                        type="button"
                        className="disconnect-btn"
                        onClick={handleRevokeCalendar}
                      >
                        Disconnect
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="connect-btn google"
                      onClick={handleGoogleAuth}
                    >
                      <FaCalendarAlt /> Connect Google Calendar
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Recurring */}
            <div className="section-block">
              <h3 className="section-title">
                <FaRedo className="section-icon" /> Recurring?
              </h3>
              <div className="recurring-row">
                <label className="toggle-label">
                  <span className="toggle-text">Repeat this reminder</span>
                  <div
                    className={`toggle${isRecurring ? " on" : ""}`}
                    onClick={() => setIsRecurring((p) => !p)}
                  >
                    <div className="toggle-knob" />
                  </div>
                </label>

                {isRecurring && (
                  <div className="freq-pills">
                    {FREQ_OPTIONS.map((f) => (
                      <button
                        key={f.value}
                        type="button"
                        className={`freq-pill${
                          recurringFrequency === f.value ? " active" : ""
                        }`}
                        onClick={() => setRecurringFrequency(f.value)}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Note */}
            <div className="section-block">
              <h3 className="section-title">Note (optional)</h3>
              <div className="field-group" style={{ position: "relative" }}>
                <textarea
                  className="field-input field-textarea"
                  placeholder="E.g. 'Prep ingredients the night before…'"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  maxLength={500}
                />
                <span className="char-count">{note.length}/500</span>
              </div>
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={isLoading}
            >
              <MdOutlineNotificationsActive />
              {isLoading ? "Creating Reminder…" : "Create Reminder"}
            </button>
          </form>
        </div>

        {/* ── Meal summary card ────────────────── */}
        <aside className="meal-card">
          {image && (
            <div className="meal-card-img">
              <img src={image} alt={name} />
            </div>
          )}
          <div className="meal-card-body">
            <h3 className="mc-title">{name}</h3>

            {ingredients.length > 0 && (
              <div className="mc-section">
                <h4 className="mc-section-title">Ingredients</h4>
                <ul className="mc-list">
                  {ingredients.slice(0, 8).map((ing) => (
                    <li key={ing._id} className="mc-list-item">
                      <span className="ing-dot" />
                      {ing.name}
                      {ing.quantity && (
                        <span className="ing-qty">
                          — {ing.quantity} {ing.unit}
                        </span>
                      )}
                    </li>
                  ))}
                  {ingredients.length > 8 && (
                    <li className="mc-list-item dim">
                      +{ingredients.length - 8} more
                    </li>
                  )}
                </ul>
              </div>
            )}

            {preparationSteps.length > 0 && (
              <div className="mc-section">
                <h4 className="mc-section-title">Preparation</h4>
                <div className="steps-list">
                  {preparationSteps.slice(0, 3).map((step, si) =>
                    (step.steps || []).slice(0, 2).map((s, i) => (
                      <div key={s._id || i} className="step-row">
                        <span className="step-num">{s.stepNumber || si + 1}</span>
                        <span className="step-text">{s.instruction}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </Wrapper>
  );
};

export default CreateReminder;
