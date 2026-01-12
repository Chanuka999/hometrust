import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);

        return;
      }
      setLoading(false);
      console.log(data);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            id="username"
            onChange={handleChange}
            className="bg-white/20 text-white placeholder-gray-300 border border-white/20 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <input
            type="email"
            placeholder="Email address"
            id="email"
            onChange={handleChange}
            className="bg-white/20 text-white placeholder-gray-300 border border-white/20 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <input
            type="password"
            placeholder="Password"
            id="password"
            onChange={handleChange}
            className="bg-white/20 text-white placeholder-gray-300 border border-white/20 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <button
            disabled={Loading}
            className="mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold uppercase tracking-wide hover:opacity-90 disabled:opacity-50 transition"
          >
            {Loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="flex justify-center gap-2 mt-6 text-gray-300">
          <p>Already have an account?</p>
          <Link to="/sign-in" className="text-blue-400 hover:underline">
            Sign in
          </Link>
        </div>

        {error && (
          <p className="text-red-400 text-center mt-4 text-sm">{error}</p>
        )}
      </div>
    </div>
  );
};

export default SignUp;
