import {
  Link,
  Form,
  useNavigation,
  useLocation,
  useNavigate,
  useActionData,
} from "react-router-dom";
import { useEffect } from "react";
import { FormRow } from "../components";
import AuthShell from "../components/AuthShell";

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
    <AuthShell title="Welcome back." subtitle="Log in to order, track deliveries and manage your reminders.">
      <Form method="post">
        {errors?.msg && <p className="form-error" role="alert">{errors.msg}</p>}

        <FormRow type="email" name="email" labelText="Email" />
        <FormRow type="password" name="password" labelText="Password" />

        {/* Store the return path in a hidden input */}
        <input type="hidden" name="returnPath" value={from} />

        {/* Add the role as a hidden input */}
        <input type="hidden" name="role" value="user" />

        <button type="submit" disabled={isSubmitting} className="submit-btn">
          {isSubmitting ? "Logging in..." : "Log in"}
        </button>

        <div className="auth-links">
          <Link to="/changePassword">Forgot your password?</Link>
          <span>
            New to MealMaster? <Link to="/register">Create an account</Link>
          </span>
        </div>
      </Form>
    </AuthShell>
  );
};

export default Login;
