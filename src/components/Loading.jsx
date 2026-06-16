import Wrapper from "../assets/wrappers/Loading";

// ── Base shimmer block ────────────────────────────────────────────────
const Sk = ({ w = "100%", h = "16px", r = "6px", mb, className = "", style = {} }) => (
  <div
    className={`sk${className ? " " + className : ""}`}
    style={{ width: w, height: h, borderRadius: r, marginBottom: mb, flexShrink: 0, ...style }}
  />
);

// ── Page (generic) ────────────────────────────────────────────────────
const PageSkeleton = () => (
  <div className="sk-page">
    <div className="sk-page-hero">
      <Sk w="55%" h="38px" r="10px" />
      <Sk w="38%" h="20px" />
      <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
        <Sk w="110px" h="40px" r="20px" />
        <Sk w="110px" h="40px" r="20px" />
      </div>
    </div>
    <div className="sk-three-cards">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="sk-card">
          <Sk h="130px" r="10px" />
          <Sk w="70%" h="16px" />
          <Sk w="45%" h="14px" />
        </div>
      ))}
    </div>
    <div className="sk-card" style={{ padding: "1.5rem", gap: "0.8rem" }}>
      {[...Array(4)].map((_, i) => (
        <Sk key={i} w={`${90 - i * 10}%`} h="14px" />
      ))}
    </div>
  </div>
);

// ── Profile ───────────────────────────────────────────────────────────
const ProfileSkeleton = () => (
  <div className="sk-profile">
    <div className="sk-profile-grid">
      {/* Sidebar */}
      <div className="sk-sidebar">
        <Sk w="110px" h="110px" r="50%" style={{ marginBottom: "0.5rem" }} />
        <Sk w="65%" h="20px" r="8px" />
        <Sk w="80%" h="14px" />
        <Sk w="50%" h="14px" />
        <div className="sk-pills-row" style={{ marginTop: "0.5rem" }}>
          <Sk h="56px" r="10px" style={{ flex: 1 }} />
          <Sk h="56px" r="10px" style={{ flex: 1 }} />
          <Sk h="56px" r="10px" style={{ flex: 1 }} />
        </div>
        <div style={{ width: "100%", height: "1px", background: "#f1f5f9", margin: "0.25rem 0" }} />
        <Sk w="100%" h="42px" r="9px" />
        <Sk w="100%" h="42px" r="9px" />
      </div>

      {/* Right panel */}
      <div className="sk-profile-right">
        <div className="sk-tabs">
          <Sk h="40px" r="8px" style={{ flex: 1 }} />
          <Sk h="40px" r="8px" style={{ flex: 1 }} />
          <Sk h="40px" r="8px" style={{ flex: 1 }} />
        </div>
        <div className="sk-list-panel">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="sk-list-row">
              <Sk w="44px" h="44px" r="12px" />
              <div className="sk-col" style={{ gap: "0.5rem" }}>
                <Sk w="55%" h="15px" />
                <Sk w="38%" h="13px" />
              </div>
              <Sk w="20px" h="20px" r="4px" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ── Reminders ─────────────────────────────────────────────────────────
const RemindersSkeleton = () => (
  <div className="sk-reminders">
    <Sk w="220px" h="32px" r="8px" />
    {[...Array(5)].map((_, i) => (
      <div key={i} className="sk-reminder-card">
        <Sk w="44px" h="44px" r="12px" />
        <div className="sk-col" style={{ gap: "0.55rem" }}>
          <Sk w="60%" h="16px" />
          <Sk w="45%" h="13px" />
          <div style={{ display: "flex", gap: "0.4rem", marginTop: "0.2rem" }}>
            <Sk w="70px" h="22px" r="20px" />
            <Sk w="60px" h="22px" r="20px" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

// ── Single Meal ───────────────────────────────────────────────────────
const SingleMealSkeleton = () => (
  <div className="sk-single-meal">
    <Sk w="120px" h="16px" r="6px" />
    <div className="sk-meal-hero">
      <Sk className="sk-meal-image" />
      <div className="sk-col">
        <Sk w="80%" h="32px" r="8px" />
        <Sk w="50%" h="18px" />
        <div style={{ display: "flex", gap: "0.5rem", margin: "0.5rem 0" }}>
          <Sk w="80px" h="28px" r="20px" />
          <Sk w="80px" h="28px" r="20px" />
          <Sk w="80px" h="28px" r="20px" />
        </div>
        <Sk w="100%" h="14px" />
        <Sk w="90%" h="14px" />
        <Sk w="70%" h="14px" />
        <Sk w="140px" h="44px" r="10px" style={{ marginTop: "1rem" }} />
      </div>
    </div>
    {[...Array(2)].map((_, i) => (
      <div key={i} className="sk-card" style={{ gap: "0.9rem", padding: "1.5rem" }}>
        <Sk w="180px" h="22px" r="8px" />
        {[...Array(3)].map((_, j) => (
          <Sk key={j} w={`${100 - j * 8}%`} h="14px" />
        ))}
      </div>
    ))}
  </div>
);

// ── Single Blog ───────────────────────────────────────────────────────
const SingleBlogSkeleton = () => (
  <div className="sk-single-blog">
    <Sk w="160px" h="14px" r="6px" />
    <Sk w="75%" h="38px" r="8px" />
    <Sk w="50%" h="22px" r="6px" />
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Sk w="40px" h="40px" r="50%" />
      <Sk w="160px" h="14px" />
      <Sk w="100px" h="14px" />
    </div>
    <Sk className="sk-blog-hero-img" />
    {[...Array(2)].map((_, i) => (
      <div key={i} className="sk-paragraph">
        {[...Array(4)].map((_, j) => (
          <Sk key={j} w={j === 3 ? "65%" : "100%"} h="14px" />
        ))}
      </div>
    ))}
  </div>
);

// ── Blog Grid ─────────────────────────────────────────────────────────
const BlogGridSkeleton = () => (
  <div className="sk-blog-wrap">
    <Sk w="200px" h="34px" r="8px" />
    <Sk w="100%" h="60px" r="10px" />
    <div className="sk-blog-grid">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="sk-blog-card">
          <Sk className="sk-blog-img" />
          <div className="sk-blog-body">
            <Sk w="40%" h="12px" />
            <Sk w="85%" h="18px" />
            <Sk w="100%" h="13px" />
            <Sk w="70%" h="13px" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ── Admin Table (full-page) ───────────────────────────────────────────
const AdminTableSkeleton = () => (
  <div className="sk-admin">
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Sk w="200px" h="30px" r="8px" />
      <Sk w="120px" h="38px" r="8px" />
    </div>
    <div className="sk-filter-bar">
      {[...Array(4)].map((_, i) => (
        <Sk key={i} w="160px" h="38px" r="8px" />
      ))}
      <Sk w="90px" h="38px" r="8px" style={{ marginLeft: "auto" }} />
    </div>
    <AdminRowsSkeleton />
  </div>
);

// ── Admin Rows (inline — inside a .table-card) ────────────────────────
const AdminRowsSkeleton = () => (
  <div className="sk-table-card">
    <div className="sk-table-head">
      {[...Array(5)].map((_, i) => (
        <Sk key={i} w={i === 0 ? "40px" : "1fr"} h="14px" style={{ flex: i === 0 ? "0 0 40px" : 1 }} />
      ))}
    </div>
    <div className="sk-inline-rows">
      {[...Array(7)].map((_, i) => (
        <div key={i} className="sk-table-row">
          <Sk w="28px" h="28px" r="6px" style={{ flex: "0 0 28px" }} />
          <Sk h="14px" style={{ flex: 2 }} />
          <Sk h="14px" style={{ flex: 1 }} />
          <Sk h="14px" style={{ flex: 1 }} />
          <Sk w="70px" h="24px" r="20px" style={{ flex: "0 0 70px" }} />
          <Sk w="60px" h="30px" r="8px" style={{ flex: "0 0 60px" }} />
        </div>
      ))}
    </div>
  </div>
);

// ── Admin Dashboard ───────────────────────────────────────────────────
const AdminDashboardSkeleton = () => (
  <div className="sk-dashboard">
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Sk w="260px" h="32px" r="8px" />
      <Sk w="140px" h="14px" r="6px" />
    </div>
    <div className="sk-stat-grid">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="sk-stat-card">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Sk w="44px" h="44px" r="12px" />
            <Sk w="60px" h="22px" r="20px" />
          </div>
          <Sk w="50%" h="32px" r="6px" />
          <Sk w="70%" h="13px" />
        </div>
      ))}
    </div>
    <div className="sk-card" style={{ height: "260px" }}>
      <Sk w="200px" h="22px" r="6px" />
      <Sk w="100%" style={{ flex: 1 }} />
    </div>
    <div className="sk-three-cards">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="sk-card">
          <Sk h="44px" r="10px" />
          <Sk w="60%" h="16px" />
          <Sk w="40%" h="13px" />
        </div>
      ))}
    </div>
  </div>
);

