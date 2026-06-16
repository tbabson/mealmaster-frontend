import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/SingleOrderWrapper";
import { formatDistanceToNow } from "date-fns";
import { formatPrice } from "../utils/formatPrice";
import { createReview } from "../Features/Review/reviewSlice";
import { FiArrowLeft, FiPackage, FiMapPin, FiTruck, FiCreditCard, FiStar } from "react-icons/fi";
import { MdReceiptLong } from "react-icons/md";
import { IoBagCheckOutline } from "react-icons/io5";

const statusColors = {
  pending:    { bg: "#fef9c3", color: "#854d0e" },
  processing: { bg: "#dbeafe", color: "#1e40af" },
  processed:  { bg: "#ffedd5", color: "#9a3412" },
  delivered:  { bg: "#dcfce7", color: "#166534" },
  cancelled:  { bg: "#fee2e2", color: "#991b1b" },
};

const deliveryColors = {
  "scheduled":         { bg: "#e0f2fe", color: "#0369a1" },
  "clearing":          { bg: "#fef3c7", color: "#92400e" },
  "out for delivery":  { bg: "#ede9fe", color: "#5b21b6" },
  "delivered":         { bg: "#dcfce7", color: "#166534" },
  "failed":            { bg: "#fee2e2", color: "#991b1b" },
};

const formatDate = (dateString) => {
  try {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  } catch {
    return "Unknown date";
  }
};

const fullDate = (dateString) => {
  try {
    return new Date(dateString).toLocaleDateString("en-NG", {
      day: "numeric", month: "long", year: "numeric",
    });
  } catch {
    return "N/A";
  }
};

const SingleOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { order } = useLoaderData();
  const { isLoading: reviewLoading } = useSelector((store) => store.review);
  const [reviewForms, setReviewForms] = useState({});

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    if (order?.cartItems) {
      const initial = {};
      order.cartItems.forEach((_, i) => {
        initial[i] = { isOpen: false, rating: 0, hoverRating: 0, title: "", comment: "", submitted: false };
      });
      setReviewForms(initial);
    }
  }, [order]);

  if (!order) {
    return (
      <Wrapper>
        <div className="not-found">
          <IoBagCheckOutline className="nf-icon" />
          <h2>Order not found</h2>
          <button className="back-btn" onClick={() => navigate("/orders")}>← Back to Orders</button>
        </div>
      </Wrapper>
    );
  }

  const statusKey = (order.status || "pending").toLowerCase();
  const deliveryKey = (order.deliveryStatus || "").toLowerCase();
  const isDelivered = deliveryKey === "delivered";

  const toggleReview = (i) =>
    setReviewForms((p) => ({ ...p, [i]: { ...p[i], isOpen: !p[i].isOpen } }));

  const setRating = (i, r) =>
    setReviewForms((p) => ({ ...p, [i]: { ...p[i], rating: r, hoverRating: 0 } }));

  const setHover = (i, r) =>
    setReviewForms((p) => ({ ...p, [i]: { ...p[i], hoverRating: r } }));

  const setField = (i, field, val) =>
    setReviewForms((p) => ({ ...p, [i]: { ...p[i], [field]: val } }));

  const submitReview = async (i, mealId) => {
    const f = reviewForms[i];
    if (!f.rating) return toast.error("Please select a rating");
    if (!f.title.trim()) return toast.error("Please enter a review title");
    if (!mealId) return toast.error("Meal ID not found");
    try {
      await dispatch(createReview({ rating: f.rating, title: f.title.trim(), comment: f.comment.trim(), meal: mealId })).unwrap();
      setReviewForms((p) => ({ ...p, [i]: { ...p[i], submitted: true, isOpen: false } }));
    } catch {}
  };

  return (
    <Wrapper>
      {/* Back link */}
      <Link to="/orders" className="back-link">
        <FiArrowLeft /> Back to Orders
      </Link>

      {/* Hero header */}
      <div className="order-hero">
        <div className="hero-left">
          <h1 className="hero-title">Order Details</h1>
          <div className="hero-meta">
            <span className="meta-item">
              <strong>ID:</strong>
              <span className="mono">#{(order.transactionId || order._id).slice(-10).toUpperCase()}</span>
            </span>
            {order.trackingNumber && (
              <span className="meta-item">
                <strong>Tracking:</strong>
                <span className="mono">{order.trackingNumber}</span>
              </span>
            )}
            <span className="meta-item">
              <strong>Placed:</strong> {formatDate(order.createdAt)}
            </span>
          </div>
        </div>
        <div className="hero-badges">
          {order.status && (() => {
            const s = statusColors[statusKey] || { bg: "#f1f5f9", color: "#334155" };
            return (
              <span className="hero-badge" style={{ background: s.bg, color: s.color }}>
                {order.status}
              </span>
            );
          })()}
          {order.deliveryStatus && (() => {
            const d = deliveryColors[deliveryKey] || { bg: "#f1f5f9", color: "#334155" };
            return (
              <span className="hero-badge" style={{ background: d.bg, color: d.color }}>
                <FiTruck /> {order.deliveryStatus}
              </span>
            );
          })()}
        </div>
      </div>

      <div className="content-grid">
        {/* Left column */}
        <div className="left-col">

          {/* Ordered meals */}
          <div className="section-card">
            <div className="section-header">
              <FiPackage className="section-icon" />
              <h2>Ordered Meals</h2>
            </div>
            <div className="meal-list">
              {(order.cartItems || []).map((item, i) => {
                const mealTotal = (item.ingredients || []).reduce(
                  (sum, ing) => sum + ing.price * ing.quantity, 0
                );
                const form = reviewForms[i];
                return (
                  <div key={i} className="meal-item">
                    {item.image && (
                      <img src={item.image} alt={item.name} className="meal-img" />
                    )}
                    <div className="meal-info">
                      <div className="meal-top">
                        <h3 className="meal-name">{item.name}</h3>
                        <span className="meal-price">{formatPrice(mealTotal)}</span>
                      </div>
                      {item.ingredients?.length > 0 && (
                        <ul className="ing-list">
                          {item.ingredients.map((ing, j) => (
                            <li key={j} className="ing-row">
                              <span>{ing.name} ({ing.quantity}{ing.unit || "g"})</span>
                              <span>{formatPrice(ing.price * ing.quantity)}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Review */}
                      {isDelivered && form && (
                        <div className="review-section">
                          {form.submitted ? (
                            <div className="review-done">
                              <FiStar /> Review submitted — thank you!
                            </div>
                          ) : (
                            <>
                              <button
                                className="review-toggle"
                                type="button"
                                onClick={() => toggleReview(i)}
                              >
                                <FiStar />
                                {form.isOpen ? "Close Review" : "Write a Review"}
                                <span className={`chevron ${form.isOpen ? "open" : ""}`}>▾</span>
                              </button>

                              {form.isOpen && (
                                <div className="review-form">
                                  <div className="star-row">
                                    <span className="star-label">Rating</span>
                                    <div className="stars">
                                      {[1,2,3,4,5].map((s) => (
                                        <span
                                          key={s}
                                          className={`star ${s <= (form.hoverRating || form.rating) ? "on" : ""}`}
                                          onClick={() => setRating(i, s)}
                                          onMouseEnter={() => setHover(i, s)}
                                          onMouseLeave={() => setHover(i, 0)}
                                        >★</span>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="form-field">
                                    <label>Review Title</label>
                                    <input
                                      type="text"
                                      value={form.title}
                                      onChange={(e) => setField(i, "title", e.target.value)}
                                      placeholder="Summarise your experience"
                                      maxLength={100}
                                    />
                                  </div>
                                  <div className="form-field">
                                    <label>Comment <span className="optional">(optional)</span></label>
                                    <textarea
                                      value={form.comment}
                                      onChange={(e) => setField(i, "comment", e.target.value)}
                                      placeholder="Tell us more..."
                                      rows={3}
                                    />
                                  </div>
                                  <div className="review-actions">
                                    <button
                                      className="submit-review"
                                      onClick={() => submitReview(i, item.mealID)}
                                      disabled={reviewLoading}
                                    >
                                      {reviewLoading ? "Submitting..." : "Submit Review"}
                                    </button>
                                    <button className="cancel-review" onClick={() => toggleReview(i)}>
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Shipping address */}
          <div className="section-card">
            <div className="section-header">
              <FiMapPin className="section-icon" />
              <h2>Shipping Address</h2>
            </div>
            <div className="address-block">
              <p className="address-name">{order.shippingAddress?.fullName}</p>
              <p>{order.shippingAddress?.address}</p>
              <p>{order.shippingAddress?.city}, {order.shippingAddress?.postalCode}</p>
              <p>{order.shippingAddress?.country}</p>
              <p className="address-phone">{order.shippingAddress?.phone}</p>
            </div>
          </div>
        </div>

        {/* Right column — summary */}
        <div className="right-col">
          <div className="section-card summary-card">
            <div className="section-header">
              <MdReceiptLong className="section-icon" />
              <h2>Order Summary</h2>
            </div>

            <div className="summary-rows">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatPrice((order.totalAmount || 0) - (order.taxPrice || 0) - (order.shippingPrice || 0))}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{formatPrice(order.shippingPrice || 0)}</span>
              </div>
              <div className="summary-row">
                <span>Tax</span>
                <span>{formatPrice(order.taxPrice || 0)}</span>
              </div>
              <div className="summary-row total-row">
                <span>Total</span>
                <span>{formatPrice(order.totalAmount || 0)}</span>
              </div>
            </div>

            <div className="info-rows">
              <div className="info-row">
                <FiCreditCard className="info-icon" />
                <div>
                  <span className="info-label">Payment Method</span>
                  <span className="info-val capitalize">{order.paymentMethod}</span>
                </div>
              </div>
              <div className="info-row">
                <span className={`payment-status ${order.isPaid ? "paid" : "unpaid"}`}>
                  {order.isPaid
                    ? `✓ Paid on ${fullDate(order.paidAt)}`
                    : "⏳ Payment pending"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SingleOrder;
