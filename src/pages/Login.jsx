import {
  Link,
  Form,
  useNavigation,
  useLocation,
  useNavigate,
  useActionData,
} from "react-router-dom";
import { useEffect } from "react";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";

const Login = () => {
  const navigation = useNavigation();
  const location = useLocation();
  const navigate = useNavigate();
  const errors = useActionData();

  // Get the return path from state or query params
  const from =
    location.state?.from?.pathname ||
    location.search.split("from=")[1]?.split("&")[0] ||
    "/";

  const currentHour = new Date().getHours();
  let mealOfDay;
  if (currentHour >= 5 && currentHour < 12) {
    mealOfDay = "Breakfast?";
  } else if (currentHour >= 12 && currentHour < 17) {
    mealOfDay = "Lunch?";
  } else {
    mealOfDay = "Dinner?";
  }

  // This is to display submitting while submitting.
  const isSubmitting = navigation.state === "submitting";

  // Handle successful login via an action response
  useEffect(() => {
    // This should be triggered after your login action completes successfully
    if (navigation.state === "idle" && navigation.formData && !isSubmitting) {
      // Assuming login was successful, redirect to the previous page
      const redirectToReturnPath = () => {
        // Remove any URL encoding if present
        const decodedPath = decodeURIComponent(from);
        navigate(decodedPath, { replace: true });
      };

      // Short timeout to ensure the login action has completed
      const timer = setTimeout(redirectToReturnPath, 100);
      return () => clearTimeout(timer);
    }
  }, [navigation.state, from, navigate, isSubmitting, navigation.formData]);

  return (
    <Wrapper>
      <section>
        <div className="registerContainer">
          <div className="caption">
            <Link to="/" className="logo">
              <Logo />
            </Link>
            <p>
              Don't know <span>what to cook </span> <br />
              for {mealOfDay}
            </p>
            <p>
              <span>We got you covered.</span>
            </p>
          </div>
          <div className="registerForm form">
            <h3>User Login</h3>
            <Form method="post">
              {errors?.msg && <p className="form-error">{errors.msg}</p>}

              <FormRow type="email" name="email" labelText="Email" />
              <FormRow type="password" name="password" labelText="Password" />

              {/* Store the return path in a hidden input */}
              <input type="hidden" name="returnPath" value={from} />

              {/* Add the role as a hidden input */}
              <input type="hidden" name="role" value="user" />

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-block"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>

              <div className="forgetPassword">
                <p>
                  <Link to="/changePassword" className="member-btn">
                    Forgot Password?
                  </Link>
                </p>
              </div>

              <div className="divider2"></div>

              <div className="member">
                <p>
                  Don't have an account?
                  <br />
                  <Link to="/register" className="member-btn">
                    Sign up
                  </Link>
                </p>
              </div>
            </Form>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

export default Login;
