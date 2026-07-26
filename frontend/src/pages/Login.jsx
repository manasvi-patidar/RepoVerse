import AuthLayout from "../components/auth/AuthLayout.jsx";
import AuthCard from "../components/auth/AuthCard.jsx";
import LoginForm from "../components/auth/LoginForm.jsx";

function Login() {
  return (
    <AuthLayout>
      <AuthCard title="Welcome back" subtitle="Login to continue to RepoVerse.">
        <LoginForm />
      </AuthCard>
    </AuthLayout>
  );
}

export default Login;
