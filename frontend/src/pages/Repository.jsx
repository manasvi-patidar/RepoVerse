import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import "./Repository.css";

import { getRepository } from "../services/repositoryService.js";
import { getCommitHistory } from "../services/commitService.js";
import { getRepositoryIssues } from "../services/issueService.js";

import CommitList from "../components/commit/CommitList.jsx";
import IssueList from "../components/issue/IssueList.jsx";

import Modal from "../components/common/Modal.jsx";
import RepositoryForm from "../components/repository/RepositoryForm.jsx";
import IssueForm from "../components/issue/IssueForm.jsx";

import {
  updateRepository,
  deleteRepository,
} from "../services/repositoryService.js";

import {
  createIssue,
  updateIssue,
  deleteIssue,
} from "../services/issueService.js";

import { useNavigate } from "react-router-dom";

function Repository() {
  const { id } = useParams();

  const [repository, setRepository] = useState(null);
  const [commits, setCommits] = useState([]);
  const [issues, setIssues] = useState([]);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [issueModalOpen, setIssueModalOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [deleteIssueModalOpen, setDeleteIssueModalOpen] = useState(false);
  const [issueLoading, setIssueLoading] = useState(false);

  useEffect(() => {
    loadRepository();
  }, []);

  const loadRepository = async () => {
    try {
      const [repoRes, commitRes, issueRes] = await Promise.all([
        getRepository(id),
        getCommitHistory(id),
        getRepositoryIssues(id),
      ]);

      setRepository(repoRes.data);

      setCommits(commitRes.commits);

      setIssues(issueRes.issues);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Unable to load repository.",
      );
    } finally {
      setLoading(false);
    }
  };

  {
    /* Helper Funtion */
  }
  const fetchIssues = async () => {
    try {
      const response = await getRepositoryIssues(id);

      setIssues(response.issues);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to load issues.");
    }
  };

  const handleCreateIssue = async (formData) => {
    try {
      setIssueLoading(true);

      await createIssue({
        repositoryId: id,
        ...formData,
      });

      toast.success("Issue created successfully.");

      await fetchIssues();

      setIssueModalOpen(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to create issue.");
    } finally {
      setIssueLoading(false);
    }
  };

  const handleUpdateIssue = async (formData) => {
    try {
      setIssueLoading(true);

      await updateIssue(selectedIssue._id, formData);

      toast.success("Issue updated successfully.");

      await fetchIssues();

      setSelectedIssue(null);

      setIssueModalOpen(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to update issue.");
    } finally {
      setIssueLoading(false);
    }
  };

  const handleDeleteIssue = async () => {
    try {
      await deleteIssue(selectedIssue._id);

      toast.success("Issue deleted successfully.");

      await fetchIssues();

      setSelectedIssue(null);

      setDeleteIssueModalOpen(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to delete issue.");
    }
  };

  const handleUpdateRepository = async (formData) => {
    try {
      setSaving(true);

      const response = await updateRepository(id, formData);

      setRepository(response.data);

      toast.success("Repository updated successfully.");

      setEditOpen(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Unable to update repository.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteRepository = async () => {
    try {
      await deleteRepository(id);

      toast.success("Repository deleted successfully.");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Unable to delete repository.",
      );
    }
  };

  if (loading) {
    return (
      <div className="container section">
        <h2>Loading Repository...</h2>
      </div>
    );
  }

  if (!repository) {
    return (
      <div className="container section">
        <h2>Repository not found.</h2>
      </div>
    );
  }

  return (
    <div className="container section repository-page">
      <Link
        to="/dashboard"
        style={{
          textDecoration: "none",
          color: "#2563eb",
          fontWeight: 500,
        }}
      >
        ← Back
      </Link>

      <div classname="repository-info">
        <div className="repository-top">
          <div>
            <h1 className="repository-title">{repository.name}</h1>

            <p className="repository-description">
              {repository.description || "No description provided."}
            </p>
          </div>

          <span className={`visibility ${repository.visibility}`}>
            {repository.visibility}
          </span>
        </div>

        <div className="repository-actions">
          <button className="btn" onClick={() => setEditOpen(true)}>
            Edit Repository
          </button>

          <button
            className="btn"
            onClick={() => setDeleteOpen(true)}
            style={{
              color: "#dc2626",
            }}
          >
            Delete Repository
          </button>
        </div>
      </div>

      <section className="repository-section">
        <h2 className="section-title">Commits ({commits.length})</h2>

        <CommitList commits={commits} />
      </section>

      <section>
        <div className="issues-header">
          <h2>Issues ({issues.length})</h2>

          <button
            className="btn btn-primary"
            onClick={() => {
              setSelectedIssue(null);
              setIssueModalOpen(true);
            }}
          >
            New Issue
          </button>
        </div>

        {/* Update IssueList */}
        <IssueList
          issues={issues}
          onEdit={(issue) => {
            setSelectedIssue(issue);
            setIssueModalOpen(true);
          }}
          onDelete={(issue) => {
            setSelectedIssue(issue);
            setDeleteIssueModalOpen(true);
          }}
        />
      </section>

      <Modal
        isOpen={editOpen}
        title="Edit Repository"
        onClose={() => setEditOpen(false)}
      >
        <RepositoryForm
          initialData={repository}
          onSubmit={handleUpdateRepository}
          loading={saving}
        />
      </Modal>

      <Modal
        isOpen={deleteOpen}
        title="Delete Repository"
        onClose={() => setDeleteOpen(false)}
      >
        <p
          style={{
            marginBottom: "22px",
            color: "#6b7280",
            lineHeight: "1.6",
          }}
        >
          This action cannot be undone.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
          }}
        >
          <button className="btn" onClick={() => setDeleteOpen(false)}>
            Cancel
          </button>

          <button
            className="btn"
            onClick={handleDeleteRepository}
            style={{
              background: "#dc2626",
              color: "#fff",
            }}
          >
            Delete
          </button>
        </div>
      </Modal>

      {/* Create/Edit Model */}
      <Modal
        isOpen={issueModalOpen}
        title={selectedIssue ? "Edit Issue" : "Create Issue"}
        onClose={() => {
          setIssueModalOpen(false);
          setSelectedIssue(null);
        }}
      >
        <IssueForm
          initialData={selectedIssue}
          loading={issueLoading}
          onSubmit={selectedIssue ? handleUpdateIssue : handleCreateIssue}
        />
      </Modal>

      {/* Delete Model */}
      <Modal
        isOpen={deleteIssueModalOpen}
        title="Delete Issue"
        onClose={() => setDeleteIssueModalOpen(false)}
      >
        <p
          style={{
            marginBottom: "22px",
            color: "#6b7280",
          }}
        >
          Delete this issue permanently?
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
          }}
        >
          <button
            className="btn"
            onClick={() => setDeleteIssueModalOpen(false)}
          >
            Cancel
          </button>

          <button
            className="btn"
            style={{
              background: "#dc2626",
              color: "#fff",
            }}
            onClick={handleDeleteIssue}
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Repository;
