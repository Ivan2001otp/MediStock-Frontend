import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import type { SupplyItem } from "../models/auth";
import { bulkOrderSupplies, fetchSuppliesById } from "../api/httpClient";
import SupplyCard from "../components/SupplyCard";
import Modal from "../components/Modal";
import toast from "react-hot-toast";

const SupplySelectionPage = () => {
  const location = useLocation();

  const vendor = location.state?.vendorModel;
  const hospitalId = location.state?.hospitalId;

  const [supplies, setSupplies] = useState<SupplyItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  // preview state items
  const [previewSupplyName, setPreviewSupplyName] = useState<string>("");
  const [previewSupplySKU, setPreviewSupplySKU] = useState<string>("");
  const [previewSupplyUnits, setPreviewSupplyUnits] = useState<string>("");
  const [previewSupplyCategory, setPreviewSupplyCategory] = useState<string>("");
  const [previewSupplyId, setSupplyId] = useState<string>("");

  // this below state variable is assigned to that order number field.
  const [unitsOrdered, setUnitsOrdered] = useState<number>(0);

  // we use useref on caritems to store without causing re-renders
  const cartRef = useRef<SupplyItem[]>([])
 
  const [isDialogVisible , setDialogBoxVisibility] = useState<boolean>(false);

  if (!vendor || !hospitalId) return null;

  useEffect(() => {
    const fetchSuppliesByVendorId = async () => {
      try {
        let suppliesData: any = await fetchSuppliesById(vendor.id);

       
        if (!suppliesData || suppliesData.length === 0) {
          setSupplies([]);
        } else {
          setSupplies(suppliesData);
        }
        
      } catch (err: any) {
        console.error("Error fetching vendor/supplies", err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    
    fetchSuppliesByVendorId();
  }, [vendor.email]);


  const submitHandle = async(e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const supplyId = previewSupplyId;
    const orderedSupply  = supplies.find((item)=> item.id === supplyId);


    // not undefined or not null.
    if (orderedSupply != undefined || orderedSupply != null) {
      // creating a shallow copy
      const supplyToAdd = { ...orderedSupply, unit_of_measure: String(unitsOrdered) };

      supplyToAdd.unit_of_measure = String(unitsOrdered);
      cartRef.current.push(supplyToAdd!);

      toast.success(
        <span>
          Added <strong>{supplyToAdd.unit_of_measure}</strong> units of <strong>{supplyToAdd.name}</strong>
        </span>
      );
    }

    setUnitsOrdered(0);
    setDialogBoxVisibility(false);
  }

  return (
    <div className="min-h-screen w-full ">
      <div className="max-w-4xl w-full mt-4 mx-auto bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          {/* Left - Vendor Text Info */}
          <div className="space-y-1">
            <p className="text-lg font-semibold text-gray-800 ">{vendor.name}</p>
            <p className="text-sm text-gray-600 font-semibold">📧 {vendor.email}</p>
            <p className="text-sm text-gray-600 font-bold">📞 {vendor.phone}</p>
            <p className="text-sm text-gray-600">
              👤 Contact: {vendor.contact_person}
            </p>
            <p className="text-sm text-gray-600 font-semibold">📍 {vendor.address}</p>
          </div>
        
          <div className="flex flex-col items-center space-y-12">
                {/* Right - Score Badge */}
                <div className="flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                    <span>⭐ Score : </span>
                    <span>{(vendor.score * 100).toFixed()}</span>
                </div>

                <div>
               { 
                  supplies?.length > 0 ? 
                 
                      <button 
                        onClick={ async()=>{

                         let result = await toast.promise(
                            bulkOrderSupplies(hospitalId, cartRef.current, vendor),
                            {
                              loading:'Loading...',
                              success:<b>Order placed successfully</b>,
                              error:<b>Something went wrong</b>,
                            }
                          )
                          // let result = await  bulkOrderSupplies(hospitalId, cartRef.current, vendor)

                         setTimeout(()=> window.location.reload(), 800)
                          
                        }}
                        className="bg-blue-600 px-3  hover:bg-blue-800 font-semibold py-2 rounded-full text-gray-200 text-sm">Bulk order
                      </button>
                    
                    :
                      <button 
                       
                        className="bg-gray-400 px-3 cursor-default  font-semibold py-2 rounded-full text-gray-200 text-sm">
                        Bulk order
                      </button>
                  
                }
              </div>
          </div>
          
        </div>
      </div>


      <Modal isOpen={isDialogVisible} onClose={()=>{
        
        setDialogBoxVisibility(false);
        
        }}>
          <h2 className="text-xl font-semibold mb-4" >How many units required</h2>
          <form
            onSubmit={submitHandle}
            className="space-y-4"
          >
            <div>
              <input 
                maxLength={128}
                name="name"
                type="text"
                
                value={previewSupplyName}
                readOnly
              
                placeholder="Supply Name"
                className="w-full border rounded px-3 py-2"
              />
            </div>
              
              <div>
                  <input
                    maxLength={30}
                    name="sku"
                    type="text"
                    value={previewSupplySKU}
                    readOnly
                    placeholder="SKU"
                    className="w-full border rounded px-3 py-2"
                  />
                  
              </div>

              <div>
                  <input
                    maxLength={6}
                    type="text"
                    name="units"
                    value={previewSupplyUnits}
                    readOnly
                    placeholder="Eg:20 (only numeric value)"
                    className="w-full border rounded px-3 py-2"
                  />
                  
              </div>

                <div>
                  <input
                    type="text"
                    maxLength={128}
                    name="category"
                    readOnly
                    value={previewSupplyCategory}
                    placeholder="Eg:MEDICINE ; PPE"
                    className="w-full border rounded px-3 py-2"
                  />
                 
                </div>


              <div>
                  <label
                    id="is_vital"
                    htmlFor="is_vital" className=" text-sm ml-1 font-semibold">Number of units to order </label>
                  <input
                    type="number"
                    max={3999}
                    name="units"
                    value={unitsOrdered}
                    onChange={(e)=>{
                      const value = parseInt(e.target.value);

                      if (!isNaN(value)) {
                        if (value>0) {
                          setUnitsOrdered(value);
                        } else {
                          toast.error("Order units cannot be negative")
                        }
                        
                      } else {
                        setUnitsOrdered(0);
                      }
                    }}
                    placeholder="Numerical value accepted"
                    className="w-full border rounded px-3 py-2"
                  />
              
              </div>
            
            <div className="mt-4">
               <button
              type="submit"
              className="bg-blue-600 border-2 border-blue-800 text-gray-200 font-bold px-4 py-2 rounded-md hover:scale-105 transition duration-500 w-full"
            >
              Add to cart
            </button>
            </div>
          </form>
      </Modal>


      {

        loading ? <p className="text-3xl">Loading ... </p> 
          :
        (supplies.length > 0 ?
          
          <div>
              <div className="text-xl ml-4 font-semibold">Supplies Available</div>
              <div 
              
              className="grid grid-cols-1 md:grid-cols-5 auto-rows-fr p-4  gap-4">
              
                  {
                    supplies?.map((supply: SupplyItem, index: number) => (

                      <div
                        key={index+1}
                        onClick={

                          () => {
                            setDialogBoxVisibility(true);

                            setPreviewSupplyCategory(supply.category);
                            setPreviewSupplyName(supply.name);
                            setPreviewSupplySKU(supply.sku);
                            setPreviewSupplyUnits("Available units "+ supply.unit_of_measure);

                            setSupplyId(supply.id);
                          }
                        }
                        className="relative  cursor-pointer  bg-white p-2 h-full flex flex-col justify-between min-h-[200px]"
                      >
                        <SupplyCard key={index+2} supply={supply} index={index+3}  />
                      </div>
                    ))
                  }
              </div>

          </div>
          

            :
          
            <div className="flex items-center justify-center w-full text-xl text-center md:text-3xl min-h-80">
              <p>{` No supplies provided by vendor - ${vendor.name}`}</p>
            </div>
            )
      } 
      
    </div>
  );
};

export default SupplySelectionPage;
