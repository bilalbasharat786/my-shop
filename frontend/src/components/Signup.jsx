// frontend/src/components/Signup.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseUrl}/api/auth/register`, formData);
      alert("Registration Successful! Please Login.");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Error registering");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg border">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full border p-2 rounded" type="text" placeholder="Name" required 
          onChange={(e) => setFormData({...formData, name: e.target.value})} />
        <input className="w-full border p-2 rounded" type="email" placeholder="Email" required 
          onChange={(e) => setFormData({...formData, email: e.target.value})} />
        <input className="w-full border p-2 rounded" type="password" placeholder="Password" required 
          onChange={(e) => setFormData({...formData, password: e.target.value})} />
        <button className="w-full bg-blue-600 text-white py-2 rounded font-bold">Register</button>
      </form>
    </div>
  );
};

export default Signup;