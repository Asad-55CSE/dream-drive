import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--background)",
        background: "var(--gradient-hero)",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{ maxWidth: 520 }}
      >
        {/* 404 Number */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(6rem, 20vw, 10rem)",
            fontWeight: 800,
            letterSpacing: "-0.06em",
            lineHeight: 1,
            marginBottom: "1rem",
            background: "linear-gradient(135deg, var(--accent), rgba(249,115,22,0.3))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          404
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.875rem",
            fontWeight: 800,
            color: "var(--foreground)",
            marginBottom: "1rem",
          }}
        >
          Road Ends Here
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            color: "var(--foreground-muted)",
            fontSize: "1rem",
            lineHeight: 1.7,
            marginBottom: "2.5rem",
          }}
        >
          Looks like this page took a wrong turn. The route you're looking for doesn't exist or has been moved.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ display: "flex", gap: "0.875rem", justifyContent: "center", flexWrap: "wrap" }}
        >
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="df-btn-primary"
            >
              <Home size={16} />
              Back to Home
            </motion.button>
          </Link>

          <Link to="/explore">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="df-btn-ghost"
            >
              <Search size={16} />
              Explore Cars
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
