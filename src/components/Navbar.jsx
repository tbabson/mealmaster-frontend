import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { FiShoppingBag, FiMenu, FiX, FiLogOut } from "react-icons/fi";
import { Logo } from "../components";
import { fetchCurrentUser, logoutUser } from "../Features/user/userSlice";
import Wrapper from "../assets/wrappers/Navbar";

const LINKS = [
  { to: "/meals", label: "Meals" },
  { to: "/nutrition", label: "Nutrition" },
  { to: "/orders", label: "Orders" },
  { to: "/reminders", label: "Reminders" },
  { to: "/blog", label: "Blog" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { user, loading, loggedOut } = useSelector((state) => state.user);
  const numInCart = useSelector((state) => state.cart?.numItemsInCart || 0);

  // Only fetch on mount or when the user clears without an explicit logout
  useEffect(() => {
    if (!user && !loggedOut) dispatch(fetchCurrentUser());
  }, [dispatch, user, loggedOut]);

  // Close the mobile menu whenever the route changes
  useEffect(() => setIsMenuOpen(false), [location.pathname]);

  // Hide the bar while scrolling down, bring it back on the way up
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > prev && y > 240 && !isMenuOpen);
  });

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .catch(() => {})
      .finally(() => navigate("/"));
  };

  const firstName = (user?.fullName || user?.name || "").split(" ")[0];

  return (
    <Wrapper>
      <motion.nav
        className={`nav-bar ${scrolled ? "is-scrolled" : ""}`}
        aria-label="Main"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -120 : 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link to="/" className="nav-logo" aria-label="MealMaster home">
          <Logo />
        </Link>

        <ul className="nav-links">
          {LINKS.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} className="nav-link">
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="nav-active"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="nav-label">{link.label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <Link to="/cart" className="cart-btn" aria-label={`Cart, ${numInCart} items`}>
            <FiShoppingBag />
            <AnimatePresence>
              {numInCart > 0 && (
                <motion.span
                  key={numInCart}
                  className="cart-count"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  {numInCart > 99 ? "99+" : numInCart}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {user ? (
            <div className="user-chip">
              <Link to="/profile" className="avatar" title="Your profile" aria-label="Your profile">
                {user.profileImage ? (
                  <img src={user.profileImage} alt="" />
                ) : (
                  (firstName || "U")[0].toUpperCase()
                )}
              </Link>
              <button
                type="button"
                className="icon-btn hide-mobile"
                onClick={handleLogout}
                disabled={loading}
                aria-label="Log out"
              >
                <FiLogOut />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              state={{ from: location.pathname }}
              className="login-btn hide-mobile"
            >
              Log in
            </Link>
          )}

          <button
            type="button"
            className="menu-toggle"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0 round 1.5rem)" }}
            animate={{ clipPath: "inset(0 0 0% 0 round 1.5rem)" }}
            exit={{ clipPath: "inset(0 0 100% 0 round 1.5rem)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } } }}
            >
              {[{ to: "/", label: "Home" }, ...LINKS, { to: "/cart", label: "Cart" }].map(
                (link) => (
                  <motion.li
                    key={link.to}
                    variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
                  >
                    <NavLink to={link.to} end={link.to === "/"} className="mobile-link">
                      {link.label}
                    </NavLink>
                  </motion.li>
                )
              )}
            </motion.ul>
            <div className="mobile-footer">
              {user ? (
                <>
                  <Link to="/profile" className="mobile-cta">Profile</Link>
                  <button type="button" className="mobile-ghost" onClick={handleLogout}>
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="mobile-cta">Log in</Link>
                  <Link to="/register" className="mobile-ghost">Create account</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Wrapper>
  );
};

export default Navbar;
