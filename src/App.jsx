import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ErrorBoundary from "./components/ui/ErrorBoundary.jsx";
import PublicLayout from "./components/layout/PublicLayout.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";

// Pages
import Home from "./features/home/Home.jsx";
import Login from "./features/auth/Login.jsx";
import Register from "./features/auth/Register.jsx";
import ExploreCars from "./features/cars/ExploreCars.jsx";
import CarDetails from "./features/cars/CarDetails.jsx";
import AddCar from "./features/cars/AddCar.jsx";
import MyAddedCars from "./features/cars/MyAddedCars.jsx";
import MyBookings from "./features/bookings/MyBookings.jsx";
import NotFound from "./features/NotFound.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "explore", element: <ExploreCars /> },
      { path: "cars/:id", element: <CarDetails /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "add-car",
        element: (
          <PrivateRoute>
            <AddCar />
          </PrivateRoute>
        ),
      },
      {
        path: "my-added-cars",
        element: (
          <PrivateRoute>
            <MyAddedCars />
          </PrivateRoute>
        ),
      },
      {
        path: "my-bookings",
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider router={router} />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              style: {
                background: "var(--card)",
                color: "var(--foreground)",
                border: "1px solid var(--border)",
                fontFamily: "var(--font-body)",
                fontSize: "0.9rem",
                borderRadius: "12px",
                padding: "0.75rem 1rem",
                boxShadow: "var(--shadow-card)",
              },
              success: {
                iconTheme: { primary: "var(--success)", secondary: "transparent" },
              },
              error: {
                iconTheme: { primary: "var(--error)", secondary: "transparent" },
              },
            }}
          />
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
