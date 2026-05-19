import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function ConfirmModal({
  isOpen,
  onConfirm,
  onCancel,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmLabel = "Confirm",
  confirmVariant = "danger",
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "var(--overlay)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            backdropFilter: "blur(4px)",
          }}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.88, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "20px",
              width: "100%",
              maxWidth: "420px",
              padding: "2rem",
              textAlign: "center",
              boxShadow: "0 24px 80px rgba(0,0,0,0.4)",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 56,
                height: 56,
                borderRadius: "50%",
                backgroundColor: "rgba(239, 68, 68, 0.12)",
                marginBottom: "1.25rem",
              }}
            >
              <AlertTriangle size={24} color="var(--error)" />
            </div>

            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "var(--foreground)",
                marginBottom: "0.5rem",
              }}
            >
              {title}
            </h3>

            <p
              style={{
                color: "var(--foreground-muted)",
                fontSize: "0.9375rem",
                lineHeight: 1.6,
                marginBottom: "1.75rem",
              }}
            >
              {message}
            </p>

            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                onClick={onCancel}
                className="df-btn-ghost"
                style={{ flex: 1 }}
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                style={{
                  flex: 1,
                  padding: "0.75rem 1.25rem",
                  borderRadius: "10px",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "0.9375rem",
                  backgroundColor:
                    confirmVariant === "danger" ? "var(--error)" : "var(--accent)",
                  color: "#fff",
                  transition: "opacity 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
