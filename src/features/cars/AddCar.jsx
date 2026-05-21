import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Car, DollarSign, Users, MapPin, FileText, Image, Tag } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../lib/axios.js";
import PageTransition from "../../components/ui/PageTransition.jsx";
import { CAR_TYPES } from "../../utils/helpers.js";

const schema = z.object({
  carName: z.string().min(2, "Car name is required"),
  dailyRentPrice: z.number({ invalid_type_error: "Price must be a number" }).min(1, "Price must be at least $1"),
  carType: z.string().min(1, "Select a car type"),
  image: z.string().url("Must be a valid URL"),
  seatCapacity: z.number({ invalid_type_error: "Must be a number" }).min(1).max(20),
  pickupLocation: z.string().min(2, "Location is required"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  availability: z.boolean(),
});

const carTypeOptions = CAR_TYPES.filter((t) => t !== "All");

export default function AddCar() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { availability: true, carType: "" },
  });

  const watchImage = watch("image");
  const watchAvailability = watch("availability");

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await api.post("/cars", data);
      toast.success("Car listed successfully! 🚗");
      navigate("/my-added-cars");
    } catch (err) {
      toast.error(err.message || "Failed to add car");
    } finally {
      setIsLoading(false);
    }
  };

  const fields = [
    {
      name: "carName",
      label: "Car Name",
      placeholder: "e.g. Toyota Camry 2024",
      type: "text",
      icon: <Car size={16} />,
    },
    {
      name: "dailyRentPrice",
      label: "Daily Rent Price ($)",
      placeholder: "e.g. 85",
      type: "number",
      icon: <DollarSign size={16} />,
      registerOptions: { valueAsNumber: true },
    },
    {
      name: "seatCapacity",
      label: "Seat Capacity",
      placeholder: "e.g. 5",
      type: "number",
      icon: <Users size={16} />,
      registerOptions: { valueAsNumber: true },
    },
    {
      name: "pickupLocation",
      label: "Pickup Location",
      placeholder: "e.g. Downtown Manhattan, NY",
      type: "text",
      icon: <MapPin size={16} />,
    },
    {
      name: "image",
      label: "Image URL",
      placeholder: "https://example.com/car-image.jpg",
      type: "url",
      icon: <Image size={16} />,
    },
  ];

  return (
    <PageTransition>
      <div
        style={{
          backgroundColor: "var(--background)",
          minHeight: "calc(100vh - 68px)",
          padding: "3rem 1.5rem",
          background: "var(--gradient-hero)",
        }}
      >
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{ marginBottom: "2rem" }}
          >
            <span className="section-label">Fleet</span>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.875rem, 4vw, 2.5rem)",
                fontWeight: 800,
                color: "var(--foreground)",
                letterSpacing: "-0.02em",
                marginBottom: "0.5rem",
              }}
            >
              List Your Car
            </h1>
            <p style={{ color: "var(--foreground-muted)" }}>
              Fill in the details below to add your vehicle to the DriveFleet marketplace.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "24px",
              padding: "2.5rem",
              boxShadow: "var(--shadow-card)",
            }}
          >
            {/* Image preview */}
            {watchImage && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                style={{ marginBottom: "2rem", borderRadius: "14px", overflow: "hidden", border: "1px solid var(--border)" }}
              >
                <img
                  src={watchImage}
                  alt="Car preview"
                  style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }}
                  onError={(e) => (e.target.style.display = "none")}
                />
              </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1.25rem",
                  marginBottom: "1.25rem",
                }}
                className="add-car-grid"
              >
                {fields.map(({ name, label, placeholder, type, icon, registerOptions }) => (
                  <div key={name} style={name === "image" || name === "pickupLocation" ? { gridColumn: "span 2" } : {}}>
                    <label
                      style={{
                        display: "block",
                        color: "var(--foreground)",
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        marginBottom: "0.4rem",
                      }}
                    >
                      {label}
                    </label>
                    <div style={{ position: "relative" }}>
                      <span
                        style={{
                          position: "absolute",
                          left: 14,
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "var(--foreground-muted)",
                          pointerEvents: "none",
                        }}
                      >
                        {icon}
                      </span>
                      <input
                        {...register(name, registerOptions)}
                        type={type}
                        placeholder={placeholder}
                        className="df-input"
                        style={{ paddingLeft: "2.5rem" }}
                        step={type === "number" ? "any" : undefined}
                      />
                    </div>
                    {errors[name] && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ color: "var(--error)", fontSize: "0.8125rem", marginTop: "0.3rem" }}
                      >
                        {errors[name].message}
                      </motion.p>
                    )}
                  </div>
                ))}

                {/* Car Type */}
                <div>
                  <label style={{ display: "block", color: "var(--foreground)", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.4rem" }}>
                    Car Type
                  </label>
                  <div style={{ position: "relative" }}>
                    <Tag size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--foreground-muted)", pointerEvents: "none" }} />
                    <select
                      {...register("carType")}
                      className="df-input"
                      style={{ paddingLeft: "2.5rem", appearance: "none" }}
                    >
                      <option value="">Select type…</option>
                      {carTypeOptions.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  {errors.carType && (
                    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} style={{ color: "var(--error)", fontSize: "0.8125rem", marginTop: "0.3rem" }}>
                      {errors.carType.message}
                    </motion.p>
                  )}
                </div>

                {/* Availability */}
                <div>
                  <label style={{ display: "block", color: "var(--foreground)", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.625rem" }}>
                    Availability
                  </label>
                  <div style={{ display: "flex", gap: "0.625rem" }}>
                    {[{ value: true, label: "Available" }, { value: false, label: "Unavailable" }].map(({ value, label }) => (
                      <button
                        key={String(value)}
                        type="button"
                        onClick={() => setValue("availability", value)}
                        style={{
                          flex: 1,
                          padding: "0.625rem",
                          borderRadius: "10px",
                          border: `1px solid ${watchAvailability === value ? "var(--accent)" : "var(--border)"}`,
                          backgroundColor: watchAvailability === value ? "var(--accent-muted)" : "transparent",
                          color: watchAvailability === value ? "var(--accent)" : "var(--foreground-muted)",
                          cursor: "pointer",
                          fontWeight: watchAvailability === value ? 600 : 400,
                          fontSize: "0.875rem",
                          transition: "all 0.2s ease",
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div style={{ gridColumn: "span 2" }}>
                  <label style={{ display: "block", color: "var(--foreground)", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.4rem" }}>
                    Description
                  </label>
                  <div style={{ position: "relative" }}>
                    <FileText size={16} style={{ position: "absolute", left: 14, top: 14, color: "var(--foreground-muted)", pointerEvents: "none" }} />
                    <textarea
                      {...register("description")}
                      rows={4}
                      placeholder="Describe your car — features, condition, unique traits…"
                      className="df-input"
                      style={{ paddingLeft: "2.5rem", resize: "vertical" }}
                    />
                  </div>
                  {errors.description && (
                    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} style={{ color: "var(--error)", fontSize: "0.8125rem", marginTop: "0.3rem" }}>
                      {errors.description.message}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Submit */}
              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="df-btn-ghost"
                  style={{ flex: 1 }}
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="df-btn-primary"
                  style={{ flex: 2, opacity: isLoading ? 0.75 : 1, cursor: isLoading ? "not-allowed" : "pointer" }}
                >
                  {isLoading ? "Listing car…" : "List My Car"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .add-car-grid { grid-template-columns: 1fr !important; }
          .add-car-grid > * { grid-column: span 1 !important; }
        }
      `}</style>
    </PageTransition>
  );
}
