import React from 'react'
import type { OrderedSupply } from '../models/onboard'
import { motion } from 'framer-motion'

const InventoryCard = ({ inventoryItem, index }: { inventoryItem: OrderedSupply; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative rounded-2xl border border-gray-200 bg-white p-6 shadow-md hover:shadow-lg transition duration-300 flex flex-col justify-between min-h-[240px] group"
    >
      {/* Header: Name */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition">{inventoryItem.supply_name}</h3>
        <p className="text-sm text-gray-500">SKU: <span className="font-mono">{inventoryItem.supply_sku}</span></p>
      </div>

      {/* Vendor */}
      <div className="mt-3">
        <span className="inline-block text-xs bg-blue-100 text-blue-800 font-semibold px-3 py-1 rounded-full">
          Vendor: {inventoryItem.vendor_name}
        </span>
      </div>

      {/* Stock & Category */}
      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-gray-600">
        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
          Stock: {inventoryItem.current_stock}
        </div>
        <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
          Category: {inventoryItem.supply_category}
        </div>
      </div>

      {/* Vital Tag (Fixed position) */}
      <div className="absolute -bottom-2 right-3">
        <span
          className={`px-3 border-2  py-1 text-xs font-semibold rounded-full ${
            inventoryItem.is_vital ? 'bg-red-100 text-red-600 border-red-700' : 'bg-gray-200 text-gray-700 border-gray-800'
          }`}
        >
          {inventoryItem.is_vital ? 'Vital Supply' : 'Non-vital'}
        </span>
      </div>
    </motion.div>
  )
}

export default InventoryCard
