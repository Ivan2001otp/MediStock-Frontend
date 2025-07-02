import React, { useEffect, useState } from "react";
import { PAGE_SIZE } from "../Constants.ts";
import { fetchAllVendorsPagination } from "../api/httpClient.ts";
import type { CompleteVendor } from "../models/onboard.ts";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const SetOrderPage = () => {
  // AFTER -> after:Cursor
  // NEXt -> nextCursor
  //   const [LIMIT, setLIMIT] = useState<number>(PageSize);
  const navigate = useNavigate();
  const location = useLocation();
  const  hospitalId = location.state?.hospitalId;

  const [vendorList, setVendors] = useState<CompleteVendor[]>([]);
  const [afterCursor, setAfterCursor] = useState<number>(0);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [pageStack, setPageStack] = useState<number[]>([]);

  useEffect(() => {
    const fetchVendors = async () => {
      // AFTER -> afterCursor
      setLoading(true);

      try {
        console.log("after cursor : ", afterCursor);
        const resp = await fetchAllVendorsPagination(afterCursor, PAGE_SIZE);
        // console.log("status : ",resp.status);
        // console.log("cursor : ", resp.next_cursor);

        setVendors(resp.data || []);
        setNextCursor(resp.next_cursor || null);

        if (afterCursor !== 0 || !pageStack.includes(afterCursor)) {
          setPageStack((prev) => [...prev, afterCursor]);
        }
      } catch (error) {
        console.error("Error fetching vendors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, [afterCursor]);

  const handleNext = () => {
    if (nextCursor !== null) {
      setAfterCursor(nextCursor);
    }
  };

  const handlePrev = () => {
    if (pageStack.length > 0) {
      const prev = [...pageStack];
      const lastCursor = prev.pop()!;

      setPageStack(prev);
      setAfterCursor(lastCursor);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Vendor Directory</h1>

      <div className="grid gap-6">
        {loading ? (
          <p className="text-gray-500">Loading vendors...</p>
        ) : vendorList.length === 0 ? (
          <p className="text-gray-500 text-3xl">No vendors found.</p>
        ) : (
          vendorList?.map((vendor, index) => (
            <motion.div
              key={vendor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white cursor-pointer rounded-xl p-5 shadow-md hover:shadow-xl transition border border-gray-200"
            >
              <div 
                onClick={()=>{
                  navigate("/supplies-selection", {
                    state:{
                      vendorModel : vendor,
                      hospitalId: hospitalId,
                    }
                  })
                }}
              className="flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <p className="text-xl font-semibold text-gray-800">{vendor.name}</p>
                  <p className="text-sm text-gray-600">{vendor.email}</p>
                  <p className="text-sm text-gray-600">📞 {vendor.phone}</p>
                </div>

                <div className="flex flex-col items-end justify-end gap-2 mt-4 md:mt-0">
                    {/* Quality Badge */}
                    <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        <span>Quality : </span>
                        <span>{vendor.overall_quality_rating.toFixed(1)}</span>
                    </div>

                    {/* ML Score Badge */}
                    <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        <Star size={14} className="text-green-600" />
                        <span>{(vendor.score * 100).toFixed(2)}</span>
                    </div>

                    {/* Avg Delivery Badge */}
                    <div className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                        <span>Avg Delivery :</span>
                        <span>{vendor.avg_delivery_time_days}d</span>
                    </div>
                </div>

              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-8">
        <button
          onClick={handlePrev}
          disabled={pageStack.length === 0}
          className="bg-gray-300 hover:bg-gray-400 text-sm px-4 py-2 rounded disabled:opacity-50"
        >
          ← Previous
        </button>

        <button
          onClick={handleNext}
          disabled={nextCursor === null}
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded disabled:opacity-50"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default SetOrderPage;
