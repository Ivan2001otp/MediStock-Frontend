import { motion } from "framer-motion";
import { useState } from "react";
import type { LoginRequest } from "../models/auth";
import { loginUser } from "../api/httpClient";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import type { VendorModel } from "../models/onboard";

const LoginPage = () => {
   const navigate = useNavigate()

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // const [role, setRole] = useState('VENDOR');
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "VENDOR",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const validate = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);
    setLoginError("");
    setLoginSuccess(false);

    const payload: LoginRequest = {
      email: formData.email,
      password: formData.password,
      // actor: formData.role as "VENDOR" | "HOSPITAL",
    };

   
    
    try {
      const res = await loginUser(payload);
      console.log("login-api call result");
      // console.log(res);

      if (res.status == 200) {
         
        setLoginSuccess(true)
        console.log("✅ Login Success: ", res["data"]);
        console.log('access_token', res.data.access_token);

        localStorage.setItem('access_token', res.data.access_token);
        localStorage.setItem('refresh_token', res.data.refresh_token);
       
        toast.success(`Login Successfull`)

        // passing email is equivalent to having passed primary ke.
        const payload  = {
              email : res["data"]["email"]
          }
        console.log("payload to be sent ", payload);

        if (res.data.actor === "VENDOR") {
          navigate("/vendor-dashboard", {state : {vendor:payload}})
        } else {
          navigate("/hospital-dashboard", {state: {hospital:payload}})
        }
      } else {
        setLoginError("Invalid login credentials");
      }
    } catch (error: any) {
      console.log(error);
      setLoginError(error.response?.data?.message || "Something went wrong. Try again");
    } finally {
      setIsLoading(false);
    }

  };

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center bg-gray-50 ">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 space-y-6"
      >
        {/* Logo & Heading  */}
        <div className="text-center">
          <h1 className="text-3xl mb-1 font-bold text-gray-800">Login</h1>
          <img
            src="./src/assets/medistock_ai_2.png"
            alt="Medistock-Ai-Logo"
            width={150}
            height={150}
            className="mx-auto"
          />
          <h3 className="text-sm mb-4 -mt-3 font-semibold text-gray-800">
            Your Partner in Medical Supply Chain Excellence
          </h3>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-orange-300 focus:outline-none"
            />

            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="*****df32"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-orange-300 mt-1 focus:outline-none"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

         

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.06 }}
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 hover:cursor-pointer bg-orange-400 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-orange-600 transition"
          >
            {isLoading ? "Loading..." : "Sign In"}
          </motion.button>
        </form>

        <div className="text-center pt-4 ">
          <p className="text-sm text-gray-600 font-semibold">
            New to Medistock AI? {"  "}
            <a
              href="/register"
              className="text-orange-400 hover:text-orange-600 font-medium cursor-pointer"
            >
              Create an account
            </a>
          </p>
        </div>

        {loginError && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-red-500 text-sm text-center"
          >
            {loginError}
          </motion.div>
        )}
        {loginSuccess && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-green-600 font-semibold text-center"
          >
            ✅ Login successful! Redirecting...
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default LoginPage;
