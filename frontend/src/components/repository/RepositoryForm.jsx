import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Input from "../common/Input.jsx";

function RepositoryForm({ initialData = null, onSubmit, loading = false }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    visibility: "public",
  });

  // Fill form while editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
        visibility: initialData.visibility || "public",
      });
    }
  }, [initialData]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Repository name is required.");
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Repository Name"
        name="name"
        placeholder="enter your repository name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <div className="form-group">
        <label className="form-label">Description</label>

        <textarea
          className="form-input"
          rows="4"
          name="description"
          placeholder="Describe your repository..."
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Visibility</label>

        <select
          className="form-input"
          name="visibility"
          value={formData.visibility}
          onChange={handleChange}
        >
          <option value="public">Public</option>

          <option value="private">Private</option>
        </select>
      </div>

      <button
        className="btn btn-primary"
        style={{
          width: "100%",
          marginTop: "10px",
        }}
      >
        {loading
          ? "Saving..."
          : initialData
            ? "Update Repository"
            : "Create Repository"}
      </button>
    </form>
  );
}

export default RepositoryForm;
