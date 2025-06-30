import React from "react";
import type { CompleteVendor } from "../models/onboard";
import { logoutClient } from "../api/httpClient";
import toast from "react-hot-toast";

export const SideBar = (completeVendor: CompleteVendor) => {
  return (
    <div className="bg-blue-800 p-4 md:h-full text-white">
      <div className="p-4 flex items-center justify-center h-18  space-x-2  border-b border-blue-700">
        <img
          src="./src/assets/medistock_ai_2.png"
          alt="MediStock AI Logo"
          className="h-16 rounded-md"
        />
        <span className="text-2xl font-bold whitespace-nowrap">
          {" "}
          MediStock AI
        </span>
      </div>

      <div className="mt-12 border-b border-blue-700 pb-5">
        <h3 className="font-semibold text-xl">Vendor Profile</h3>
        <div className="w-full mt-4 rounded-md p-2 shadow-sm text-gray-900 bg-gray-100 ">
          <ul className="space-y-4 list-none ">
            <li className="flex gap-1 flex-wrap">
              <span className="font-bold">Vendor:</span>{" "}
              <span>{completeVendor.name}</span>
            </li>
            <li className="flex gap-1 flex-wrap">
              <span className="font-bold">Contact:</span>{" "}
              <span>{completeVendor.contact_person}</span>
            </li>
            <li className="flex gap-1 flex-wrap">
              <span className="font-bold">Phone:</span>{" "}
              <span>{completeVendor.phone}</span>
            </li>
            <li className="flex gap-1 flex-wrap">
              <span className="font-bold">Email:</span>{" "}
              <span className="break-all">{completeVendor.email}</span>
            </li>
            <li className="flex gap-1 flex-wrap">
              <span className="font-bold">Address:</span>{" "}
              <span>{completeVendor.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-4">
        <button 
        onClick={async()=>{
          const response  = await logoutClient(completeVendor.email, "VENDOR");
          if (response.status==200) {
            toast.success("✅ Logged successfully")
            setTimeout(()=>{
              window.location.href = "/login";
            },500)
            
          } else {
            toast.success("❌ Logged failed")
          }
        }}
        className="w-full border-2 border-gray-500 p-2 bg-gray-100 shadow-sm rounded-lg text-gray-800 text-md font-semibold hover:font-bold hover:bg-orange-300 transition-all duration-300">
          Logout
        </button>
      </div>
    </div>
   
  );
};

