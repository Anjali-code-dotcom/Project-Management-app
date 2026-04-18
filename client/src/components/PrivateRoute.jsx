import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // If token exists but user is missing → restore session
    if (token && !user) {
      try {
        // 👉 Optional: decode token or fetch user profile from backend
        setUser({ token }); // basic fallback
      } catch (err) {
        console.error("Auth restore error:", err);
        localStorage.removeItem("token");
      }
    }

    setLoading(false);
  }, [user, setUser]);

  // 🔄 Show loader while checking auth
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // ❌ Not authenticated
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // ✅ Authenticated
  return children;
};

export default PrivateRoute;