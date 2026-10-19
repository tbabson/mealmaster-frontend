import { Outlet, Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { MotionConfig, motion } from "framer-motion";
import { Logo } from "../components";
import PublicStyles from "../assets/wrappers/PublicStyles";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../Features/user/userSlice";
import {
  FaSignOutAlt,
  FaUtensils,
  FaBlog,
  FaShoppingCart,
  FaClipboardList,
  FaBell,
  FaStar,
  FaUsers,
  FaBars,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { BiSolidDashboard as FaDashboard } from "react-icons/bi";
import { useEffect, useState } from "react";
import Wrapper from "../assets/wrappers/Admin";

const NAV_LINKS = [
  { to: "/admin/dashboard", icon: <FaDashboard />,    label: "Dashboard" },
  { to: "/admin/meals",     icon: <FaUtensils />,     label: "Meals" },
  { to: "/admin/blog",      icon: <FaBlog />,          label: "Blog" },
  { to: "/admin/cart",      icon: <FaShoppingCart />,  label: "Cart" },
  { to: "/admin/orders",    icon: <FaClipboardList />, label: "Orders" },
  { to: "/admin/reminders", icon: <FaBell />,          label: "Reminders" },
  { to: "/admin/users",     icon: <FaUsers />,         label: "Users" },
  { to: "/admin/reviews",   icon: <FaStar />,          label: "Reviews" },
];

const Admin = () => {
  const dispatch   = useDispatch();
  const navigate   = useNavigate();
  const location   = useLocation();
  const { user }   = useSelector((state) => state.user);

  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [collapsed,   setCollapsed]   = useState(false);

  const isLoginPage = location.pathname === "/admin";

  useEffect(() => {
    if (!isLoginPage && (!user || user.role !== "admin")) {
      navigate("/admin", { state: { from: location.pathname } });
    }
  }, [user, navigate, location.pathname, isLoginPage]);

  // Close mobile sidebar on route change
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => navigate("/admin"))
      .catch((err) => console.error("Logout failed:", err));
  };

  if (isLoginPage) return <Outlet />;

  const initials = (user?.fullName || user?.name || "A")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <MotionConfig reducedMotion="user">
    <PublicStyles />
    <Wrapper className={`public-site admin-shell ${collapsed ? "sidebar-collapsed" : ""}`}>
      {/* Mobile overlay backdrop */}
      {mobileOpen && (
        <div className="backdrop" onClick={() => setMobileOpen(false)} />
      )}

      {/* Mobile toggle button */}
      <button
        className="mobile-toggle"
        onClick={() => setMobileOpen((p) => !p)}
        aria-label="Toggle sidebar"
      >
        {mobileOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div className="layout">
        {/* Sidebar */}
        <aside className={`sidebar ${mobileOpen ? "mobile-open" : ""}`}>

          {/* Sidebar header */}
          <div className="sidebar-header">
            {!collapsed && (
              <Link to="/" className="brand-logo" aria-label="MealMaster home">
                <Logo />
              </Link>
            )}
            <button
              className="collapse-btn desktop-only"
              onClick={() => setCollapsed((p) => !p)}
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
            </button>
          </div>

          {/* User info */}
          <div className="user-info">
            <div className="avatar">
              {user?.profileImage ? <img src={user.profileImage} alt="" /> : initials}
            </div>
            {!collapsed && (
              <div className="user-text">
                <p className="user-name">{user?.fullName || user?.name || "Admin"}</p>
                <p className="user-role">Administrator</p>
              </div>
            )}
          </div>

          <div className="nav-divider" />

          {/* Nav links */}
          <nav className="nav-links">
            {NAV_LINKS.map(({ to, icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
                title={collapsed ? label : undefined}
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="admin-nav-active"
                        className="nav-active"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="nav-icon">{icon}</span>
                    {!collapsed && <span className="nav-label">{label}</span>}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Logout */}
          <div className="sidebar-footer">
            <div className="nav-divider" />
            <button
              className="logout-btn"
              onClick={handleLogout}
              title={collapsed ? "Logout" : undefined}
            >
              <span className="nav-icon"><FaSignOutAlt /></span>
              {!collapsed && <span className="nav-label">Logout</span>}
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="main-content">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </Wrapper>
    </MotionConfig>
  );
};

export default Admin;
