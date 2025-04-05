import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OTPVerification = ({ transactionDetails, onVerificationComplete }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate OTP verification (replace with actual API call)
    setTimeout(() => {
      if (otp === '123456') { // In production, this would be validated against a real OTP
        onVerificationComplete(true);
        navigate('/dashboard', { 
          state: { 
            message: 'Transaction completed successfully!',
            type: 'success'
          }
        });
      } else {
        setError('Invalid OTP. Please try again.');
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-2xl max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-white mb-6">Verify Transaction</h2>
      
      <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/50 rounded-lg">
        <h3 className="text-lg font-medium text-yellow-200 mb-2">Security Check Required</h3>
        <p className="text-sm text-gray-300">
          This transaction has been flagged for additional verification due to:
        </p>
        <ul className="list-disc list-inside mt-2 text-sm text-gray-300">
          {transactionDetails.risk_factors.map((factor, index) => (
            <li key={index}>{factor.factor}</li>
          ))}
        </ul>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-300 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="otp" className="block text-sm font-medium text-gray-200 mb-2">
            Enter OTP sent to your registered device
          </label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            maxLength="6"
            className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white placeholder-gray-400"
            placeholder="Enter 6-digit OTP"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-3 px-4 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Verifying...' : 'Verify OTP'}
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-400 text-center">
        Didn't receive the code? <button className="text-yellow-500 hover:text-yellow-400">Resend OTP</button>
      </p>
    </div>
  );
};

export default OTPVerification; 