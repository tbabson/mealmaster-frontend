import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useNavigation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import Wrapper from "../assets/wrappers/checkout";
import customFetch from "../utils/customFetch";
import { formatPrice } from "../utils/formatPrice";
import { FormRow, Loading } from "../components";
import { clearCart } from "../Features/Cart/cartSlice";
import { IoBagCheckOutline } from "react-icons/io5";
import { MdOutlineLocalShipping, MdPayment } from "react-icons/md";
import { BsBank2 } from "react-icons/bs";
import { FiCreditCard, FiCopy, FiCheck } from "react-icons/fi";
import { TbTransfer } from "react-icons/tb";

const steps = ["Cart", "Checkout", "Confirmation"];

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigation = useNavigation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigation.location]);

  const { cartItems: rawCartItems, cartTotal, shipping, tax, orderTotal } = useSelector(
    (state) => state.cart
  );
  const cartItems = Array.isArray(rawCartItems) ? rawCartItems : [];
  const { user } = useSelector((state) => state.user);

  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [transferConfirmed, setTransferConfirmed] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyAccountNumber = () => {
    navigator.clipboard.writeText(bankDetails.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.fullName || "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const bankDetails = {
    bankName: "Access Bank",
    accountName: "BabaTunde Taiwo Adekunle",
    accountNumber: "0088457904",
  };

  useEffect(() => {
    if (!cartItems.length) navigate("/");
  }, [cartItems, navigate]);

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    const { fullName, address, city, postalCode, country, phone } = shippingInfo;
    if (!fullName || !address || !city || !postalCode || !country || !phone) {
      toast.error("Please fill in all shipping information fields");
      return;
    }
    if (paymentMethod === "stripe") {
      processStripePayment();
    } else if (paymentMethod === "bankTransfer" && transferConfirmed) {
      processBankTransfer();
    } else {
      toast.error("Please confirm your bank transfer before proceeding");
    }
  };

  const processStripePayment = async () => {
    try {
      setIsLoading(true);
      const response = await customFetch.post("/payment/create-stripe-session", {
        cartItems,
        shippingAddress: shippingInfo,
        userId: user._id,
        totalAmount: orderTotal,
      });
      const stripe = await loadStripe(
        "pk_test_51R3cj1AHONjyWeGBGDT4uBTbaaNSwlPpe7a2kRUrU2q8p79e1gvmL6wsmogs8i6ClS2iEcSvQ0CqQovg15IcED5U00yJwodQfV"
      );
      const { sessionId } = response.data;
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) toast.error(error.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Payment processing failed");
    } finally {
      setIsLoading(false);
    }
  };

  const processBankTransfer = async () => {
    try {
      setIsLoading(true);
      const response = await customFetch.post("/payment/orders/place", {
        cartItems,
        shippingAddress: shippingInfo,
        paymentMethod: "bankTransfer",
        paymentResult: { status: "pending", update_time: new Date().toISOString() },
        taxPrice: tax,
        shippingPrice: shipping,
        totalAmount: orderTotal,
        isPaid: false,
        transactionId: `BT-${Date.now()}`,
      });
      if (response && response.status >= 200 && response.status < 300) {
        dispatch(clearCart());
        toast.success("Order placed! We'll process it once payment is verified.");
        setTimeout(() => navigate("/order-success", { replace: true }), 300);
      } else {
        throw new Error("Order creation failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to process order");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loading variant="page" />;

  return (
    <Wrapper>
      {/* Progress steps */}
      <div className="steps">
        {steps.map((step, i) => (
          <React.Fragment key={step}>
            <div className={`step ${i <= 1 ? "active" : ""} ${i === 1 ? "current" : ""}`}>
              <div className="step-dot">{i + 1}</div>
              <span>{step}</span>
            </div>
            {i < steps.length - 1 && <div className={`step-line ${i === 0 ? "active" : ""}`} />}
          </React.Fragment>
        ))}
      </div>

      <div className="checkout-container">
        {/* Left — Form */}
        <div className="form-col">
          <div className="checkout-card">
            <div className="card-section-title">
              <MdOutlineLocalShipping className="section-icon" />
              <h3>Shipping Address</h3>
            </div>

            <form onSubmit={handleOrderSubmit}>
              <FormRow
                type="text"
                name="fullName"
                labelText="Full Name"
                value={shippingInfo.fullName}
                onChange={handleShippingChange}
              />
              <FormRow
                type="text"
                name="address"
                labelText="Street Address"
                value={shippingInfo.address}
                onChange={handleShippingChange}
              />
              <div className="form-grid">
                <FormRow
                  type="text"
                  name="city"
                  labelText="City"
                  value={shippingInfo.city}
                  onChange={handleShippingChange}
                />
                <FormRow
                  type="text"
                  name="postalCode"
                  labelText="Postal Code"
                  value={shippingInfo.postalCode}
                  onChange={handleShippingChange}
                />
              </div>
              <FormRow
                type="text"
                name="country"
                labelText="Country"
                value={shippingInfo.country}
                onChange={handleShippingChange}
              />
              <FormRow
                type="text"
                name="phone"
                labelText="Phone Number"
                value={shippingInfo.phone}
                onChange={handleShippingChange}
              />

              <div className="payment-section">
                <div className="card-section-title">
                  <MdPayment className="section-icon" />
                  <h3>Payment Method</h3>
                </div>

                <div className="payment-options">
                  <label className={`payment-card ${paymentMethod === "stripe" ? "selected" : ""}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="stripe"
                      checked={paymentMethod === "stripe"}
                      onChange={() => setPaymentMethod("stripe")}
                    />
                    <FiCreditCard className="pay-icon" />
                    <div>
                      <span className="pay-label">Credit / Debit Card</span>
                      <span className="pay-sub">Powered by Stripe</span>
                    </div>
                  </label>

                  <label className={`payment-card ${paymentMethod === "bankTransfer" ? "selected" : ""}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bankTransfer"
                      checked={paymentMethod === "bankTransfer"}
                      onChange={() => setPaymentMethod("bankTransfer")}
                    />
                    <BsBank2 className="pay-icon" />
                    <div>
                      <span className="pay-label">Bank Transfer</span>
                      <span className="pay-sub">Transfer directly to our account</span>
                    </div>
                  </label>
                </div>
              </div>

              {paymentMethod === "stripe" && (
                <button className="submit-btn" type="submit" disabled={isLoading}>
                  <IoBagCheckOutline />
                  {isLoading ? "Processing..." : "Proceed to Payment"}
                </button>
              )}

              {paymentMethod === "bankTransfer" && (
                <div className="bank-transfer-container">
                  {/* Steps */}
                  <div className="transfer-steps">
                    <div className="transfer-step">
                      <div className="t-step-num">1</div>
                      <span>Copy account details below</span>
                    </div>
                    <div className="transfer-step-line" />
                    <div className="transfer-step">
                      <div className="t-step-num">2</div>
                      <span>Make the transfer in your bank app</span>
                    </div>
                    <div className="transfer-step-line" />
                    <div className="transfer-step">
                      <div className="t-step-num">3</div>
                      <span>Check the box and confirm below</span>
                    </div>
                  </div>

                  {/* Amount to pay */}
                  <div className="transfer-amount">
                    <span className="amount-label">Amount to Transfer</span>
                    <span className="amount-value">{formatPrice(orderTotal)}</span>
                  </div>

                  {/* Bank slip card */}
                  <div className="bank-slip">
                    <div className="bank-slip-header">
                      <BsBank2 className="slip-bank-icon" />
                      <span>{bankDetails.bankName}</span>
                    </div>
                    <div className="slip-row">
                      <span className="slip-key">Account Name</span>
                      <span className="slip-val">{bankDetails.accountName}</span>
                    </div>
                    <div className="slip-row account-row">
                      <span className="slip-key">Account Number</span>
                      <div className="account-num-wrap">
                        <span className="slip-val account-num">
                          {bankDetails.accountNumber}
                        </span>
                        <button
                          type="button"
                          className={`copy-btn ${copied ? "copied" : ""}`}
                          onClick={copyAccountNumber}
                          aria-label="Copy account number"
                        >
                          {copied ? <FiCheck /> : <FiCopy />}
                          {copied ? "Copied!" : "Copy"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Confirmation */}
                  <label className={`confirmation-label ${transferConfirmed ? "checked" : ""}`}>
                    <input
                      type="checkbox"
                      checked={transferConfirmed}
                      onChange={() => setTransferConfirmed(!transferConfirmed)}
                    />
                    <span>I confirm that I have made the transfer of <strong>{formatPrice(orderTotal)}</strong></span>
                  </label>

                  <button
                    className="submit-btn"
                    type="submit"
                    disabled={isLoading || !transferConfirmed}
                  >
                    <TbTransfer />
                    {isLoading ? "Processing..." : "Confirm Order"}
                  </button>
                </div>
              )}
            </form>
          </div>

          <Link to="/cart" className="back-link">← Back to Cart</Link>
        </div>

        {/* Right — Order Summary */}
        <div className="summary-col">
          <div className="checkout-card sticky-summary">
            <div className="card-section-title">
              <IoBagCheckOutline className="section-icon" />
              <h3>Order Summary</h3>
            </div>

            <div className="order-items">
              {cartItems.map((meal) => (
                <div className="order-item" key={meal.mealID}>
                  <div className="order-item-header">
                    {meal.image && (
                      <img className="item-image" src={meal.image} alt={meal.name} />
                    )}
                    <h4 className="item-name">{meal.name}</h4>
                  </div>
                  <ul className="ingredients-list">
                    {meal.ingredients.map((ing) => (
                      <li className="ingredient-item" key={ing.name}>
                        <span>{ing.name} ({ing.quantity} {ing.unit})</span>
                        <span>{formatPrice(ing.price * ing.quantity)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="summary-section">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{formatPrice(shipping)}</span>
              </div>
              <div className="summary-row">
                <span>Tax (10%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="total-row">
                <span>Total</span>
                <span>{formatPrice(orderTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Checkout;
