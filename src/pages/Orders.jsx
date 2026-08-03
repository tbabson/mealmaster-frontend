import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigation } from "react-router-dom";
import { useSelector } from "react-redux";
import customFetch from "../utils/customFetch";
import { NutritionRecommendations } from "../components";
import { formatDistanceToNow } from "date-fns";
import Wrapper from "../assets/wrappers/OrdersWrapper";
import { formatPrice } from "../utils/formatPrice";
import { IoBagOutline } from "react-icons/io5";
import { FiArrowRight, FiPackage, FiTruck, FiClock, FiRefreshCw, FiList } from "react-icons/fi";
import { FaShoppingBag } from "react-icons/fa";

const statusIcon = {
  pending: <FiClock />,
  processing: <FiPackage />,
  processed: <FiPackage />,
  delivered: <FiTruck />,
  cancelled: null,
};

const formatDate = (dateString) => {
  try {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  } catch {
    return "Unknown date";
  }
};

const Orders = () => {
  const navigation = useNavigation();
  const { orders } = useLoaderData();
  const ordersArray = Array.isArray(orders) ? orders : [];
  const currentUser = useSelector((state) => state.user?.user);

  const [recs, setRecs] = useState({ items: [], summary: "", isLoading: false });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigation.location]);

  // Suggestions derived from this order history. Cached server-side, so
  // revisiting the page does not trigger a new model call.
  useEffect(() => {
    if (!currentUser || ordersArray.length === 0) return;

    let cancelled = false;
    setRecs((r) => ({ ...r, isLoading: true }));

    customFetch
      .get("/nutrition/recommendations?limit=3")
      .then(({ data }) => {
        if (cancelled) return;
        setRecs({
          items: data.recommendations || [],
          summary: data.summary || "",
          isLoading: false,
        });
      })
      .catch(() => {
        // Order history is the point of this page — if suggestions are
        // unavailable, stay quiet rather than showing an error box here.
        if (!cancelled) setRecs({ items: [], summary: "", isLoading: false });
      });

    return () => {
      cancelled = true;
    };
  }, [currentUser, ordersArray.length]);

  if (!currentUser) {
    return (
      <Wrapper>
        <div className="guest-screen">
          <div className="guest-card">
            <div className="guest-avatar">
              <FaShoppingBag />
            </div>
            <h1 className="guest-title">Track Your Orders</h1>
            <p className="guest-sub">
              Sign in to view your order history, track deliveries in real time, and reorder your favourite meals with one tap.
            </p>

            <div className="guest-features">
              <div className="feature-item">
                <span className="feature-icon status-icon"><FiClock /></span>
                <div>
                  <p className="feature-label">Live Status Updates</p>
                  <p className="feature-desc">See exactly where your order is — from kitchen to doorstep</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon history-icon"><FiList /></span>
                <div>
                  <p className="feature-label">Full Order History</p>
                  <p className="feature-desc">Browse every past order with prices, items, and timestamps</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon reorder-icon"><FiRefreshCw /></span>
                <div>
                  <p className="feature-label">Easy Reordering</p>
                  <p className="feature-desc">Repeat a previous order without having to rebuild your cart</p>
                </div>
              </div>
            </div>

            <div className="guest-actions">
              <Link to="/login" className="btn-login">Sign In</Link>
              <Link to="/register" className="btn-register">Create Account</Link>
            </div>

            <p className="guest-footer-text">
              New here? <Link to="/register" className="inline-link">Create a free account</Link> and start ordering today.
            </p>
          </div>
        </div>
      </Wrapper>
    );
  }

  if (ordersArray.length === 0) {
    return (
      <Wrapper>
        <div className="page-header">
          <h1 className="page-title">My Orders</h1>
        </div>
        <div className="empty-state">
          <IoBagOutline className="empty-icon" />
          <h2>No orders yet</h2>
          <p>You haven't placed any orders. Start by browsing our meals.</p>
          <Link to="/" className="browse-btn">
            Browse Meals
          </Link>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="page-header">
        <h1 className="page-title">My Orders</h1>
        <span className="count-badge">
          {ordersArray.length} {ordersArray.length === 1 ? "order" : "orders"}
        </span>
      </div>

      <div className="orders-grid">
        {ordersArray.map((order) => {
          const mealCount = (order.cartItems || []).length;
          const previewImages = (order.cartItems || []).slice(0, 3);
          const statusKey = (order.status || "pending").toLowerCase();
          const deliveryKey = (order.deliveryStatus || "").toLowerCase();

          return (
            <div key={order._id} className="order-card">
              {/* Card header */}
              <div className="card-header">
                <div>
                  <span className="order-num">
                    #{(order.transactionId || order._id).slice(-8).toUpperCase()}
                  </span>
                  <span className="order-date">{formatDate(order.createdAt)}</span>
                </div>
                <span className={`status-badge ${statusKey}`}>
                  {statusIcon[statusKey]}
                  {order.status || "Pending"}
                </span>
              </div>

              {/* Meal previews */}
              <div className="card-body">
                <div className="meal-previews">
                  <div className="image-stack">
                    {previewImages.map((item, i) => (
                      <img
                        key={i}
                        src={item.image || "/placeholder-meal.jpg"}
                        alt={item.name}
                        className="preview-img"
                        style={{ zIndex: previewImages.length - i }}
                      />
                    ))}
                    {mealCount > 3 && (
                      <div className="more-count">+{mealCount - 3}</div>
                    )}
                  </div>
                  <span className="meal-label">
                    {mealCount} {mealCount === 1 ? "meal" : "meals"}
                  </span>
                </div>

                <div className="card-meta">
                  {order.deliveryStatus && (
                    <div className={`delivery-badge ${deliveryKey.replace(/\s+/g, "-")}`}>
                      <FiTruck />
                      {order.deliveryStatus}
                    </div>
                  )}
                  <div className={`payment-dot ${order.isPaid ? "paid" : "unpaid"}`}>
                    {order.isPaid ? "Paid" : "Pending payment"}
                  </div>
                </div>
              </div>

              {/* Card footer */}
              <div className="card-footer">
                <span className="order-total">
                  {formatPrice(order.totalAmount || 0)}
                </span>
                <Link to={`/orders/${order._id}`} className="details-link">
                  View Details <FiArrowRight />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <NutritionRecommendations
        recommendations={recs.items}
        summary={recs.summary}
        isLoading={recs.isLoading}
        title="Based on what you've ordered"
        subtitle="Meals whose nutrition balances out the pattern in your order history."
        showSummary={false}
      />
    </Wrapper>
  );
};

export default Orders;
