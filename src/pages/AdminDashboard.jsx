import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import {
  FaUtensils, FaBlog, FaShoppingCart, FaClipboardList,
  FaBell, FaStar, FaUsers, FaArrowRight,
} from "react-icons/fa";
import { FiTrendingUp, FiDollarSign, FiPackage, FiClock } from "react-icons/fi";
import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/AdminDashbaord";
import Loading from "../components/Loading";

const formatPrice = (n) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(n || 0);

const STATUS_COLORS = {
  Pending:    "#ff5722",
  Processing: "#3b82f6",
  Processed:  "#f59e0b",
  Delivered:  "#22c55e",
  Cancelled:  "#ef4444",
};

const DELIVERY_COLORS = {
  Scheduled:        "#3b82f6",
  Clearing:         "#f59e0b",
  "Out for Delivery": "#a855f7",
  Delivered:        "#22c55e",
  Failed:           "#ef4444",
};

const PIE_FALLBACK_COLORS = ["#28842b", "#ff5722", "#3b82f6", "#f59e0b", "#a855f7", "#ef4444"];

const StatCard = ({ icon, label, value, sub, color, link }) => (
  <Link to={link || "#"} className="stat-card" style={{ "--accent": color }}>
    <div className="stat-icon">{icon}</div>
    <div className="stat-body">
      <p className="stat-label">{label}</p>
      <p className="stat-value">{value}</p>
      {sub && <p className="stat-sub">{sub}</p>}
    </div>
    <FaArrowRight className="stat-arrow" />
  </Link>
);

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.user);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const { data } = await customFetch.get("/orders/stats");
      return data;
    },
    staleTime: 1000 * 60 * 2,
  });

  const quickLinks = [
    { title: "Meals",     icon: <FaUtensils />,     link: "/admin/meals" },
    { title: "Blog",      icon: <FaBlog />,          link: "/admin/blog" },
    { title: "Cart",      icon: <FaShoppingCart />,  link: "/admin/cart" },
    { title: "Orders",    icon: <FaClipboardList />, link: "/admin/orders" },
    { title: "Reminders", icon: <FaBell />,          link: "/admin/reminders" },
    { title: "Users",     icon: <FaUsers />,         link: "/admin/users" },
    { title: "Reviews",   icon: <FaStar />,          link: "/admin/reviews" },
  ];

  if (isLoading) {
    return <Loading variant="admin-dashboard" />;
  }

  if (isError || !data) {
    return (
      <Wrapper>
        <div className="error-state">
          <p>Could not load dashboard stats. Make sure the server is running.</p>
        </div>
      </Wrapper>
    );
  }

  const { totals, ordersByStatus, ordersByDelivery, recentOrders, monthlyData, topMeals } = data;

  const statusPieData = ordersByStatus.map((s) => ({ name: s._id, value: s.count }));
  const deliveryPieData = ordersByDelivery.map((d) => ({ name: d._id, value: d.count }));

  return (
    <Wrapper>
      {/* Header */}
      <div className="dash-header">
        <div>
          <h1 className="dash-title">Dashboard</h1>
          <p className="dash-sub">Welcome back, <strong>{user?.name || user?.fullName || "Admin"}</strong></p>
        </div>
        <span className="dash-date">{new Date().toLocaleDateString("en-NG", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</span>
      </div>

      {/* Stat Cards */}
      <div className="stat-grid">
        <StatCard icon={<FiDollarSign />}  label="Total Revenue"  value={formatPrice(totals.revenue)}      color="#22c55e"  link="/admin/orders" />
        <StatCard icon={<FiPackage />}     label="Total Orders"   value={totals.orders}                   color="#3b82f6"  link="/admin/orders" />
        <StatCard icon={<FiClock />}       label="Pending Orders" value={totals.pendingOrders}            color="#ff5722"  link="/admin/orders" />
        <StatCard icon={<FaUsers />}       label="Total Users"    value={totals.users}                    color="#a855f7"  link="/admin/users" />
        <StatCard icon={<FaUtensils />}    label="Total Meals"    value={totals.meals}                    color="#f59e0b"  link="/admin/meals" />
        <StatCard icon={<FiTrendingUp />}  label="Reviews"        value={totals.reviews}                  color="#06b6d4"  link="/admin/reviews" />
      </div>

      {/* Charts row 1: Revenue + Orders bar */}
      <div className="charts-row">
        <div className="chart-card wide">
          <h3 className="chart-title">Revenue &amp; Orders — Last 6 Months</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={monthlyData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#28842b" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#28842b" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="ordGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#ff5722" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#ff5722" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="rev" orientation="left"  tick={{ fontSize: 11 }} tickFormatter={(v) => `₦${(v/1000).toFixed(0)}k`} />
              <YAxis yAxisId="ord" orientation="right" tick={{ fontSize: 11 }} />
              <Tooltip
                formatter={(value, name) => name === "revenue" ? formatPrice(value) : value}
                labelStyle={{ fontWeight: 600 }}
              />
              <Legend />
              <Area yAxisId="rev" type="monotone" dataKey="revenue" name="Revenue (₦)" stroke="#28842b" fill="url(#revGrad)" strokeWidth={2} />
              <Area yAxisId="ord" type="monotone" dataKey="orders"  name="Orders"      stroke="#ff5722" fill="url(#ordGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Order Status Pie */}
        <div className="chart-card">
          <h3 className="chart-title">Order Status</h3>
          {statusPieData.length === 0 ? (
            <p className="empty-chart">No orders yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={statusPieData} cx="50%" cy="50%" innerRadius={55} outerRadius={90}
                  paddingAngle={3} dataKey="value" nameKey="name" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {statusPieData.map((entry, i) => (
                    <Cell key={i} fill={STATUS_COLORS[entry.name] || PIE_FALLBACK_COLORS[i % PIE_FALLBACK_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => [`${v} orders`]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Charts row 2: Top Meals + Delivery Status */}
      <div className="charts-row">
        <div className="chart-card">
          <h3 className="chart-title">Top 5 Ordered Meals</h3>
          {topMeals.length === 0 ? (
            <p className="empty-chart">No meal data yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={topMeals.map((m) => ({ name: m._id, orders: m.orders }))}
                layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="orders" name="Times Ordered" fill="#28842b" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Delivery Status Pie */}
        <div className="chart-card">
          <h3 className="chart-title">Delivery Status</h3>
          {deliveryPieData.length === 0 ? (
            <p className="empty-chart">No delivery data yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={deliveryPieData} cx="50%" cy="50%" outerRadius={80}
                  paddingAngle={3} dataKey="value" nameKey="name"
                >
                  {deliveryPieData.map((entry, i) => (
                    <Cell key={i} fill={DELIVERY_COLORS[entry.name] || PIE_FALLBACK_COLORS[i % PIE_FALLBACK_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => [`${v} orders`]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="section-card">
        <div className="section-top">
          <h3 className="chart-title" style={{ margin: 0 }}>Recent Orders</h3>
          <Link to="/admin/orders" className="view-all">View All <FaArrowRight /></Link>
        </div>
        <div className="table-wrap">
          <table className="recent-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 ? (
                <tr><td colSpan={5} className="empty-row">No orders yet</td></tr>
              ) : recentOrders.map((order) => (
                <tr key={order._id}>
                  <td className="mono">#{order._id.slice(-6).toUpperCase()}</td>
                  <td>{order.userId?.fullName || order.shippingAddress?.fullName || "—"}</td>
                  <td>{formatPrice(order.totalAmount)}</td>
                  <td>
                    <span className={`status-pill ${(order.status || "").toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>{new Date(order.createdAt).toLocaleDateString("en-NG")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Links */}
      <div className="section-card">
        <h3 className="chart-title">Quick Navigation</h3>
        <div className="quick-links">
          {quickLinks.map((m) => (
            <Link to={m.link} key={m.title} className="quick-link">
              <span className="ql-icon">{m.icon}</span>
              <span>{m.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default AdminDashboard;
