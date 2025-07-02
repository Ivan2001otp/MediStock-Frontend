import React, { useState } from 'react'
import type { CompleteHospital } from '../models/auth'
import { PersonStanding } from 'lucide-react';

const HoverProfileCard = ({completeHospital_}:{completeHospital_ : CompleteHospital}) => {
  const [showProfile, setShowProfile] = useState(false);

    return (
        <div className='relative shadow-xl rounded-full'
            onMouseEnter={() => setShowProfile(true)}
            onMouseLeave={() => setShowProfile(false)}
        >
            
            {/* hover icon */}
            <PersonStanding 
            className=' cursor-pointer hover:-translate-y-1 duration-700  bg-gray-200 p-2 border-2 border-gray-900 rounded-full '
            size={50}/>


            {
                showProfile 
                    && 
                <div className="absolute z-50 top-14 left-0 space-y-3 w-64 bg-white shadow-xl rounded-xl border border-gray-300 p-4 transition-all duration-500">
                    <h3 className="text-lg font-semibold text-blue-800">{completeHospital_.name}</h3>
                    <b className="text-sm text-gray-600">📍 {completeHospital_.address}</b>
                    <p className="font-semibold text-gray-700">📞 {completeHospital_.contact_phone}</p>
                    <p className="font-semibold text-gray-700">📧 {completeHospital_.contact_email}</p>
                </div>
            }
        </div>
  );
};

export default HoverProfileCard