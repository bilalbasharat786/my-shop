// admin/src/App.jsx
import { Routes, Route, Link } from "react-router-dom";
import AddProduct from "./components/AddProduct";
import Orders from "./components/Orders"; // <-- Import Orders


function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Admin Navbar */}
      <nav className="bg-blue-800 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <div className="space-x-4">
            <Link to="/" className="hover:text-gray-300 font-medium">Add Product</Link>
            <Link to="/orders" className="hover:text-gray-300 font-medium bg-blue-700 px-3 py-1 rounded">
              View Orders
            </Link>
          </div>
        </div>
      </nav>

      {/* Pages */}
      <div className="py-8">
        <Routes>
          <Route path="/" element={<AddProduct />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;
