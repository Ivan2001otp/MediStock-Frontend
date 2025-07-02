import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import type { CompleteHospital, SupplyItem } from '../models/auth';
import { fetchHospitalByEmail, fetchOrderedSupplyService, logoutClient } from '../api/httpClient';
import HoverProfileCard from '../components/HoverProfileCard';
import toast from 'react-hot-toast';
import type { OrderedSupply } from '../models/onboard';
import Inventory_card from '../components/InventoryCard';
import InventoryCard from '../components/InventoryCard';

const HospitalDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [erro, setError] = useState<string|null>(null);
  const [inventories, setInventories] = useState<OrderedSupply[]>([]);

  const navigate = useNavigate();
  const location = useLocation();
  const hospital = location.state?.hospital;
  console.log(hospital);

  if (!hospital || !hospital.email)return null;

  const [completeHospital, setCompleteHospital] = useState<CompleteHospital | null>(null);
  
  useEffect(() => {

    const fetchHospitalAndInventory=async()=>{
      try {

        const hospitalProfile = await fetchHospitalByEmail(hospital.email);
        setCompleteHospital(hospitalProfile);

        const inventoryItems = await fetchOrderedSupplyService(hospitalProfile.id);
        setInventories(inventoryItems);

      } catch(err : any) {

        console.log(err);
        setError(err?.message || "Unknown error");

      } finally { 

        setIsLoading(false);

      }
    }


    fetchHospitalAndInventory();

  },[hospital.email]);

  
  return (
     <div className="min-h-screen flex flex-col">
      {/* Row 1 */}
      <div className="flex w-full h-1/4 flex-col gap-4 md:flex-row p-4">
        {/* Block A: 1/4 width on medium+ screens */}
        <div className="w-full md:w-[16%] bg-white p-2">
          <img
            alt='medistock-ai-img'
            src="./src/assets/medistock_ai_2.png"
            className='h-30 sm:h-15 rounded-xl shadow-lg border-4 border-gray-300 hover:-translate-y-1 duration-700 transition'
          />
        </div>

        {/* Block B: remaining space */}
        <div className="w-full bg-gray-100 border-4 border-blue-700 p-4  rounded-xl shadow-lg">
          
          <div className="space-y-3">
            <p className='font-semibold text-2xl sm:text-xl'>
                Welcome 😇
            </p>

            <div>
              <span className='text-3xl sm:text-4xl font-bold block mt-2'>{completeHospital?.name} 💓</span>
            </div>
          </div>

          {/* action items  */}
          <div
            className='mt-6 flex items-center gap-4 flex-wrap'
          >
            <HoverProfileCard completeHospital_={completeHospital!}/>

              <button 
              onClick={() => {
                // window.location.href="/order-supplies";
                navigate("/order-supplies", {state : {hospitalId : completeHospital!.id}})
              }}
              className="bg-gray-100 border-2 hover:bg-blue-500 hover:text-white border-gray-900 hover:border-blue-300 text-gray-800 px-3 py-2 rounded-full hover:-translate-y-1 transition duration-700">
                Add Extra Supplies
              </button>

              <button 
              onClick={ async()=>{
                
                const response  = await logoutClient(completeHospital!.contact_email, "VENDOR");
                  if (response.status==200) {
                    toast.success("Logged-out successfully")
                    setTimeout(()=>{
                      window.location.href = "/login";
                    },500)
                    
                  } else {
                    toast.success("❌ Logged failed")
                  }

              }}
              className="bg-gray-100 border-2 hover:bg-blue-500 hover:text-white border-gray-900 hover:border-blue-300 text-gray-800 px-3 py-2 rounded-full hover:-translate-y-1 transition duration-700">Logout</button>
          </div>
        </div>
      </div>

      {/* Row 2 */}
      <div className="flex-1 bg-gray-100 border-t-2 border-gray-200 p-4">
            <div>
                {
                  isLoading ? <p className="text-3xl">Loading ... </p> :
                  inventories.length > 0 ?

                  <div>
                    <div 
                      className = 'flex items-center justify-between flex-wrap gap-2 mb-6'
                    >

                      <div className="text-xl ml-4 font-semibold">Your inventory</div>
                      <button
                          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full shadow transition duration-300"
                          onClick={() => {
                            window.location.reload();
                          }}
                      > Sync Now</button>
                    </div>
                    
                    
                    <div
                      className="grid grid-cols-1 md:grid-cols-5 auto-rows-fr p-4  gap-4"
                    >

                        {
                          inventories?.map((item : OrderedSupply ,index: number) => (
                            <div
                              key={index+1}
                              className='relative  p-2 h-full flex flex-col justify-between min-h-[200px]'
                            >
                              <InventoryCard
                                key={index+2}
                                inventoryItem={item}
                                index={index+3}
                              />
                            </div>
                          ))
                        }


                    </div>
                  </div>
                  :
                  <div className="flex items-center justify-center w-full text-xl text-center md:text-3xl min-h-80">
                  <p>{`Your inventory is empty`}</p>
                </div>
                }
            </div>
      </div>
    </div>
  );
}

export default HospitalDashboard