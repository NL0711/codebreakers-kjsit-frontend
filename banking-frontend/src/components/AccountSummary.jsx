"use client"

import { useAuth } from "../context/AuthContext"

export default function AccountSummary() {
  const { user } = useAuth()

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Account Summary</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-sm text-gray-600">Available Balance</p>
          <p className="text-2xl font-bold">₹{user.balance.toLocaleString("en-IN")}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-sm text-gray-600">Total Deposits</p>
          <p className="text-2xl font-bold">₹{(user.balance * 0.8).toLocaleString("en-IN")}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-sm text-gray-600">Total Withdrawals</p>
          <p className="text-2xl font-bold">₹{(user.balance * 0.2).toLocaleString("en-IN")}</p>
        </div>
      </div>
    </div>
  )
}