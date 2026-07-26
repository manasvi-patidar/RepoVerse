import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import "./Profile.css";

import { useAuth } from "../context/AuthContext.jsx";
import { getRepositories } from "../services/repositoryService.js";

function Profile() {
  const { user } = useAuth();

  const [repoCount, setRepoCount] = useState(0);

  useEffect(() => {
    loadRepositories();
  }, []);

  const loadRepositories = async () => {
    try {
      const response = await getRepositories();

      setRepoCount(response.data.length);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to load profile.");
    }
  };

  return (
    <div className="container section profile-page">
      <div className="profile-header">
        <h1>Profile</h1>

        <p className="profile-subtitle">Your account information.</p>
      </div>

      <div className="profile-card">
        <ProfileRow label="Name" value={user?.name || "N/A"} />

        <ProfileRow label="Username" value={user?.username || "N/A"} />

        <ProfileRow label="Email" value={user?.email || "N/A"} />

        <ProfileRow label="Repositories" value={repoCount} last />
      </div>
    </div>
  );
}

function ProfileRow({ label, value, last = false }) {
  return (
    <div className={`profile-row ${last ? "last" : ""}`}>
      <span className="profile-label">{label}</span>

      <span className="profile-value">{value}</span>
    </div>
  );
}

export default Profile;
