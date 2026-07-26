import "./Auth.css";
import AuthCard from "./AuthCard.jsx";

function AuthLayout({ title, subtitle, children }) {
  return (
    <main className="auth-layout">
      <div className="auth-container">
        <h1 className="auth-logo">RepoVerse</h1>

        <h2 className="auth-title">{title}</h2>

        <p className="auth-subtitle">{subtitle}</p>

        <AuthCard>{children}</AuthCard>
      </div>
    </main>
  );
}

export default AuthLayout;
