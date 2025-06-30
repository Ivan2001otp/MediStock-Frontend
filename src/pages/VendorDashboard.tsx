import { SideBar } from "../components/SideBar";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import Block from "../components/Block";
import type { CompleteVendor } from "../models/onboard";
import type { InsertSupplyPayload, SupplyItem } from "../models/auth";
import { fetchSuppliesById, fetchVendorByEmail, insertNewSupplyFromVendor } from "../api/httpClient";
import Modal from "../components/Modal";
import toast from "react-hot-toast";
import SupplyCard from "../components/SupplyCard";

type FormData = {
  id : string;
  name:string;
  sku:string;
  units:string;
  category:string;
  is_vital : boolean;
}

const VendorDashboard = () => {
  const [completeVendor, setCompleteVendor] = useState<CompleteVendor | null>(
    null
  );
  const [supplies, setSupplies] = useState<SupplyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  // dialog box visibility;
  const [isDialogBoxVisible, setDialogBoxVisibility] = useState<boolean>(false);

  const location = useLocation();
  const vendor = location.state?.vendor;
  const [isSidebarOpen, SetIsSidebarOpen] = useState(false);

  if (!vendor || !vendor.email) return null;
  console.log(vendor);

  useEffect(() => {
    const fetchVendorAndSupplies = async () => {
      try {
        const vendorData = await fetchVendorByEmail(vendor.email);
        setCompleteVendor(vendorData);

        let suppliesData: any;

        // console.log("completeVendor : ", completeVendor);<-null
        if (vendorData != null) {
          suppliesData = await fetchSuppliesById(vendorData.id);
        }

        console.log("supplies data : ", suppliesData);
        setSupplies(suppliesData.data);
      } catch (err: any) {
        console.error("Error fetching vendor/supplies", err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchVendorAndSupplies();
  }, [vendor.email]);


  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    const newValue  = (name==="sku" || name==="category") ? value.toUpperCase() : value;
    setFormData({...formData, [name]:newValue});
  }

  //form data
  const [formData, setFormData] = useState<FormData>(
    {id:"", name:"", sku:"", units:"", category:"", is_vital:false}
  );

  const [formErrors, setFormErrors] = useState({
    id:"", name:"", sku:"", units:"", category:""
  });


  const validate = ()  => {
   let valid : boolean = true;

    if (!formData.name) {
      formErrors.name="Add the supply name ";
      valid=false;
    }

    if (!formData.category) {
      formErrors.category = "Add the category "
      valid = false;
    }

    if (!formData.sku) {
      formErrors.sku = "Add the SKU code "
      valid=false;
    }

    if (!formData.units) {
     formErrors.units = "Add the available units"
      valid=false;
    } else {
      try{
        let a = parseFloat(formData.units);
      
      } catch(err) {
        formErrors.units="Input should be number format"
        valid=false;
      }
    }

    console.log(formErrors);
    console.log("valid result : ", valid);
    setFormErrors(formErrors);
    return valid;
  }

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()){
      setFormData({id:"", name:"", sku:"", units:"", category:"", is_vital:false});
      return;
    }

    console.log(formData);

    

    const newSupplyPayload : InsertSupplyPayload = {
      name: formData.name,
      sku : formData.sku,
      unit_of_measure : formData.units,
      category: formData.category,
      is_vital : formData.is_vital
    } 


    const response = await insertNewSupplyFromVendor(newSupplyPayload, completeVendor!.id);
    if (response.status == 200) {
         toast.success("✅ New supply added successfully", )

          const localPayload : SupplyItem = {
          id: "",
          name: formData.name,
          sku: formData.sku,
          unit_of_measure: formData.units,
          category: formData.category,
          is_vital: formData.is_vital,
          created_at: "",
          updated_at: ""
        }
        supplies.push(localPayload);
    } else {
      toast.error("❌ Something went wrong .Try again")
    }
    setFormData({id:"", name:"", sku:"", units:"", category:"", is_vital:false});
    setDialogBoxVisibility(false);
    
  };

  return (
    <div className="flex  h-screen bg-gray-100 font-sans text-gray-800">
      {/* show the below sidebar to only screen width >= md */}
      <aside className="hidden sm:block w-64 shadow-md ">
        <SideBar
          id={completeVendor?.id || 1}
          name={completeVendor?.name || ""}
          contact_person={completeVendor?.contact_person || ""}
          phone={completeVendor?.phone || ""}
          email={completeVendor?.email || ""}
          address={completeVendor?.address || ""}
          overall_quality_rating={completeVendor?.overall_quality_rating || 3}
          avg_delivery_time_days={completeVendor?.avg_delivery_time_days || 10}
          score={completeVendor?.score || 0}
          created_at={completeVendor?.created_at || ""}
          updated_at={completeVendor?.updated_at || ""}
        />
      </aside>

      {/* sidebar for mobile  */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 flex">
          {/* w-64 bg-white shadow-md p-4 h-full */}
          <aside className="w-64 bg-blue-800 shadow-md  h-full">
            <SideBar
              id={completeVendor?.id || 1}
              name={completeVendor?.name || ""}
              contact_person={completeVendor?.contact_person || ""}
              phone={completeVendor?.phone || ""}
              email={completeVendor?.email || ""}
              address={completeVendor?.address || ""}
              overall_quality_rating={
                completeVendor?.overall_quality_rating || 3
              }
              avg_delivery_time_days={
                completeVendor?.avg_delivery_time_days || 10
              }
              score={completeVendor?.score || 0}
              created_at={completeVendor?.created_at || ""}
              updated_at={completeVendor?.updated_at || ""}
            />

            <div className="p-4 mt-4 ">
              <button
                className="border p-2 rounded-xl border-gray-200 w-full text-center text-sm text-gray-200"
                onClick={() => SetIsSidebarOpen(false)}
              >
                Close
              </button>
            </div>
          </aside>

          <div
            className="flex-1 bg-black/40"
            onClick={() => SetIsSidebarOpen(false)}
          ></div>
        </div>
      )}

      <main className="flex-1 p-4 overflow-auto">
        {/* mobile menu toggle  */}
        <div className="sm:hidden mb-2">
          <button
            onClick={() => SetIsSidebarOpen(true)}
            className="text-gray-600 focus:outline-none"
          >
            <Menu size={24} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Block title="Block 1" className="bg-white p-6 rounded-lg shadow">
            <p>
              Your current ML worth score :{" "}
              <span className="font-bold text-blue-600 text-2xl">
                {completeVendor?.score == null
                  ? 10
                  : 10 * completeVendor!.score}
              </span>
            </p>
            <p className="text-sm text-gray-500 mt-1">Score updated daily.</p>
          </Block>

          <Block title="Block 2" className="bg-white p-6 rounded-lg shadow">
            <div className="space-y-2">
              <div>
                <p>You can add new medical supplies from here</p>
              </div>
              <div>
                <button 
                onClick={()=>{
                  setDialogBoxVisibility(true);
                }}
                className="hover:bg-blue-400 hover:text-black border-2 hover:border-black bg-blue-700 p-2 rounded-md shadow-md text-sm -mb-2 text-white transition-all duration-300">
                  Add Supply
                </button>
              </div>
            </div>
          </Block>
        </div>

        <Modal isOpen={isDialogBoxVisible} onClose={()=>{setDialogBoxVisibility(false);
          setFormErrors({id:"", name:"", sku:"", units:"", category:""});
          
        }}>
          <h2 className="text-xl font-semibold mb-4" >New Supply Item</h2>
          <form
            onSubmit={handleSubmit} 
            className="space-y-4"
          >
            <div>

              <input 
                maxLength={128}
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Supply Name"
                className="w-full border rounded px-3 py-2"
              />
              {
                formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>
              }
            </div>
              
              <div>
                  <input
                    maxLength={30}
                    name="sku"
                    type="text"
                    value={formData.sku}
                    onChange={handleChange}
                    placeholder="SKU"
                    className="w-full border rounded px-3 py-2"
                  />
                  {
                    formErrors.sku && <p className="text-red-500 text-sm">{formErrors.sku}</p>
                  }
              </div>

              <div>
                  <input
                    maxLength={6}
                    type="text"
                    name="units"
                    value={formData.units}
                    onChange={handleChange}
                    placeholder="Eg:20 (only numeric value)"
                    className="w-full border rounded px-3 py-2"
                  />
                  {
                    formErrors.units && <p className="text-red-500 text-sm">{formErrors.units}</p>
                  }
              </div>

                <div>
                  <input
                    type="text"
                    maxLength={128}
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Eg:MEDICINE ; PPE"
                    className="w-full border rounded px-3 py-2"
                  />
                  {
                      formErrors.category && <p className="text-red-500 text-sm">{formErrors.category}</p>
                  }
              </div>


              <div>
                <input
                id="is_vital"
                name="Is Vital"
                type="checkbox"
                checked={formData.is_vital}
                onChange={(e) => {
                  setFormData({...formData, is_vital: e.target.checked})
                }}
                className="w-4 h-4 hover:cursor-pointer"
              />
              <label
              id="is_vital"
              htmlFor="is_vital" className="hover:cursor-pointer text-sm ml-4 font-semibold">Mark it, if the supply is {' '}<span className="text-green-600 text-sm">Vital</span></label>
              </div>
            
            <div className="mt-4">
               <button
              type="submit"
              className="bg-gray-300 border-2 border-gray-700 text-gray-800 font-bold px-4 py-2 rounded-md hover:scale-105 w-full"
            >
              Submit
            </button>
            </div>
          </form>
        </Modal>

        <div className="grid grid-cols-1 md:grid-cols-5  min-h-screen p-4 border-2 border-gray-400 bg-gray-50 rounded shadow-md gap-4">
        

                {supplies.map((supply: SupplyItem, index: number) => (
               
                <SupplyCard key={index} supply={supply} index={index} />
              ))}
         
          
        </div>
      </main>
     
    </div>
  );
};

export default VendorDashboard;
