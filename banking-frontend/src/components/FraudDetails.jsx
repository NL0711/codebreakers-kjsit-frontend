"use client"
import { useNavigate, useParams } from "react-router-dom"
import { AlertTriangle, ArrowLeft, Calendar, Clock, CreditCard, MapPin, Shield } from "lucide-react"

const FraudDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  // Mock fraud transaction details
  const fraudDetails = {
    id: "fraud1",
    date: "2023-04-16",
    time: "14:32:45",
    description: "Unknown International Transaction",
    amount: 15000,
    location: "Lagos, Nigeria",
    device: "Unknown Android Device",
    ipAddress: "102.89.xx.xx",
    cardNumber: "**** **** **** 4567",
    merchant: "Online Shopping Portal",
    status: "Blocked",
    riskScore: 92,
    riskFactors: [
      "Transaction location does not match your usual patterns",
      "Device not previously used with this account",
      "Unusual transaction amount",
      "International transaction from a country you have not transacted with before",
    ],
  }

  const handleBack = () => {
    navigate("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 text-white">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md p-4 border-b border-white/10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            <span className="font-bold text-xl">SBI Online Banking</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4 md:p-6">
        <button onClick={handleBack} className="flex items-center text-yellow-400 hover:text-yellow-300 mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </button>

        <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden">
          <div className="bg-red-600 p-4 text-white">
            <div className="flex items-center">
              <AlertTriangle className="h-6 w-6 mr-2" />
              <h1 className="text-xl font-bold">Fraud Alert: Suspicious Transaction Detected</h1>
            </div>
          </div>

          <div className="p-6">
            <div className="bg-red-500/20 border-l-4 border-red-600 p-4 mb-6">
              <p className="text-red-300">
                We've detected a potentially fraudulent transaction of ₹15,000 on your account. For your security, we
                have temporarily blocked this transaction.
              </p>
            </div>

            <h2 className="text-lg font-bold mb-4">Transaction Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start">
                <CreditCard className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-400">Amount</p>
                  <p className="font-bold">₹{fraudDetails.amount.toLocaleString("en-IN")}</p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="font-bold">{fraudDetails.location}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-400">Date</p>
                  <p className="font-bold">{fraudDetails.date}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-400">Time</p>
                  <p className="font-bold">{fraudDetails.time}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded-md mb-6">
              <h3 className="font-bold mb-2">Additional Information</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-400">Card Number:</span>
                  <span>{fraudDetails.cardNumber}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Merchant:</span>
                  <span>{fraudDetails.merchant}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Device:</span>
                  <span>{fraudDetails.device}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">IP Address:</span>
                  <span>{fraudDetails.ipAddress}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className="font-bold text-red-400">{fraudDetails.status}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Risk Score:</span>
                  <span className="font-bold text-red-400">{fraudDetails.riskScore}/100</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-500/10 border-l-4 border-red-600 p-4 mb-6">
              <h3 className="font-bold text-red-300 mb-2">Risk Factors</h3>
              <ul className="list-disc pl-5 text-red-200">
                {fraudDetails.riskFactors.map((factor, index) => (
                  <li key={index} className="mb-1">
                    {factor}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-yellow-500/10 border-l-4 border-yellow-600 p-4 mb-6">
              <h3 className="font-bold text-yellow-300 mb-2">What should you do?</h3>
              <ul className="list-disc pl-5 text-yellow-200">
                <li>If you recognize this transaction, you can approve it.</li>
                <li>If you don't recognize this transaction, report it as fraud.</li>
                <li>For your security, we have temporarily blocked your card.</li>
                <li>Contact our customer service if you need immediate assistance.</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md">
                Report as Fraud
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md">
                This is My Transaction
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white font-bold py-2 px-4 rounded-md">
                Contact Customer Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FraudDetails