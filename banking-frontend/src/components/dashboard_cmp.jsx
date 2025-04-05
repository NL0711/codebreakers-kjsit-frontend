"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Bell,
  CreditCard,
  DollarSign,
  Download,
  Home,
  LogOut,
  PieChart,
  Plus,
  Search,
  Settings,
  Shield,
  User,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownLeft,
  Filter,
} from "lucide-react"

const Dashboard = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("transactions")
  const [showFraudAlert, setShowFraudAlert] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)

  // Mock account data
  const accountData = {
    name: "Rahul Sharma",
    accountNumber: "XXXX XXXX 4567",
    balance: 45250.75,
    savingsGoal: 100000,
    savingsProgress: 45,
    recentTransactions: [
      {
        id: "tx1",
        date: "2023-04-15",
        description: "ATM Withdrawal",
        amount: -5000,
        type: "debit",
        category: "Cash",
        status: "completed",
      },
      {
        id: "tx2",
        date: "2023-04-14",
        description: "Salary Credit",
        amount: 45000,
        type: "credit",
        category: "Income",
        status: "completed",
      },
      {
        id: "tx3",
        date: "2023-04-12",
        description: "Electric Bill Payment",
        amount: -2500,
        type: "debit",
        category: "Utilities",
        status: "completed",
      },
      {
        id: "tx4",
        date: "2023-04-10",
        description: "Fund Transfer to Rahul",
        amount: -1500,
        type: "debit",
        category: "Transfer",
        status: "completed",
      },
      {
        id: "tx5",
        date: "2023-04-08",
        description: "Amazon Purchase",
        amount: -3200,
        type: "debit",
        category: "Shopping",
        status: "completed",
      },
      {
        id: "tx6",
        date: "2023-04-05",
        description: "Restaurant Payment",
        amount: -1200,
        type: "debit",
        category: "Dining",
        status: "completed",
      },
      {
        id: "tx7",
        date: "2023-04-03",
        description: "Mobile Recharge",
        amount: -499,
        type: "debit",
        category: "Utilities",
        status: "completed",
      },
      {
        id: "tx8",
        date: "2023-04-01",
        description: "Interest Credit",
        amount: 125.75,
        type: "credit",
        category: "Interest",
        status: "completed",
      },
      {
        id: "fraud1",
        date: "2023-04-16",
        description: "Unknown International Transaction",
        amount: -15000,
        type: "debit",
        category: "Shopping",
        status: "flagged",
        isFraud: true,
      },
    ],
  }

  const handleLogout = () => {
    navigate("/login")
  }

  const handleFraudAlertDismiss = () => {
    setShowFraudAlert(false)
  }

  const handleFraudAlertView = () => {
    navigate("/fraud-details/fraud1")
  }

  const filteredTransactions = accountData.recentTransactions.filter(
    (tx) =>
      tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 text-white">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md p-4 border-b border-white/10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            <span className="font-bold text-xl">SBI Online Banking</span>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-white/10">
              <Bell className="h-5 w-5" />
              {showFraudAlert && <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>}
            </button>

            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-purple-900" />
              </div>
              <span className="hidden md:inline-block">{accountData.name}</span>
            </div>

            <button onClick={handleLogout} className="p-2 rounded-full hover:bg-white/10">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4 md:p-6">
        {/* Fraud Alert */}
        {showFraudAlert && (
          <div className="mb-6 bg-red-500/20 border border-red-500/50 rounded-lg p-4">
            <div className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-red-400 mr-3 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-bold text-red-300">Suspicious Transaction Detected</h3>
                <p className="text-red-200 text-sm mt-1">
                  We've detected a potentially fraudulent transaction of ₹15,000 on your account.
                </p>
                <div className="mt-3 flex gap-3">
                  <button
                    onClick={handleFraudAlertView}
                    className="px-4 py-1.5 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium"
                  >
                    View Details
                  </button>
                  <button
                    onClick={handleFraudAlertDismiss}
                    className="px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-md text-sm font-medium"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Account Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 col-span-2">
            <h2 className="text-xl font-bold mb-4">Account Summary</h2>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <p className="text-gray-300 text-sm">Account Number</p>
                <p className="text-xl font-semibold">{accountData.accountNumber}</p>
                <p className="text-gray-300 text-sm mt-4">Available Balance</p>
                <p className="text-3xl font-bold">₹{accountData.balance.toLocaleString("en-IN")}</p>
              </div>
              <div className="flex-1">
                <p className="text-gray-300 text-sm">Savings Goal</p>
                <div className="flex justify-between items-center mt-1">
                  <p className="font-semibold">₹{accountData.savingsGoal.toLocaleString("en-IN")}</p>
                  <p className="text-sm text-yellow-400">{accountData.savingsProgress}%</p>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{ width: `${accountData.savingsProgress}%` }}
                  ></div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button className="flex items-center justify-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-purple-900 py-2 px-3 rounded-lg text-sm font-medium">
                    <Plus className="h-4 w-4" />
                    Add Money
                  </button>
                  <button className="flex items-center justify-center gap-1 bg-white/10 hover:bg-white/20 py-2 px-3 rounded-lg text-sm font-medium">
                    <Download className="h-4 w-4" />
                    Statement
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center justify-center p-3 bg-white/5 hover:bg-white/10 rounded-lg">
                <CreditCard className="h-6 w-6 mb-2 text-yellow-400" />
                <span className="text-sm">Cards</span>
              </button>
              <button className="flex flex-col items-center justify-center p-3 bg-white/5 hover:bg-white/10 rounded-lg">
                <DollarSign className="h-6 w-6 mb-2 text-yellow-400" />
                <span className="text-sm">Pay Bills</span>
              </button>
              <button className="flex flex-col items-center justify-center p-3 bg-white/5 hover:bg-white/10 rounded-lg">
                <PieChart className="h-6 w-6 mb-2 text-yellow-400" />
                <span className="text-sm">Investments</span>
              </button>
              <button className="flex flex-col items-center justify-center p-3 bg-white/5 hover:bg-white/10 rounded-lg">
                <Settings className="h-6 w-6 mb-2 text-yellow-400" />
                <span className="text-sm">Settings</span>
              </button>
            </div>
          </div>
        </div>

        {/* Transactions */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h2 className="text-xl font-bold mb-2 md:mb-0">Recent Transactions</h2>

            <div className="w-full md:w-auto flex flex-col md:flex-row gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-64 px-4 py-2 pl-10 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>

              <div className="relative">
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10"
                >
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </button>

                {filterOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-purple-800 border border-white/10 rounded-lg shadow-lg z-10">
                    <div className="p-3">
                      <p className="font-medium mb-2">Transaction Type</p>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span>All</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span>Credit</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span>Debit</span>
                        </label>
                      </div>

                      <p className="font-medium mb-2 mt-4">Date Range</p>
                      <select className="w-full bg-white/10 border border-white/10 rounded p-2">
                        <option>Last 7 days</option>
                        <option>Last 30 days</option>
                        <option>Last 90 days</option>
                        <option>Custom range</option>
                      </select>

                      <div className="mt-4 flex justify-end">
                        <button className="px-3 py-1.5 bg-yellow-500 text-purple-900 rounded font-medium text-sm">
                          Apply Filters
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Description</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Category</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-300">Amount</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className={`border-b border-white/10 hover:bg-white/5 ${
                      transaction.isFraud ? "bg-red-500/10" : ""
                    }`}
                  >
                    <td className="py-3 px-4 text-sm">{transaction.date}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                            transaction.type === "credit" ? "bg-green-500/20" : "bg-red-500/20"
                          }`}
                        >
                          {transaction.type === "credit" ? (
                            <ArrowDownLeft className="h-4 w-4 text-green-400" />
                          ) : (
                            <ArrowUpRight className="h-4 w-4 text-red-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-xs text-gray-400">Transaction ID: {transaction.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm">{transaction.category}</td>
                    <td
                      className={`py-3 px-4 text-right font-medium ${
                        transaction.type === "credit" ? "text-green-400" : "text-red-300"
                      }`}
                    >
                      {transaction.type === "credit" ? "+" : "-"}₹{Math.abs(transaction.amount).toLocaleString("en-IN")}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {transaction.status === "completed" ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                          Completed
                        </span>
                      ) : transaction.status === "flagged" ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/20 text-red-400">
                          Flagged
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400">
                          Pending
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-center">
            <button className="text-yellow-400 hover:text-yellow-300 text-sm font-medium">View All Transactions</button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-purple-900/90 backdrop-blur-md border-t border-white/10 p-2">
        <div className="flex justify-around">
          <button className="flex flex-col items-center p-2">
            <Home className="h-5 w-5 text-yellow-400" />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button className="flex flex-col items-center p-2">
            <CreditCard className="h-5 w-5" />
            <span className="text-xs mt-1">Cards</span>
          </button>
          <button className="flex flex-col items-center p-2">
            <DollarSign className="h-5 w-5" />
            <span className="text-xs mt-1">Pay</span>
          </button>
          <button className="flex flex-col items-center p-2">
            <PieChart className="h-5 w-5" />
            <span className="text-xs mt-1">Invest</span>
          </button>
          <button className="flex flex-col items-center p-2">
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

