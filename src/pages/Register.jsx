import { Form, useNavigation, Link } from "react-router-dom";
import { FormRow } from "../components";
import AuthShell from "../components/AuthShell";

const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <AuthShell
      title="Create your account."
      subtitle="Save your favourite meals, order in minutes and never miss a meal time."
    >
      <Form method="post">
        <FormRow type="text" name="fullName" labelText="Full Name" />
        <FormRow type="email" name="email" labelText="Email" />
        <FormRow type="password" name="password" labelText="Password" />
        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Create account"}
        </button>

        <div className="auth-links">
          <span>
            Already have an account? <Link to="/login">Log in</Link>
          </span>
        </div>
      </Form>
    </AuthShell>
  );
};

export default Register;
