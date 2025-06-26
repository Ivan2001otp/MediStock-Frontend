import { Routes , Route} from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import {  Toaster } from "react-hot-toast";

function App() {

  return (
    <>
        <Routes>
          
          <Route path="/" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          
        </Routes>
        <Toaster position="top-center" 
        reverseOrder={false}/>
    </>  
);
};

export default App
