import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import api from "../../lib/axios.js";
import { CAR_TYPES } from "../../utils/helpers.js";

const schema = z.object({
  carName: z.string().min(2, "Name is required"),
  dailyRentPrice: z.number({ invalid_type_error: "Must be a number" }).min(1),
  carType: z.string().min(1, "Select type"),
  image: z.string().url("Must be a valid URL"),
  seatCapacity: z.number({ invalid_type_error: "Must be a number" }).min(1).max(20),
  pickupLocation: z.string().min(2, "Location required"),
  description: z.string().min(20, "Min 20 characters"),
  availability: z.boolean(),
});

const carTypeOptions = CAR_TYPES.filter((t) => t !== "All");

export default function UpdateCarForm({ car, onSuccess, onClose }) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      carName: car.carName,
      dailyRentPrice: car.dailyRentPrice,
      carType: car.carType,
      image: car.image,
      seatCapacity: car.seatCapacity,
      pickupLocation: car.pickupLocation,
      description: car.description,
      availability: car.availability,
    },
  });

  const watchAvailability = watch("availability");

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await api.put(`/cars/${car._id}`, data);
      onSuccess(res.data.data);
    } catch (err) {
      toast.error(err.message || "Update failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="update-grid">
        {/* Car Name */}
        <div style={{ gridColumn: "span 2" }}>
          <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)", marginBottom: "0.35rem" }}>Car Name</label>
          <input {...register("carName")} className="df-input" placeholder="Car name" />
          {errors.carName && <p style={{ color: "var(--error)", fontSize: "0.8125rem", marginTop: "0.3rem" }}>{errors.carName.message}</p>}
        </div>

        {/* Price */}
        <div>
          <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)", marginBottom: "0.35rem" }}>Daily Price ($)</label>
          <input {...register("dailyRentPrice", { valueAsNumber: true })} type="number" step="any" className="df-input" />
          {errors.dailyRentPrice && <p style={{ color: "var(--error)", fontSize: "0.8125rem", marginTop: "0.3rem" }}>{errors.dailyRentPrice.message}</p>}
        </div>

        {/* Seats */}
        <div>
          <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)", marginBottom: "0.35rem" }}>Seat Capacity</label>
          <input {...register("seatCapacity", { valueAsNumber: true })} type="number" className="df-input" />
          {errors.seatCapacity && <p style={{ color: "var(--error)", fontSize: "0.8125rem", marginTop: "0.3rem" }}>{errors.seatCapacity.message}</p>}
        </div>

        {/* Car Type */}
        <div>
          <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)", marginBottom: "0.35rem" }}>Car Type</label>
          <select {...register("carType")} className="df-input" style={{ appearance: "none" }}>
            {carTypeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          {errors.carType && <p style={{ color: "var(--error)", fontSize: "0.8125rem", marginTop: "0.3rem" }}>{errors.carType.message}</p>}
        </div>

        {/* Availability */}
        <div>
          <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)", marginBottom: "0.5rem" }}>Availability</label>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {[{ value: true, label: "Available" }, { value: false, label: "Unavailable" }].map(({ value, label }) => (
              <button
                key={String(value)}
                type="button"
                onClick={() => setValue("availability", value)}
                style={{
                  flex: 1,
                  padding: "0.5rem",
                  borderRadius: "8px",
                  border: `1px solid ${watchAvailability === value ? "var(--accent)" : "var(--border)"}`,
                  backgroundColor: watchAvailability === value ? "var(--accent-muted)" : "transparent",
                  color: watchAvailability === value ? "var(--accent)" : "var(--foreground-muted)",
                  cursor: "pointer",
                  fontSize: "0.8125rem",
                  fontWeight: watchAvailability === value ? 600 : 400,
                  transition: "all 0.2s ease",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Image */}
        <div style={{ gridColumn: "span 2" }}>
          <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)", marginBottom: "0.35rem" }}>Image URL</label>
          <input {...register("image")} type="url" className="df-input" />
          {errors.image && <p style={{ color: "var(--error)", fontSize: "0.8125rem", marginTop: "0.3rem" }}>{errors.image.message}</p>}
        </div>

        {/* Location */}
        <div style={{ gridColumn: "span 2" }}>
          <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)", marginBottom: "0.35rem" }}>Pickup Location</label>
          <input {...register("pickupLocation")} className="df-input" />
          {errors.pickupLocation && <p style={{ color: "var(--error)", fontSize: "0.8125rem", marginTop: "0.3rem" }}>{errors.pickupLocation.message}</p>}
        </div>

        {/* Description */}
        <div style={{ gridColumn: "span 2" }}>
          <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)", marginBottom: "0.35rem" }}>Description</label>
          <textarea {...register("description")} rows={3} className="df-input" style={{ resize: "vertical" }} />
          {errors.description && <p style={{ color: "var(--error)", fontSize: "0.8125rem", marginTop: "0.3rem" }}>{errors.description.message}</p>}
        </div>
      </div>

      <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
        <button type="button" onClick={onClose} className="df-btn-ghost" style={{ flex: 1 }}>
          Cancel
        </button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={isLoading}
          className="df-btn-primary"
          style={{ flex: 2, opacity: isLoading ? 0.75 : 1, cursor: isLoading ? "not-allowed" : "pointer" }}
        >
          {isLoading ? "Saving…" : "Save Changes"}
        </motion.button>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .update-grid { grid-template-columns: 1fr !important; }
          .update-grid > * { grid-column: span 1 !important; }
        }
      `}</style>
    </form>
  );
}
