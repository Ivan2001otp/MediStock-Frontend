import { SideBar } from "../components/SideBar";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import Block from "../components/Block";
import type { CompleteVendor } from "../models/onboard";
import type { SupplyItem } from "../models/auth";
import { fetchSuppliesById, fetchVendorByEmail } from "../api/httpClient";

const VendorDashboard = () => {
  const [completeVendor, setCompleteVendor] = useState<CompleteVendor | null>(
    null
  );
  const [supplies, setSupplies] = useState<SupplyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
                <button className="hover:bg-blue-400 hover:text-black border-2 hover:border-black bg-blue-700 p-2 rounded-md shadow-md text-sm -mb-2 text-white transition-all duration-300">
                  Add Supply
                </button>
              </div>
            </div>
          </Block>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5">
          {supplies.map((supply: SupplyItem, index: number) => (
            <div key={index + 1}>
              {/* <p>{supply.id}</p> */}
              <p>{supply.name}</p>
              <p>{supply.sku}</p>
              <p>{supply.units}</p>
              <p>{supply.category}</p>
              <p>{supply.is_vital}</p>
              <p>{supply.created_at}</p>
              <p>{supply.updated_at}</p>
              <div>
                <br />
              </div>
            </div>
          ))}
        </div>
      </main>
      {/* <div className={`flex-1 flex-col  transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16 md:20'}`}>
        
        <div className='bg-white p-4 shadow-md rounded-b-lg flex items-center h-16 space-x-4'>
          <button
            onClick={toggleSidebar}
            className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-blue-500 rounded-md p-1"
          >
            {isSidebarOpen ? <PanelLeftClose size={24}/> : <PanelLeftOpen size = {24}/>}
          </button>
          <h1>Vendor Dashboard - {vendor.email}</h1>
        </div>

        <MainContent/>
      </div> */}
    </div>
  );
};

export default VendorDashboard;
