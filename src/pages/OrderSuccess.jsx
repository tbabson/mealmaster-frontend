import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link, useNavigation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Wrapper from "../assets/wrappers/OrderSuccess";
import { clearCart } from "../Features/Cart/cartSlice";
import customFetch from "../utils/customFetch";
import Loading from "../components/Loading";
import { formatPrice } from "../utils/formatPrice";
import { IoBagCheckOutline, IoStorefrontOutline } from "react-icons/io5";
import { MdReceiptLong } from "react-icons/md";
import { FiPackage, FiCalendar, FiHash, FiDollarSign } from "react-icons/fi";

const OrderSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [orderInfo, setOrderInfo] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigation.location]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        const sessionId = queryParams.get("session_id");
        if (sessionId) {
          const response = await customFetch.get(`/orders/by-session/${sessionId}`);
          setOrderInfo(response.data.order);
        }
        dispatch(clearCart());
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrderDetails();
  }, [dispatch, location.search]);

  if (isLoading) return <Loading variant="page" />;

  return (
    <Wrapper>
      <div className="page">
        <div className="card">
          {/* Animated checkmark */}
          <div className="check-wrap">
            <div className="check-ring" />
            <div className="check-circle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <h1 className="title">Order Placed!</h1>
          <p className="subtitle">
            Thank you for your order. We'll start preparing your meals once
            payment is confirmed.
          </p>

          {orderInfo && (
            <div className="order-details">
              <div className="details-header">
                <MdReceiptLong className="details-icon" />
                <span>Order Details</span>
              </div>

              <div className="details-grid">
                <div className="detail-item">
                  <FiHash className="detail-icon" />
                  <div>
                    <span className="detail-label">Order ID</span>
                    <span className="detail-value mono">
                      #{orderInfo._id?.slice(-8).toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="detail-item">
                  <FiCalendar className="detail-icon" />
                  <div>
                    <span className="detail-label">Order Date</span>
                    <span className="detail-value">
                      {new Date(orderInfo.createdAt).toLocaleDateString("en-NG", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                <div className="detail-item">
                  <FiDollarSign className="detail-icon" />
                  <div>
                    <span className="detail-label">Total Amount</span>
                    <span className="detail-value amount">
                      {formatPrice(orderInfo.totalAmount || orderInfo.totalPrice)}
                    </span>
                  </div>
                </div>

                <div className="detail-item">
                  <FiPackage className="detail-icon" />
                  <div>
                    <span className="detail-label">Status</span>
                    <span className="status-badge">Processing</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <p className="notice">
            A summary has been noted on your account. You can track your order from the orders page.
          </p>

          <div className="actions">
            <Link to="/orders" className="btn-primary">
              <IoBagCheckOutline />
              View My Orders
            </Link>
            <Link to="/" className="btn-secondary">
              <IoStorefrontOutline />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default OrderSuccess;
