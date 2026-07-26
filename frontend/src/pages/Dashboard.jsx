import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import toast from "react-hot-toast";
import "./Dashboard.css";

import {
  getRepositories,
  createRepository,
} from "../services/repositoryService.js";

import RepositoryCard from "../components/repository/RepositoryCard.jsx";
import RepositoryForm from "../components/repository/RepositoryForm.jsx";
import Modal from "../components/common/Modal.jsx";

function Dashboard() {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    fetchRepositories();
  }, []);

  // Fetch Repositories
  const fetchRepositories = async () => {
    try {
      const response = await getRepositories();

      setRepositories(response.data);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Unable to load repositories.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Create Repository
  const handleCreateRepository = async (formData) => {
    try {
      await createRepository(formData);

      toast.success("Repository created successfully.");

      setShowModal(false);

      fetchRepositories();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Unable to create repository.",
      );
    }
  };

  if (loading) {
    return (
      <div className="container section">
        <h2>Loading repositories...</h2>
      </div>
    );
  }

  return (
    <>
      <div className="container section">
        <div className="dashboard-header">
          <div>
            <h1>Welcome{user ? `, ${user.name}` : ""}!</h1>

            <p>Manage your repositories from one place.</p>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            New Repository
          </button>
        </div>

        {repositories.length === 0 ? (
          <div className="empty-state">
            <h3>No repositories yet</h3>

            <p>Create your first repository to get started.</p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gap: "18px",
            }}
          >
            {repositories.map((repo) => (
              <RepositoryCard key={repo._id} repository={repo} />
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={showModal}
        title="Create Repository"
        onClose={() => setShowModal(false)}
      >
        <RepositoryForm onSubmit={handleCreateRepository} />
      </Modal>
    </>
  );
}

export default Dashboard;
