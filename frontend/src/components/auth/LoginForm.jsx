import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Input from "../common/Input";

import { login as loginService } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

function LoginForm() {
  const navigate = useNavigate();

  // Auth Context
  const { login } = useAuth();

  // Stores all form input values
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Used to disable the button while submitting
  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = (event) => {
    // Get input name and current value
    const { name, value } = event.target;

    // Update only the changed field
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // Handle Form Submit
  const handleSubmit = async (event) => {
    // Prevent page refresh
    event.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      // Call Backend
      const response = await loginService(formData);

      console.log(response);

      // Backend returns:
      // response.data.token
      // response.data.user

      login(response.data.user, response.data.token);

      toast.success("Login successful.");

      navigate("/dashboard");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        className="btn btn-primary"
        style={{
          width: "100%",
          marginTop: "8px",
        }}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <p
        style={{
          textAlign: "center",
          marginTop: "22px",
          color: "var(--color-text-light)",
        }}
      >
        Don't have an account?{" "}
        <Link
          to="/register"
          style={{
            color: "var(--color-primary)",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Register
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;
