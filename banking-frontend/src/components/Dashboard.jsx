"use client"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import DashboardSidebar from "../components/DashboardSidebar"
import QuickActions from "../components/QuickActions"
import SecurityAlerts from "../components/SecurityAlerts"
import RecentTransactions from "../components/RecentTransactions"

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
    <div className="min-h-screen bg-hero-bg text-white">
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
            className="px-4 py-2 bg-[#0D191E] bg-opacity-40 hover:bg-opacity-60 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Account Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#0D191E] bg-opacity-40 p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Checking Account</h3>
              <span className="text-yellow-500">Active</span>
            </div>
            <p className="text-3xl font-bold mb-2">$12,345.67</p>
            <p className="text-gray-400">Account ending in 4567</p>
          </div>

          <div className="bg-[#0D191E] bg-opacity-40 p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Savings Account</h3>
              <span className="text-yellow-500">Active</span>
            </div>
            <p className="text-3xl font-bold mb-2">$45,678.90</p>
            <p className="text-gray-400">Account ending in 7890</p>
          </div>

          <div className="bg-[#0D191E] bg-opacity-40 p-6 rounded-xl">
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
        <RecentTransactions user={user} />

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Security Actions</h2>
          <SecurityAlerts />
        </div>
      </main>
    </div>
  )
}