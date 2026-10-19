import {
  Link,
  Form,
  useNavigation,
  useActionData,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { FormRow } from "../components";
import AuthShell from "../components/AuthShell";

const AdminLogin = () => {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const location = useLocation();
  const actionResult = useActionData();
  const { user } = useSelector((state) => state.user);

  // This is to display submitting while submitting.
  const isSubmitting = navigation.state === "submitting";

  // Get the intended destination from state, or default to dashboard
  const from = location.state?.from || "/admin/dashboard";

  // Handle redirections based on user state
  useEffect(() => {
    // If user is already logged in as admin, redirect to dashboard
    if (user && user.role === "admin") {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [user]);

  return (
    <AuthShell
      title="Admin portal."
      subtitle="Sign in to manage meals, orders, users and content."
      visualTitle="Run the kitchen behind every order."
      visualTagline="Manage your recipes and users."
    >
      <Form method="post">
        {actionResult?.msg && (
          <p className="form-error" role="alert">{actionResult.msg}</p>
        )}
        <FormRow type="email" name="email" labelText="Admin Email" />
        <FormRow type="password" name="password" labelText="Password" />
        {/* Add the role as a hidden input */}
        <input type="hidden" name="role" value="admin" />
        {/* Add return path for redirection after login */}
        <input type="hidden" name="returnPath" value={from} />
        <button type="submit" disabled={isSubmitting} className="submit-btn">
          {isSubmitting ? "Logging in..." : "Log in as admin"}
        </button>
        <div className="auth-links">
          <Link to="/changePassword">Forgot your password?</Link>
          <span>
            Not an admin? <Link to="/login">User login</Link>
          </span>
        </div>
      </Form>
    </AuthShell>
  );
};

export default AdminLogin;
