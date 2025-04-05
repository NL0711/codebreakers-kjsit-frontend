"use client"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { Shield, AlertTriangle, ArrowUpRight, ArrowDownLeft, CreditCard } from "lucide-react"
import DashboardSidebar from "../components/DashboardSidebar"
import AccountSummary from "../components/AccountSummary"
import RecentTransactions from "../components/RecentTransactions"
import QuickActions from "../components/QuickActions"

export default function Dashboard() {
  const { user, loading, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login')
    }
  }, [user, loading, navigate])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D191E] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#0D191E] text-white">
      <DashboardSidebar />
      
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user.name}</h1>
            <p className="text-gray-400">Here's what's happening with your accounts</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Account Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Checking Account</h3>
              <span className="text-yellow-500">Active</span>
            </div>
            <p className="text-3xl font-bold mb-2">$12,345.67</p>
            <p className="text-gray-400">Account ending in 4567</p>
          </div>

          <div className="bg-white/5 p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Savings Account</h3>
              <span className="text-yellow-500">Active</span>
            </div>
            <p className="text-3xl font-bold mb-2">$45,678.90</p>
            <p className="text-gray-400">Account ending in 7890</p>
          </div>

          <div className="bg-white/5 p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Credit Card</h3>
              <span className="text-yellow-500">Active</span>
            </div>
            <p className="text-3xl font-bold mb-2">$1,234.56</p>
            <p className="text-gray-400">Card ending in 1234</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <QuickActions />
        </div>

        {/* Recent Transactions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          <div className="bg-white/5 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <ArrowUpRight className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div>
                    <p className="font-medium">Salary Deposit</p>
                    <p className="text-sm text-gray-400">From: Company Inc.</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-green-500">+$5,000.00</p>
                  <p className="text-sm text-gray-400">Today, 9:30 AM</p>
                </div>
              </div>
            </div>
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                    <ArrowDownLeft className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <p className="font-medium">Grocery Shopping</p>
                    <p className="text-sm text-gray-400">To: Supermarket</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-red-500">-$150.75</p>
                  <p className="text-sm text-gray-400">Yesterday, 2:15 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fraud Detection */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Security Alerts</h2>
          <div className="bg-white/5 p-6 rounded-xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <h3 className="font-semibold">Suspicious Activity Detected</h3>
                <p className="text-gray-400">Unusual login attempt from New York</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="font-semibold">Potential Fraud Alert</h3>
                <p className="text-gray-400">Large transaction in different timezone</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Interface */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Make a Payment</h2>
          <div className="bg-white/5 p-6 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Recipient</label>
                <input
                  type="text"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter recipient name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Amount</label>
                <input
                  type="number"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter amount"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Description</label>
                <input
                  type="text"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter payment description"
                />
              </div>
              <div className="md:col-span-2">
                <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-3 px-4 rounded-lg transition-colors font-medium">
                  Send Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
// function Dashboard() {
//   return (
//     <div className="dashboard">
//       <h2>Welcome to Your Dashboard</h2>
//       <p>You are now logged in!</p>
      
//     </div>
//   );
// }

// export default Dashboard; 