import { useNavigate, useLocation } from "react-router-dom";
import Wrapper from "../assets/wrappers/currentUser";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoMdCart } from "react-icons/io";
import { fetchCurrentUser, logoutUser } from "../Features/user/userSlice";

const CurrentUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Get user data and loading state from Redux
  const { user, loading, loggedOut } = useSelector((state) => state.user);
  const numMealsInCart = useSelector(
    (state) => state.cart?.numItemsInCart || 0
  );

  // Only fetch on mount or when user clears without an explicit logout
  useEffect(() => {
    if (!user && !loggedOut) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, user, loggedOut]);

  const userName = user
    ? user.fullName || user.name || user.email || "User"
    : "Guest";

  // Navigation handlers
  const handleLoginRedirect = () =>
    navigate("/login", { state: { from: location.pathname } });

  const handleRegisterRedirect = () => navigate("/register");

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => navigate("/"))
      .catch((error) => {
        navigate("/");
      });
  };

  return (
    <Wrapper>
      <div className="currentUser">
        <div className="currentUserContainer">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <p className="user-name">Welcome, {userName}!</p>
              {user ? (
                <div className="logAndCart">
                  <button
                    onClick={handleLogout}
                    className="logout-btn"
                    disabled={loading}
                  >
                    Logout
                  </button>
                  <div className="indicator" onClick={() => navigate("/cart")}>
                    <IoMdCart />
                    <span>{numMealsInCart > 99 ? "99+" : numMealsInCart}</span>
                  </div>
                </div>
              ) : (
                <div>
                  <button onClick={handleLoginRedirect} className="login-btn">
                    Login
                  </button>
                  <button
                    onClick={handleRegisterRedirect}
                    className="login-btn"
                  >
                    Register
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default CurrentUser;
