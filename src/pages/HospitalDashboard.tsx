import React from 'react'
import { useLocation } from 'react-router-dom';

const HospitalDashboard = () => {
  const location = useLocation();
  const hospital = location.state?.hospital;
  console.log(hospital);

  if (!hospital || !hospital.email)return null;
  return (
    <div
        className ="min-h-screen flex flex-col items-center text-3xl text-red-500 justify-center"
    >{
      hospital.email
    }</div>
  );
}

export default HospitalDashboard