import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
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
    <Wrapper className={collapsed ? "sidebar-collapsed" : ""}>
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
            {!collapsed && <span className="brand-name">MealMaster</span>}
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
            <div className="avatar">{initials}</div>
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
                <span className="nav-icon">{icon}</span>
                {!collapsed && <span className="nav-label">{label}</span>}
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
          <Outlet />
        </main>
      </div>
    </Wrapper>
  );
};

export default Admin;
