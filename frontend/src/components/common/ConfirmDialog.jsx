import Modal from "./Modal";

function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel }) {
  return (
    <Modal isOpen={isOpen} title={title} onClose={onCancel}>
      <p
        style={{
          color: "#6b7280",
          lineHeight: "1.7",
          marginBottom: "24px",
        }}
      >
        {message}
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "12px",
        }}
      >
        <button className="btn" onClick={onCancel}>
          Cancel
        </button>

        <button
          className="btn"
          onClick={onConfirm}
          style={{
            background: "#dc2626",
            color: "#fff",
          }}
        >
          Delete
        </button>
      </div>
    </Modal>
  );
}

export default ConfirmDialog;
