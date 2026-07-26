import AuthLayout from "../components/auth/AuthLayout.jsx";
import AuthCard from "../components/auth/AuthCard.jsx";
import RegisterForm from "../components/auth/RegisterForm.jsx";

function Register() {
  return (
    <AuthLayout>
      <AuthCard
        title="Create your RepoVerse account"
        subtitle="Start managing your repositories."
      >
        <RegisterForm />
      </AuthCard>
    </AuthLayout>
  );
}

export default Register;
