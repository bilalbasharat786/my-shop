// frontend/src/components/Login.jsx
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // Auth Context se login function lao
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendUrl}/api/auth/login`, formData);
      login(res.data.user, res.data.token); // Context update karo
      alert("Login Successful!");
      navigate("/"); // Home page par bhej do
    } catch (error) {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg border">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full border p-2 rounded" type="email" placeholder="Email" required 
          onChange={(e) => setFormData({...formData, email: e.target.value})} />
        <input className="w-full border p-2 rounded" type="password" placeholder="Password" required 
          onChange={(e) => setFormData({...formData, password: e.target.value})} />
        <button className="w-full bg-blue-600 text-white py-2 rounded font-bold">Login</button>
      </form>
    </div>
  );
};

export default Login;