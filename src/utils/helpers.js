/**
 * Format currency in USD
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price);
};

/**
 * Format date
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/**
 * Truncate text
 */
export const truncate = (text, length = 100) => {
  if (!text) return "";
  return text.length > length ? text.slice(0, length) + "…" : text;
};

/**
 * Get status color class
 */
export const getStatusColor = (status) => {
  const map = {
    pending: "text-yellow-500",
    confirmed: "text-green-500",
    cancelled: "text-red-500",
    completed: "text-blue-500",
  };
  return map[status] || "text-muted";
};

/**
 * Get status badge style
 */
export const getStatusBadge = (status) => {
  const map = {
    pending: { bg: "rgba(234, 179, 8, 0.12)", color: "#eab308" },
    confirmed: { bg: "rgba(34, 197, 94, 0.12)", color: "#22c55e" },
    cancelled: { bg: "rgba(239, 68, 68, 0.12)", color: "#ef4444" },
    completed: { bg: "rgba(59, 130, 246, 0.12)", color: "#3b82f6" },
  };
  return map[status] || { bg: "rgba(139, 139, 168, 0.12)", color: "#8b8ba8" };
};

/**
 * Car type options
 */
export const CAR_TYPES = [
  "All",
  "Sedan",
  "SUV",
  "Truck",
  "Convertible",
  "Hatchback",
  "Coupe",
  "Van",
  "Luxury",
  "Electric",
];

/**
 * Sort options
 */
export const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];
