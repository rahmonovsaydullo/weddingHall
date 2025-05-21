import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Example: If login is successful, navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eaf4fc] px-4">
      <div className="w-full max-w-md p-8 bg-[#eaf4fc] border border-[#d0e6f6] rounded-3xl shadow-2xl animate-fade-in transition-all duration-1000">
        <h2 className="text-3xl font-bold text-center text-[#3a506b] mb-6 tracking-wide font-serif">
          💍 Login 💍
        </h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="transition-all duration-300 hover:scale-[1.02]">
            <label className="block text-sm font-medium text-[#3a506b] mb-1">
              Username
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-[#bdd5ea] rounded-lg bg-white text-[#3a506b] placeholder-[#94aebf] outline-none focus:ring-2 focus:ring-[#b8d8f5] transition-all duration-300"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleLogin}
              required
            />
          </div>
          <div className="transition-all duration-300 hover:scale-[1.02]">
            <label className="block text-sm font-medium text-[#3a506b] mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-[#bdd5ea] rounded-lg bg-white text-[#3a506b] placeholder-[#94aebf] outline-none focus:ring-2 focus:ring-[#b8d8f5] transition-all duration-300"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleLogin}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#3a506b] hover:bg-[#1e3247] text-white py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.03]"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-[#5d7583] mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#3a506b] font-medium hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
