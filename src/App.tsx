import { Routes , Route} from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import {  Toaster } from "react-hot-toast";
import VendorOnboardPage from "./pages/VendorOnboardPage";
import HospitalOnboardPage from "./pages/HospitalOnboardPage";
import VendorDashboard from "./pages/VendorDashboard";
import HospitalDashboard from "./pages/HospitalDashboard";
import F404page from "./pages/f404page";

function App() {

  return (
    <>
        <Routes>
          <Route path="/not_found" element={<F404page/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/vendor-onboard" element={<VendorOnboardPage/>}/>
          <Route path="/hospital-onboard" element={<HospitalOnboardPage/>}/>
          <Route path="/vendor-dashboard" element={<VendorDashboard/>}/>
          <Route path="/hospital-dashboard" element={<HospitalDashboard/>}/>
        </Routes>
        <Toaster position="top-center" 
        reverseOrder={false}/>
    </>  
);
};

export default App
