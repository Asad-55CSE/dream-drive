import { motion } from "framer-motion";
import { Car } from "lucide-react";

export default function EmptyState({
  icon: Icon = Car,
  title = "Nothing here yet",
  message = "No results found.",
  action = null,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "5rem 2rem",
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 72,
          height: 72,
          borderRadius: "50%",
          backgroundColor: "var(--accent-muted)",
          marginBottom: "1.5rem",
        }}
      >
        <Icon size={32} color="var(--accent)" />
      </div>

      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "1.25rem",
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
          maxWidth: "320px",
          lineHeight: 1.6,
          marginBottom: action ? "1.5rem" : 0,
        }}
      >
        {message}
      </p>

      {action}
    </motion.div>
  );
}
