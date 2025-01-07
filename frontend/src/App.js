import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/login";
import AdminHome from "./Pages/AdminHome"; // Component for admin home page
import SuperAdminHome from "./Pages/SuperAdminHome"; // Component for super admin home page
import AddAdmin from "./Pages/AddAdmin"; // Import AddAdmin component
import Navbar from "./components/Navbar"; // Assuming Navbar is located in components folder

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for login */}
        <Route path="/" element={<LoginPage />} />
        
        {/* Route for admin home */}
        <Route 
          path="/admin/home" 
          element={
            <>
              <Navbar />
              <AdminHome />
            </>
          }
        />
        
        {/* Route for super admin home */}
        <Route 
          path="/superadmin/home" 
          element={
            <>
              <Navbar />
              <SuperAdminHome />
            </>
          }
        />
        
        {/* Route for adding admins */}
        <Route 
          path="/superadmin/add-admin" 
          element={
            <>
              <Navbar />
              <AddAdmin />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
