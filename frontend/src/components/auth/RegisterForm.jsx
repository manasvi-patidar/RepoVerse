import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Input from "../common/Input";

import { register as registerService } from "../../services/authService.js";
import { useAuth } from "../../context/AuthContext.jsx";

function RegisterForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.name ||
      !formData.username ||
      !formData.email ||
      !formData.password
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await registerService(formData);

      login(response.data.user, response.data.token);

      toast.success("Account created successfully.");

      navigate("/dashboard");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Full Name"
        name="name"
        placeholder="Enter your full name"
        value={formData.name}
        onChange={handleChange}
      />

      <Input
        label="Username"
        name="username"
        placeholder="Choose a username"
        value={formData.username}
        onChange={handleChange}
      />

      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
      />

      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="Create a password"
        value={formData.password}
        onChange={handleChange}
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
        {loading ? "Creating Account..." : "Create Account"}
      </button>

      <p
        style={{
          textAlign: "center",
          marginTop: "22px",
        }}
      >
        Already have an account?{" "}
        <Link
          to="/login"
          style={{
            color: "var(--color-primary)",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Login
        </Link>
      </p>
    </form>
  );
}

export default RegisterForm;
