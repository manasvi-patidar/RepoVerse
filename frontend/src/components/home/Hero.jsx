import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="container hero-container">
        {/* Left Content */}
        <div className="hero-content">
          <span className="hero-badge">
            Lightweight Version Control Platform
          </span>

          <h1 className="hero-title">
            Build. Version.
            <br />
            Collaborate.
          </h1>

          <p className="hero-description">
            RepoVerse helps developers manage repositories, commits and
            collaboration with a clean and intuitive interface built on your own
            version control system.
          </p>

          <div className="hero-buttons">
            <Link to="/register" className="btn btn-primary">
              Get Started
            </Link>

            <Link to="/login" className="btn btn-outline">
              Explore
            </Link>
          </div>
        </div>

        {/* Right Card */}

        <div className="hero-card card shadow-hover">
          <h3>RepoVerse</h3>

          <div className="hero-card-item">
            <span>Repository</span>
            <strong>RepoVerse</strong>
          </div>

          <div className="hero-card-item">
            <span>Commits</span>
            <strong>24</strong>
          </div>

          <div className="hero-card-item">
            <span>Contributors</span>
            <strong>3</strong>
          </div>

          <div className="hero-card-item">
            <span>Last Update</span>
            <strong>Today</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
