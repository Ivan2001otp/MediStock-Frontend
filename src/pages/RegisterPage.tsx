import { motion } from 'framer-motion';
import React, { useState } from 'react'

const RegisterPage = () => {
 const [errors, setErrors] = useState({
        email : '',
        password : '',
    });

    // const [role, setRole] = useState('VENDOR');
    const [formData, setFormData] = useState({
        email:'',
        password:'',
        role:'VENDOR',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);



    
    const validate=()=>{
        let valid = true;
        const newErrors = {email:'', password:''};

        if (!formData.email) {
            newErrors.email = "Email is required";
            valid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = "Invalid email format";
            valid=false;
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
            valid = false;
        } 

        setErrors(newErrors);
        return valid;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e : React.FormEvent) => {
        e.preventDefault();

        if (!validate())return;
        
        setIsLoading(true);
        setLoginError('');
        setLoginSuccess(false);

        setTimeout(() => {
            

        }, 1500);
                // setLoginError("❌ Invalid email or password");

       
        console.log('✅ Validated Login: ', formData);
    }


  return (
    <div className="h-screen overflow-hidden flex items-center justify-center bg-gray-50 ">

        <motion.div
            initial={{opacity:0, y:40}}
            animate={{opacity:1, y:0}}
            transition={{duration: 0.6, ease:'easeOut'}}
            className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 space-y-6"
           >
            
            {/* Logo & Heading  */}
            <div className='text-center'>
                <h1 className='text-3xl mb-1 font-bold text-gray-800'>Sign Up</h1>
                <img
                    src="./src/assets/medistock_ai_2.png"
                    alt='Medistock-Ai-Logo'
                    width={150}
                    height={150}    
                    className='mx-auto'
                />
                <h3 className='text-sm mb-4 -mt-3 font-semibold text-gray-600'>Optimize your medical supply chain with AI-powered insights.</h3>
            </div>

            <form
                className='space-y-4'
                onSubmit={handleSubmit}
            >
                <div>
                    <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className='w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-orange-300 focus:outline-none'
                    />

                    { errors.email && <p className='text-sm text-red-500 mt-1'>{errors.email}</p>}
                </div>

                <div>
                    <label
                        htmlFor='password'
                        className="block text-sm font-medium text-gray-700"
                    >Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder='*****df32'
                        className='w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-orange-300 mt-1 focus:outline-none'
                    />
                    {errors.password && <p className='text-sm text-red-500 mt-1'>{errors.password}</p>}
                </div>

                <div>
                    <label htmlFor='role' className='block text-sm font-medium text-gray-700'>Login As</label>

                    <select
                        id='role'
                        value={formData.role}
                        name="role"
                        onChange={handleChange}
                        className='w-full mt-1 px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-400 focus:outline-none border'
                    >
                        <option value="VENDOR">Vendor</option>
                        <option value="HOSPITAL">Hospital-Client</option>
                    </select>
                </div>

                <motion.button
                    whileTap={{scale:0.95}}
                    whileHover={{scale:1.06}}
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-4 hover:cursor-pointer bg-orange-400 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-orange-600 transition"
                >
                    {isLoading ? 'Loading...' : 'Register'}
                </motion.button>
            </form>

            <div className='text-center pt-4 '>
                <p className='text-sm text-gray-600 font-semibold'>
                    Already have an account?  {"  "}
                    <a
                        href="/"
                        className='text-orange-400 hover:text-orange-600 font-medium cursor-pointer'
                    >
                        Login
                    </a>
                </p>
            </div>

            
            {
                loginError && (
                    <motion.div
                        key="error"
                        initial={{opacity:0, y:-10}}
                        animate={{opacity:1, y: 0}}
                        exit={{opacity:0}}
                        className='text-red-500 text-sm text-center'
                    >
                        {loginError}
                    </motion.div>
                )
            }
            { loginSuccess && (
                <motion.div
                    key="success"
                    initial={{opacity:0, scale:0.9}}
                    animate = {{opacity:1, scale:1}}
                    exit={{opacity: 0}}
                    className='text-green-600 font-semibold text-center'
                >
                    ✅ Registration successful! Redirecting...
                </motion.div>
            )}
        </motion.div>
    </div> 
  )
}

export default RegisterPage