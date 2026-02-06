// frontend/src/App.jsx
import Home from "./components/Home";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600 cursor-pointer">
            My E-Shop
          </h1>
          <button className="text-gray-600 hover:text-blue-600 font-medium">
            Cart (0)
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <Home />
      
    </div>
  );
}

export default App;
