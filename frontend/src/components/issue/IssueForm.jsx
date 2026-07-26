import { useEffect, useState } from "react";

import Input from "../common/Input";

function IssueForm({ initialData = null, onSubmit, loading = false }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "open",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        status: initialData.status,
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

  let buttonText = "Create Issue";

  if (loading) {
    buttonText = "Saving...";
  } else if (initialData) {
    buttonText = "Update Issue";
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(formData);
      }}
    >
      <Input
        label="Issue Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Issue title"
        required
      />

      <div className="form-group">
        <label className="form-label">Description</label>

        <textarea
          className="form-input"
          rows="4"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      {initialData && (
        <div className="form-group">
          <label className="form-label">Status</label>

          <select
            className="form-input"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="open">Open</option>

            <option value="closed">Closed</option>
          </select>
        </div>
      )}

      <button
        className="btn btn-primary"
        style={{
          width: "100%",
          marginTop: "12px",
        }}
      >
        {buttonText}
      </button>
    </form>
  );
}

export default IssueForm;
