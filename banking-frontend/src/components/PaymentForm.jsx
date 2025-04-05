import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import OTPVerification from './OTPVerification';

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    recipient: '',
    amount: '',
    description: '',
    accountId: 'C1001',
    merchantCategory: 'retail',
    shippingAddress: '',
    paymentMethodAge: '0.5'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [deviceId, setDeviceId] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [transactionAnalysis, setTransactionAnalysis] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get device ID
    const deviceId = localStorage.getItem('deviceId') || Math.random().toString(36).substring(2);
    localStorage.setItem('deviceId', deviceId);
    setDeviceId(deviceId);

    // Get IP address
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => setIpAddress(data.ip))
      .catch(() => setIpAddress('unknown'));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // First analyze the transaction for fraud
      const analysisData = {
        transaction_amount: parseFloat(formData.amount),
        merchant_category_code: formData.merchantCategory,
        transaction_time: new Date().toISOString(),
        user_average_transaction: 200.00, // Set a baseline for testing
        ip_address: ipAddress,
        device_id: deviceId,
        transactions_last_hour: 6, // Set high to trigger fraud detection
        time_since_last_login: 0.05, // Recent login to trigger fraud detection
        shipping_address: formData.shippingAddress,
        payment_method_age: parseFloat(formData.paymentMethodAge)
      };

      const analysisResponse = await axios.post('http://localhost:5000/api/analyze-transaction', analysisData);
      console.log('Fraud Analysis Response:', analysisResponse.data);

      if (analysisResponse.data.is_fraudulent) {
        setTransactionAnalysis(analysisResponse.data);
        setShowOTP(true);
        setIsLoading(false);
        return;
      }

      // If not fraudulent, proceed with transaction
      await processTransaction(analysisResponse.data);

    } catch (err) {
      console.error('Error:', err.response || err);
      setError(err.response?.data?.error || 'Failed to process transaction');
      setIsLoading(false);
    }
  };

  const processTransaction = async (analysis) => {
    try {
      const transactionData = {
        account_id: formData.accountId,
        amount: parseFloat(formData.amount),
        type: 'debit',
        recipient: formData.recipient,
        description: formData.description,
        category: formData.merchantCategory,
        transaction_analysis: analysis
      };

      console.log('Sending transaction:', transactionData);
      const response = await axios.post('http://localhost:5000/api/transactions', transactionData);

      if (response.status === 201) {
        navigate('/dashboard', {
          state: {
            message: 'Payment sent successfully!',
            type: 'success'
          }
        });
      }
    } catch (err) {
      console.error('Transaction Error:', err.response || err);
      setError(err.response?.data?.error || 'Failed to send payment');
      setIsLoading(false);
    }
  };

  const handleVerificationComplete = async (success) => {
    if (success) {
      await processTransaction(transactionAnalysis);
    } else {
      setError('Transaction cancelled due to failed verification.');
      setShowOTP(false);
    }
  };

  if (showOTP) {
    return <OTPVerification 
      transactionDetails={transactionAnalysis}
      onVerificationComplete={handleVerificationComplete}
    />;
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-2xl max-w-sm mx-auto">
      <h2 className="text-2xl font-semibold text-white mb-6">Send Payment</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-300 text-sm">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-500/10 border border-green-500/50 rounded-lg text-green-300 text-sm">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-3">
          <div>
            <label htmlFor="recipient" className="block text-sm font-medium text-gray-200 mb-2">
              Recipient
            </label>
            <input
              type="text"
              id="recipient"
              name="recipient"
              value={formData.recipient}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white placeholder-gray-400"
              placeholder="Enter recipient name or account number"
            />
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-200 mb-2">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              min="0.01"
              step="0.01"
              className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white placeholder-gray-400"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label htmlFor="merchantCategory" className="block text-sm font-medium text-gray-200 mb-2">
              Transaction Category
            </label>
            <select
              id="merchantCategory"
              name="merchantCategory"
              value={formData.merchantCategory}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#534687] border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white appearance-none cursor-pointer relative"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 0.5rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.5em 1.5em',
                paddingRight: '2.5rem'
              }}
            >
              <option value="retail">Retail</option>
              <option value="transfer">Transfer</option>
              <option value="utilities">Utilities</option>
              <option value="entertainment">Entertainment</option>
              <option value="travel">Travel</option>
              <option value="services">Services</option>
            </select>
          </div>

          <div>
            <label htmlFor="shippingAddress" className="block text-sm font-medium text-gray-200 mb-2">
              Shipping Address
            </label>
            <input
              type="text"
              id="shippingAddress"
              name="shippingAddress"
              value={formData.shippingAddress}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white placeholder-gray-400"
              placeholder="Enter shipping address"
            />
          </div>

          <div>
            <label htmlFor="paymentMethodAge" className="block text-sm font-medium text-gray-200 mb-2">
              Payment Method Age (years)
            </label>
            <input
              type="number"
              id="paymentMethodAge"
              name="paymentMethodAge"
              value={formData.paymentMethodAge}
              onChange={handleChange}
              min="0"  //hardcoded to for fraud testing
              step="0.1" //hardcoded to for fraud testing
              required
              className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white placeholder-gray-400"
              placeholder="Enter payment method age in years"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-200 mb-2">
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white placeholder-gray-400"
              placeholder="Add a note (optional)"
            />
          </div>

          <div>
            <label htmlFor="accountId" className="block text-sm font-medium text-gray-200 mb-2">
              From Account
            </label>
            <select
              id="accountId"
              name="accountId"
              value={formData.accountId}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#5a5571] border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white appearance-none cursor-pointer relative"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 0.5rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.5em 1.5em',
                paddingRight: '2.5rem'
              }}
            >
              <option value="C1001">Checking Account (C1001)</option>
              <option value="S1001">Savings Account (S1001)</option>
            </select>
          </div>
        </div>

        <div className="pt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-3 px-4 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Sending...' : 'Send Payment'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm; 