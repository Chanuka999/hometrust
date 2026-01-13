import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInSuccess,
  signInFailure,
  signInStart,
} from "../redux/user/userSlice";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      setLoading(true);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));

        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Sign in
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            {Loading ? "Creating Account..." : "Sign In"}
          </button>
        </form>

        <div className="flex justify-center gap-2 mt-6 text-gray-300">
          <p>Dont't have an account?</p>
          <Link to="/sign-up" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </div>

        {error && (
          <p className="text-red-400 text-center mt-4 text-sm">{error}</p>
        )}
      </div>
    </div>
  );
};

export default SignIn;
