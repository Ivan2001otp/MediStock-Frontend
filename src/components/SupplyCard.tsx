import React from 'react';
import { motion } from "framer-motion";
import type { SupplyItem } from '../models/auth';

const SupplyCard = ({ supply, index }: { supply: SupplyItem; index: number  }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      key={index}
      onClick={()=>{

      }}
      className="relative  cursor-pointer rounded-xl border border-gray-300 bg-white p-5 shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col justify-between min-h-[200px]"
    >
      <div >
        <h3 className="text-[30xl] font-bold text-gray-800">{supply.name}</h3>
      </div>

     

      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <p><span className="font-medium">SKU :</span> {supply.sku}</p>
        <p><span className="font-medium">Units :</span> {supply.unit_of_measure}</p>
        
      </div>
        <span
          className={`absolute bottom-2 left-2 px-3 py-1 text-xs font-semibold rounded-full text-gray-100 bg-blue-400`}
        >
          {supply.category}
        </span>
      

       <div className="absolute -top-3 right-2">
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${
            supply.is_vital ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
          }`}
        >
          {supply.is_vital ? "Vital" : "Non-vital"}
        </span>
      </div>
    </motion.div>
  );
};

export default SupplyCard