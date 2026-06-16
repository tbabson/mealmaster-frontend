import { useSelector } from "react-redux";
import { CartItemList, CartTotals } from "../components";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Cart";
import { IoBagOutline } from "react-icons/io5";
import { FaShoppingCart, FaStar, FaBolt } from "react-icons/fa";
import { FiShield } from "react-icons/fi";

const Cart = () => {
  const { numItemsInCart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  if (!user) {
    return (
      <Wrapper>
        <div className="guest-screen">
          <div className="guest-card">
            <div className="guest-avatar">
              <FaShoppingCart />
            </div>
            <h1 className="guest-title">Your Cart Awaits</h1>
            <p className="guest-sub">
              Sign in to save meals to your cart, enjoy a seamless checkout, and
              have your orders delivered straight to your door.
            </p>

            <div className="guest-features">
              <div className="feature-item">
                <span className="feature-icon save-icon">
                  <FaStar />
                </span>
                <div>
                  <p className="feature-label">Save Your Favourites</p>
                  <p className="feature-desc">
                    Add meals to your cart and they'll be waiting when you
                    return
                  </p>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon checkout-icon">
                  <FaBolt />
                </span>
                <div>
                  <p className="feature-label">Fast Checkout</p>
                  <p className="feature-desc">
                    Your saved address and payment details speed up every order
                  </p>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon secure-icon">
                  <FiShield />
                </span>
                <div>
                  <p className="feature-label">Secure Payments</p>
                  <p className="feature-desc">
                    Every transaction is encrypted and your details stay private
                  </p>
                </div>
              </div>
            </div>

            <div className="guest-actions">
              <Link to="/login" className="btn-login">
                Sign In
              </Link>
              <Link to="/register" className="btn-register">
                Create Account
              </Link>
            </div>

            <p className="guest-footer-text">
              Just browsing?{" "}
              <Link to="/meals " className="inline-link">
                Explore our meals
              </Link>{" "}
              and add to cart after signing in.
            </p>
          </div>
        </div>
      </Wrapper>
    );
  }

  if (numItemsInCart === 0) {
    return (
      <Wrapper>
        <div className="empty-state">
          <IoBagOutline className="empty-icon" />
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any meals yet.</p>
          <Link to="/meals" className="btn btn-primary">
            Browse Meals
          </Link>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="cart-header">
        <h2>Shopping Cart</h2>
        <span className="item-count">
          {numItemsInCart} {numItemsInCart === 1 ? "meal" : "meals"}
        </span>
      </div>
      <div className="cartContainer">
        <div className="cartItemList">
          <CartItemList />
        </div>
        <div className="cartTotals">
          <CartTotals />
          <Link to="/checkout" className="btn checkout-btn">
            Proceed to Checkout
          </Link>
          <Link to="/meals" className="continue-link">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

export default Cart;
