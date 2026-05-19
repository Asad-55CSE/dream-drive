import { motion } from "framer-motion";

export default function LoadingSpinner({ size = "md", text = "" }) {
  const sizes = {
    sm: 20,
    md: 36,
    lg: 52,
  };

  const px = sizes[size] || sizes.md;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <motion.div
        style={{
          width: px,
          height: px,
          borderRadius: "50%",
          border: `3px solid var(--border)`,
          borderTopColor: "var(--accent)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
      />
      {text && (
        <p style={{ color: "var(--foreground-muted)", fontSize: "0.875rem" }}>
          {text}
        </p>
      )}
    </div>
  );
}
