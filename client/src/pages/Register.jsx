import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  // 🔄 Handle Input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🚀 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = form;

    // ✅ Validation
    if (!name || !email || !password) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await API.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      console.log("Registered:", res.data);

      setSuccess("Account created successfully 🎉");

      // Redirect after 1.5 sec
      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (err) {
      console.log("REGISTER ERROR:", err.response?.data);
console.log("ERROR FULL:", err);                  
  console.log("ERROR DATA:", err.response?.data);
      setError(
        err.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Create Account 🚀
        </h2>

        {/* ✅ Success */}
        {success && (
          <p className="bg-green-100 text-green-600 p-2 rounded mb-4 text-sm">
            {success}
          </p>
        )}

        {/* ❌ Error */}
        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
            {error}
          </p>
        )}

        {/* 👤 Name */}
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded mb-3"
        />

        {/* 📧 Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded mb-3"
        />

        {/* 🔑 Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded mb-4"
        />

        {/* 🔘 Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {/* 🔗 Link */}
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;