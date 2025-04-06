import { useState, useEffect } from "react"
import { ArrowUpRight, ArrowDownLeft } from "lucide-react"
import axios from 'axios'

export default function RecentTransactions({ user }) {
  const [transactions, setTransactions] = useState([])
  const [transactionsLoading, setTransactionsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user?.id) {
        console.log('No user ID available')
        return;
      }
      
      console.log('Fetching transactions for user:', user.id)
      
      try {
        setTransactionsLoading(true)
        setError(null)
        
        // Add timeout to the request
        const response = await axios.get(`http://localhost:5000/api/recent-transactions/${user.id}`, {
          timeout: 5000 // 5 second timeout
        })
        
        console.log('API Response:', response.data)
        
        if (response.data) {
          setTransactions(response.data)
          setRetryCount(0) // Reset retry count on success
        } else {
          console.log('No data in response')
          setError('No transactions found')
        }
      } catch (error) {
        console.error('Error fetching transactions:', error)
        if (error.code === 'ECONNABORTED') {
          setError('Request timed out. Please try again.')
        } else {
          setError('Failed to load transactions. Please try again later.')
        }
        
        // Implement retry logic
        if (retryCount < 3) {
          console.log(`Retrying... Attempt ${retryCount + 1} of 3`)
          setRetryCount(prev => prev + 1)
          setTimeout(fetchTransactions, 2000) // Retry after 2 seconds
        }
      } finally {
        setTransactionsLoading(false)
      }
    }

    fetchTransactions()
  }, [user?.id, retryCount])

  const formatAmount = (amount, type) => {
    const formattedAmount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Math.abs(amount))
    
    if (type === 'balance') return formattedAmount
    return type === 'debit' ? `-${formattedAmount}` : `+${formattedAmount}`
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now - date) / (1000 * 60 * 60)
    
    if (diffInHours < 24) {
      if (diffInHours < 1) {
        const minutes = Math.floor((now - date) / (1000 * 60))
        return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`
      }
      return `${Math.floor(diffInHours)} hour${diffInHours !== 1 ? 's' : ''} ago`
    }
    
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date)
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
      <div className="bg-[#0D191E] bg-opacity-40 rounded-xl overflow-hidden">
        {transactionsLoading ? (
          <div className="p-8 flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-500 mb-2"></div>
            <p className="text-gray-400">Loading transactions...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <p className="text-red-500 mb-2">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="text-yellow-500 hover:text-yellow-400"
            >
              Try Again
            </button>
          </div>
        ) : transactions.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            No recent transactions
          </div>
        ) : (
          transactions.map(transaction => (
            <div key={transaction.transaction_id} className="p-4 border-b border-white/10 hover:bg-white/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${transaction.type === 'credit' ? 'bg-green-500/20' : 'bg-red-500/20'} rounded-full flex items-center justify-center`}>
                    {transaction.type === 'credit' ? (
                      <ArrowUpRight className={`w-5 h-5 ${transaction.type === 'credit' ? 'text-green-500' : 'text-red-500'}`} />
                    ) : (
                      <ArrowDownLeft className={`w-5 h-5 ${transaction.type === 'credit' ? 'text-green-500' : 'text-red-500'}`} />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">
                      {transaction.merchant || (transaction.type === 'credit' ? 'Received Payment' : 'Payment Sent')}
                    </p>
                    <p className="text-sm text-gray-400">
                      {transaction.category && <span className="capitalize">{transaction.category} • </span>}
                      {transaction.type === 'credit' ? 'From: ' : 'To: '}
                      {transaction.recipient || 'Unknown'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {transaction.device_info && `Device: ${transaction.device_info}`} • {transaction.location}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className = "font-name" >
                    {formatAmount(transaction.amount, transaction.type)}
                  </p>
                  <p className="text-sm text-gray-400">{formatDate(transaction.timestamp)}</p>
                  <p className="text-xs text-gray-500">Balance: {formatAmount(transaction.balance_after, 'balance')}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
} 