// ── Admin Blog grid (inline) ──────────────────────────────────────────
const AdminBlogSkeleton = () => (
  <div className="sk-blog-grid" style={{ padding: "1rem" }}>
    {[...Array(6)].map((_, i) => (
      <div key={i} className="sk-blog-card">
        <Sk className="sk-blog-img" />
        <div className="sk-blog-body">
          <Sk w="40%" h="12px" />
          <Sk w="85%" h="18px" />
          <Sk w="70%" h="13px" />
        </div>
      </div>
    ))}
  </div>
);

// ── Admin Reminders (inline) ──────────────────────────────────────────
const AdminRemindersSkeleton = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "1rem" }}>
    {[...Array(4)].map((_, i) => (
      <div key={i} className="sk-reminder-card">
        <Sk w="44px" h="44px" r="12px" />
        <div className="sk-col" style={{ gap: "0.5rem" }}>
          <Sk w="55%" h="16px" />
          <Sk w="40%" h="13px" />
        </div>
      </div>
    ))}
  </div>
);

// ── Main component ────────────────────────────────────────────────────
const VARIANTS = {
  page:              PageSkeleton,
  profile:           ProfileSkeleton,
  reminders:         RemindersSkeleton,
  "single-meal":     SingleMealSkeleton,
  "single-blog":     SingleBlogSkeleton,
  "blog-grid":       BlogGridSkeleton,
  "admin-table":     AdminTableSkeleton,
  "admin-rows":      AdminRowsSkeleton,
  "admin-dashboard": AdminDashboardSkeleton,
  "admin-blog":      AdminBlogSkeleton,
  "admin-reminders": AdminRemindersSkeleton,
};

const Loading = ({ variant = "page" }) => {
  const Skeleton = VARIANTS[variant] || PageSkeleton;
  return (
    <Wrapper>
      <Skeleton />
    </Wrapper>
  );
};

export default Loading;
