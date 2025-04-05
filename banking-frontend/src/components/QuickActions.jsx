import { useNavigate } from 'react-router-dom';
import { Send, CreditCard, History, Shield } from "lucide-react";

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        onClick={() => navigate('/payment')}
        className="flex flex-col items-center justify-center p-4 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg transition-colors"
      >
        <Send className="w-6 h-6 mb-2" />
        <span>Send Money</span>
      </button>
      <button className="flex flex-col items-center justify-center p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
        <CreditCard className="w-6 h-6 mb-2" />
        <span>Pay Bills</span>
      </button>
      <button className="flex flex-col items-center justify-center p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
        <History className="w-6 h-6 mb-2" />
        <span>Transaction History</span>
      </button>
      <button className="flex flex-col items-center justify-center p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
        <Shield className="w-6 h-6 mb-2" />
        <span>Security</span>
      </button>
    </div>
  );
};

export default QuickActions;