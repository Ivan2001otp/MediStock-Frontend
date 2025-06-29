import React from "react";
import type { CompleteVendor } from "../models/onboard";

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
        <button className="w-full border-2 border-gray-500 p-2 bg-gray-100 shadow-sm rounded-lg text-gray-800 text-md font-semibold hover:font-bold hover:bg-orange-300 transition-all duration-300">
          Logout
        </button>
      </div>
    </div>
    /*
    <aside
        className={`fixed top-0 left-0 h-full bg-blue-800 text-white flex flex-col transition-all duration-300 ease-in-out z-40
        ${isOpen ? 'w-64':'w-16 md:w-20'}    
        md:relative`}
    >

        <div className='p-4 flex items-center justify-center h-18   border-b border-blue-700'>
            <img  src="./src/assets/medistock_ai_2.png" alt="MediStock AI Logo" className={`duration-300 transition h-16 ${isOpen ? 'mr-2 rounded-md' : 'rounded-md h-12'}`}/>
            {isOpen && <span className='text-xl font-bold whitespace-nowrap'> MediStock AI</span>}
        </div>

        <nav className='flex-1 px-2 py-4 space-y-2 overflow-y-auto'>
            <MenuItem icon={<Home size={20} />} text="Dashboard" isOpen={isOpen} />
            <MenuItem icon={<Settings size={20} />} text="Vendor Profile" isOpen={isOpen} />
        </nav>

    </aside>
    */
  );
};

interface MenuItemProps {
  icon: React.ReactNode;
  text: string;
  isOpen: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, text, isOpen }) => {
  return (
    <a
      href="#"
      className={`flex items-center p-3 rounded-md hover:bg-blue-700
                    ${isOpen ? "justify-start" : "justify-center"}
                `}
      title={!isOpen ? text : ""} // tooltip when collapsed
    >
      {icon}
      {isOpen && <span className="ml-4 whitespace-nowrap">{text}</span>}
    </a>
  );
};
