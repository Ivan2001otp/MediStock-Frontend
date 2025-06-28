import React from 'react'
import { useLocation } from 'react-router-dom'
import type { VendorModel } from '../models/onboard';

const VendorDashboard = () => {
  const location = useLocation();
  const vendor = location.state?.vendor;
  console.log(vendor);
  
  return (
    <div>

      <div
        className ="min-h-screen flex flex-col items-center text-3xl text-red-500 justify-center"
    >VendorDashboard</div>
    <div className='text-5xl text-red-500'>
      
      {vendor.email}
    </div>
    </div>
  )
}

export default VendorDashboard