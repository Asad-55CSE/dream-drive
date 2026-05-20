import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Mail, Lock, User, ImageIcon, Car } from "lucide-react";
import toast from "react-hot-toast";
import { signUp, signIn } from "../../lib/auth-client.js";
import PageTransition from "../../components/ui/PageTransition.jsx";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  photoURL: z.string().url("Invalid URL").optional().or(z.literal("")),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Must include at least one uppercase letter")
    .regex(/[a-z]/, "Must include at least one lowercase letter"),
});

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async ({ name, email, photoURL, password }) => {
    setIsLoading(true);
    try {
      const result = await signUp.email({
        name,
        email,
        password,
        image: photoURL || undefined,
      });

      if (result.error) {
        toast.error(result.error.message || "Registration failed");
      } else {
        toast.success("Account created! Please sign in.");
        navigate("/login");
      }
    } catch {
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsGoogleLoading(true);
    try {
      const clientOrigin = import.meta.env.VITE_CLIENT_URL || "http://localhost:5173";
      await signIn.social({ provider: "google", callbackURL: `${clientOrigin}/` });
    } catch {
      toast.error("Google sign-up failed.");
      setIsGoogleLoading(false);
    }
  };

  return (
    <PageTransition>
      <div
        style={{
          minHeight: "calc(100vh - 68px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 1.5rem",
          background: "var(--gradient-hero)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          style={{
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "24px",
            padding: "2.5rem",
            width: "100%",
            maxWidth: 460,
            boxShadow: "var(--shadow-card)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 52, height: 52, borderRadius: "14px", backgroundColor: "var(--accent-muted)", marginBottom: "1rem" }}>
              <Car size={24} color="var(--accent)" />
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.625rem", color: "var(--foreground)", letterSpacing: "-0.02em", marginBottom: "0.375rem" }}>
              Create Account
            </h1>
            <p style={{ color: "var(--foreground-muted)", fontSize: "0.9rem" }}>
              Join DriveFleet and start your journey
            </p>
          </div>

          {/* Google Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogleSignUp}
            disabled={isGoogleLoading}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.625rem",
              padding: "0.75rem",
              borderRadius: "12px",
              border: "1px solid var(--border)",
              backgroundColor: "var(--input-bg)",
              color: "var(--foreground)",
              fontSize: "0.9375rem",
              fontWeight: 500,
              cursor: isGoogleLoading ? "not-allowed" : "pointer",
              opacity: isGoogleLoading ? 0.7 : 1,
              marginBottom: "1.25rem",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            {isGoogleLoading ? "Redirecting..." : "Continue with Google"}
          </motion.button>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <div style={{ flex: 1, height: 1, backgroundColor: "var(--border)" }} />
            <span style={{ color: "var(--foreground-muted)", fontSize: "0.8125rem" }}>or</span>
            <div style={{ flex: 1, height: 1, backgroundColor: "var(--border)" }} />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {/* Name */}
            <div>
              <label style={{ display: "block", color: "var(--foreground)", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.4rem" }}>Full Name</label>
              <div style={{ position: "relative" }}>
                <User size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--foreground-muted)", pointerEvents: "none" }} />
                <input {...register("name")} type="text" placeholder="John Doe" className="df-input" style={{ paddingLeft: "2.5rem" }} />
              </div>
              {errors.name && <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} style={{ color: "var(--error)", fontSize: "0.8125rem", marginTop: "0.3rem" }}>{errors.name.message}</motion.p>}
            </div>

            {/* Email */}
            <div>
              <label style={{ display: "block", color: "var(--foreground)", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.4rem" }}>Email Address</label>
              <div style={{ position: "relative" }}>
                <Mail size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--foreground-muted)", pointerEvents: "none" }} />
                <input {...register("email")} type="email" placeholder="you@example.com" className="df-input" style={{ paddingLeft: "2.5rem" }} />
              </div>
              {errors.email && <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} style={{ color: "var(--error)", fontSize: "0.8125rem", marginTop: "0.3rem" }}>{errors.email.message}</motion.p>}
            </div>

            {/* Photo URL */}
            <div>
              <label style={{ display: "block", color: "var(--foreground)", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.4rem" }}>
                Photo URL <span style={{ color: "var(--foreground-muted)", fontWeight: 400 }}>(optional)</span>
              </label>
              <div style={{ position: "relative" }}>
                <ImageIcon size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--foreground-muted)", pointerEvents: "none" }} />
                <input {...register("photoURL")} type="url" placeholder="https://example.com/photo.jpg" className="df-input" style={{ paddingLeft: "2.5rem" }} />
              </div>
              {errors.photoURL && <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} style={{ color: "var(--error)", fontSize: "0.8125rem", marginTop: "0.3rem" }}>{errors.photoURL.message}</motion.p>}
            </div>

            {/* Password */}
            <div>
              <label style={{ display: "block", color: "var(--foreground)", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.4rem" }}>Password</label>
              <div style={{ position: "relative" }}>
                <Lock size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--foreground-muted)", pointerEvents: "none" }} />
                <input {...register("password")} type={showPassword ? "text" : "password"} placeholder="••••••••" className="df-input" style={{ paddingLeft: "2.5rem", paddingRight: "2.75rem" }} />
                <button type="button" onClick={() => setShowPassword((v) => !v)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--foreground-muted)", display: "flex" }}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} style={{ color: "var(--error)", fontSize: "0.8125rem", marginTop: "0.3rem" }}>{errors.password.message}</motion.p>}
              <p style={{ color: "var(--foreground-muted)", fontSize: "0.75rem", marginTop: "0.375rem" }}>
                Min. 6 characters, one uppercase & one lowercase letter
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="df-btn-primary"
              style={{ width: "100%", marginTop: "0.25rem", opacity: isLoading ? 0.75 : 1, cursor: isLoading ? "not-allowed" : "pointer" }}
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </motion.button>
          </form>

          <p style={{ textAlign: "center", color: "var(--foreground-muted)", fontSize: "0.875rem", marginTop: "1.5rem" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "var(--accent)", fontWeight: 600, textDecoration: "none" }}>
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </PageTransition>
  );
}
