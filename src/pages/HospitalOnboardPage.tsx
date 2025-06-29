import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swiper from "swiper";
import { Autoplay, Pagination } from "swiper/modules";

const HospitalOnboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const registeredEmailID = location.state?.registeredEmail;

  Swiper.use([Autoplay, Pagination]);
  useEffect(() => {
    new Swiper(".swiper-container", {
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }, []);

  const [formData, setFormData] = useState({
      name:"",
      email:"",
      address:"",
      contact_number:""
  });


  const [isLoading, setIsLoading] = useState(false);
  const [onBoardSuccess, setOnBoardSuccess] = useState(false);

  // to handle form validations
  const [onBoardErrors, setOnBoardErrors] = useState({
    name:"",
    email:"",
    contact_number:"",
    address:""
  })

  const handleChange = (
    e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:value,
    }));
  };

  const validate =() => {
    let valid:boolean = false;
  }

  const handleSubmit = (e : React.FormEvent) => {

  }


  return (
    <motion.div 
    initial={{opacity:0, x:-50}}
    animate={{opacity:1, x:0}}
    transition={{duration: 0.6, ease: "easeOut"}}
    className="min-h-screen flex flex-col md:flex-row bg-gray-50 scroll-auto">


      {/* Left Side Carousel  */}
      <div
      className="w-full md:w-1/2 bg-red-300 relative overflow-hidden"
      >

        <div
          className="swiper-container h-full"
        >

          <div className="swiper-wrapper">
            <div className="swiper-slide flex items-center justify-center h-full">
              <img
                src="https://images.pexels.com/photos/19921278/pexels-photo-19921278.jpeg"
                alt="Slide 11"
                className="object-cover w-full h-full"
              />
            </div>

            <div>
              <img
                src="https://images.pexels.com/photos/11661531/pexels-photo-11661531.jpeg"
                alt="Slide 22"
                className="object-cover w-full h-full"
              />
            </div>

            <div>
              <img
                src="https://images.pexels.com/photos/3873209/pexels-photo-3873209.jpeg"
                alt="Slide 33"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* carousel widget  */}
          <div
            className="swiper-pagination absolute bottom-4 w-full text-center"
          >
          </div>
        </div>

      </div>

      {/* Right Side - Form  */}
      <div className="relative w-full md:w-1/2 flex flex-col justify-center p-8 sm:p-16 space-y-16">


        <div>
          <span className="text-5xl font-bold text-orange-500">
              🌟 Hospital Onboarding
          </span>
        </div>

        <h2 className="text-gray-500 mb-12 font-semibold">Please fill in the details to get started</h2>
      
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
          <label
            className="font-mono uppercase font-bold  text-[11px]  text-gray-400 rounded-md
bg-white relative px-1  top-2 left-3 w-auto group-focus-within:text-red-600"
          >Vendor Name</label>
            <input
              id="name"
              name="name"
              type="text"
              maxLength={40}
              minLength={3}
              value={formData.name}
              onChange={handleChange}
              placeholder="EU Pharmacies.."
              className="w-full focus:ring-2 focus:ring-orange-300 focus:outline-none input px-2 p-3 rounded-md border text-sm"
            />
        </div>
        </form>
      </div>
    </motion.div>
  );
};

export default HospitalOnboardPage;
