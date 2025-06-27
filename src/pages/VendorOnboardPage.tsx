import React, { useEffect, useState } from "react";
import "swiper/swiper-bundle.css";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper } from "swiper";
import { motion } from "framer-motion";
import type { VendorModel } from "../models/onboard";
import toast from "react-hot-toast";
import {onBoardVendor} from "../api/httpClient"
import {useNavigate} from 'react-router-dom';

export default function VendorOnboardPage() {

  const navigate = useNavigate();

  // register the modules before hand.
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
    name: "",
    contact_person: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    overall_quality_rating: 0,
    avg_delivery_time_days: 0,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [onBoardError, setonBoardError] = useState({
    name: "",
    email: "",
    phone: "",
    contact_person: "",
    address: "",
    overall_quality_rating: "",
    avg_delievery_days: "",
  });

  const [normalRegisterErr, setNormalRegisterErr] = useState('')

  const [onboardSuccess, setOnboardSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit=(e : React.FormEvent)=>{
    e.preventDefault();

    if (!validate())return;

    setIsLoading(true);
    setNormalRegisterErr('');
    setOnboardSuccess(false);
    
    const payload : VendorModel = {
      name:formData.name,
      contact_person : formData.contact_person,
      phone : formData.phone,
      email : formData.email,
      address : formData.address,
      overall_quality_rating : parseFloat(String(formData.overall_quality_rating)),
      avg_delivery_time: parseFloat(String(formData.avg_delivery_time_days))
    }

    async function onboardVendorHandler() {
        try {
          // localStorage.getItem
          const result = await onBoardVendor(payload);

          console.log(result);

          if (result.status == 200) {
            setOnboardSuccess(true);
            console.log("onboarding the vendor is success ✅");
           
            navigate("/vendor-dashboard", {state : {vendor : payload}});
          }

        } catch (error:any) {
          console.log(error)
          setOnboardSuccess(false);
          setNormalRegisterErr("Something went wrong. Try again")

        } finally {
          setIsLoading(false);
        }
    }

    toast.promise(
      onboardVendorHandler, {
        loading: 'Onboarding Vendor ... ',
        success:'Vendor Onboarded successfully',
        error:'❌ Something went wrong !'
      }
    )

  };

  const validate = () => {
    let valid: boolean = true;

    const newErrors = {
      name: "",
      email: "",
      phone: "",
      contact_person: "",
      address: "",
      overall_quality_rating: "",
      avg_delievery_days: "",
    };

    if (!formData.name) {
      newErrors.name = "Vendor-Name is required";
      valid = false;
    }
    if (!formData.email) {
      newErrors.email = "Vendor Email is required";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    if (!formData.phone) {
      newErrors.phone = "Phone Number is required";
      valid = false;
    } else if (!formData.phone.includes("+")) {
      newErrors.phone = "Add country code to your phone-number";
      valid = false;
    }

    if (!formData.contact_person) {
      newErrors.contact_person = "Provide the contact-person name";
      valid = false;
    }
    if (!formData.address) {
      newErrors.address = "Provide the address";
      valid = false;
    }

    if (!formData.overall_quality_rating) {
      newErrors.overall_quality_rating = "Provide rating";
      valid = false;
    }
    if (!formData.avg_delivery_time_days) {
      newErrors.avg_delievery_days = "Provide avg delivery time";
      valid = false;
    }

    setonBoardError(newErrors);

    return valid;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen flex flex-col md:flex-row bg-gray-50 scroll-auto"
    >
      {/* Left Side - Carousel */}
      <div className="w-full md:w-1/2 bg-gray-100 relative overflow-hidden">
        <div className="swiper-container h-full">
          <div className="swiper-wrapper">
            <div className="swiper-slide flex items-center justify-center h-full">
              <img
                src="https://images.pexels.com/photos/19921278/pexels-photo-19921278.jpeg"
                alt="Slide 1"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="swiper-slide flex items-center justify-center h-full">
              <img
                src="https://images.pexels.com/photos/11661531/pexels-photo-11661531.jpeg"
                alt="Slide 2"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="swiper-slide flex items-center justify-center h-full">
              <img
                src="https://images.pexels.com/photos/3873209/pexels-photo-3873209.jpeg"
                alt="Slide 3"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div className="swiper-pagination absolute bottom-4 w-full text-center"></div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="relative w-full md:w-1/2 flex   flex-col justify-center p-8 sm:p-16 space-y-10">
        {/* Logo */}
        <div>
          <span className="text-5xl font-bold text-orange-500">
            🌟 Vendor Onboarding
          </span>
        </div>

        <h2 className="text-gray-500 mb-12 font-semibold">
          Please fill in the details to get started
        </h2>

        {/* Form Fields */}
        <form 
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4">
         
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
            {onBoardError.name && <p className="text-sm text-red-500 mt-1">{onBoardError.name}</p>}
        </div>

        <div>
          <label
            className="font-mono uppercase font-bold  text-[11px]  text-gray-400 rounded-md
bg-white relative px-1  top-2 left-3 w-auto group-focus-within:text-red-600"
          >Contact-Name</label>
          <input
            id="contact_person"
            name="contact_person"
            type="text"
           maxLength={40}
              minLength={3}
            onChange={handleChange}
            value={formData.contact_person}
            placeholder="David Beckham"
            className="w-full focus:ring-2 focus:ring-orange-300 focus:outline-none input px-2 p-3 rounded-md border text-sm"
          />
          {onBoardError.contact_person && <p className="text-sm text-red-500 mt-1">{onBoardError.contact_person}</p>}
        </div>

        <div>
          <label
            className="font-mono uppercase font-bold  text-[11px]  text-gray-400 rounded-md
bg-white relative px-1  top-2 left-3 w-auto group-focus-within:text-red-600"
          >Email</label>
          <input
            type="email"
            id="email"
            name="email"maxLength={40}
              minLength={12}
            onChange={handleChange}
            value={formData.email}
            placeholder="abc@medical.com"
            className="w-full focus:ring-2 focus:ring-orange-300 focus:outline-none input px-2 p-3 rounded-md border text-sm"
          />
          {onBoardError.email && <p className="text-sm text-red-500 mt-1">{onBoardError.email}</p>}
        </div>

        <div>
          <label
            className="font-mono uppercase font-bold  text-[11px]  text-gray-400 rounded-md
bg-white relative px-1  top-2 left-3 w-auto group-focus-within:text-red-600"
          >Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"maxLength={15}
              minLength={12}
            onChange={handleChange}
            value={formData.phone}
            placeholder="Eg : +91-4332..."
            className="w-full focus:ring-2 focus:ring-orange-300 focus:outline-none input px-2 p-3 rounded-md border text-sm"
          />
          {onBoardError.phone && <p className="text-sm text-red-500 mt-1">{onBoardError.phone}</p>}
        </div>

        <div>
          <label
            className="font-mono uppercase font-bold  text-[11px]  text-gray-400 rounded-md
bg-white relative px-1  top-2 left-3 w-auto group-focus-within:text-red-600"
          >Address</label>
          <input
            type="text"
            id="address"
            name="address"
            maxLength={40}
              minLength={12}
            onChange={handleChange}
            value={formData.address}
            placeholder="Town Square, 3rd Street, Germany"
            className="w-full focus:ring-2 focus:ring-orange-300 focus:outline-none input col-span-1 md:col-span-2 px-2 p-3 rounded-md border text-sm"
          />
          { onBoardError.address && <p className='text-sm text-red-500 mt-1'>{onBoardError.address}</p>}

        </div>

        <div>
          <label
            className="font-mono uppercase font-bold  text-[11px]  text-gray-400 rounded-md
bg-white relative px-1  top-2 left-3 w-auto group-focus-within:text-red-600"
          >Quality Rating</label>
          <input
            type="number"
            id="overall_quality_rating"
            name="overall_quality_rating"
            onChange={handleChange}
            minLength={1}
            value={formData.overall_quality_rating}
            step="1.0"
            max={5}
            min="0"
            placeholder="Eg: 4"
           
            className="w-full focus:ring-2 focus:ring-orange-300 focus:outline-none input text-sm px-2 p-3 rounded-md border"
          /> { onBoardError.overall_quality_rating && <p className='text-sm text-red-500 mt-1'>{onBoardError.overall_quality_rating}</p>}
          </div>

          <div
          >
            <label
            className="font-mono uppercase font-bold  text-[11px]  text-gray-400 rounded-md
bg-white relative px-1  top-2 left-3 w-auto group-focus-within:text-red-600"
          >Avg Delivery in Days</label>
         
            <input
              type="number"
              minLength={1}
              onChange={handleChange}
              id="avg_delivery_time_days"
              name="avg_delivery_time_days"
              value={formData.avg_delivery_time_days}
              step="1.0"
              max={90}
              min="0"
              placeholder="Avg Delivery Time (days) - (eg:3)"
              className="w-full focus:ring-2 focus:ring-orange-300 focus:outline-none input text-sm px-2 p-3 rounded-md border"
            />
            { onBoardError.avg_delievery_days && <p className='text-sm text-red-500 mt-1'>{onBoardError.avg_delievery_days}</p>}
          </div>

      {/* vertical spaces in order to make the last textfield visible(do not remove this) */}
          <div >
            <br/>
            <br/>
            
          </div>
            <motion.button
              type="submit"
              disabled={isLoading}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.06 }}
              className="absolute bottom-6 left-8 right-8 md:left-16 md:right-16 mt-6  font-bold text-xl md:w-auto px-6 py-3 border-2 hover:border-4 border-gray-800  bg-gray-300 text-black rounded-full hover:bg-gray-200 transition-all duration-100"
            >
              {isLoading ? "Loading..." : "Onboard Now"}
            </motion.button>
        </form>

          
      </div>
    </motion.div>
  );
}

// Tailwind Input Styling Shortcut
const inputStyle = `
  border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400
`;
