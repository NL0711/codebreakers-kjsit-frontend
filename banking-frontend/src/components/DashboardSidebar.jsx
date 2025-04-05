"use client"

import { Link, useLocation } from "react-router-dom"
import { Home, CreditCard, Send, PiggyBank, FileText, Bell, Settings, HelpCircle } from "lucide-react"

export default function DashboardSidebar() {
  const location = useLocation()
  const currentPath = location.pathname

  const navItems = [
    { name: "Home", icon: Home, path: "/dashboard" },
    { name: "Cards", icon: CreditCard, path: "/dashboard/cards" },
    { name: "Transfer", icon: Send, path: "/dashboard/transfer" },
    { name: "Savings", icon: PiggyBank, path: "/dashboard/savings" },
    { name: "Statements", icon: FileText, path: "/dashboard/statements" },
    { name: "Notifications", icon: Bell, path: "/dashboard/notifications" },
    { name: "Settings", icon: Settings, path: "/dashboard/settings" },
    { name: "Help", icon: HelpCircle, path: "/dashboard/help" },
  ]

  return (
    <div className="w-64 bg-[#0D191E] bg-opacity-50 h-screen fixed left-0 top-0 p-6">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-yellow-500 rounded-full"></div>
        <span className="text-white font-semibold text-lg">SecureBank</span>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
              currentPath === item.path
                ? "bg-yellow-500 text-black"
                : "text-gray-300 hover:bg-white/10"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}