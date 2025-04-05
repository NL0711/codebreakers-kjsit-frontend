import { Link } from "react-router-dom";
import { Send, CreditCard, FileText, PiggyBank, Shield, HelpCircle } from "lucide-react";

export default function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Link
        to="/transfer"
        className="p-4 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2"
      >
        <Send className="w-5 h-5" />
        Transfer Money
      </Link>
      <Link
        to="/pay-bills"
        className="p-4 bg-white/20 rounded-lg hover:bg-white/30 transition-colors flex items-center justify-center gap-2"
      >
        <CreditCard className="w-5 h-5" />
        Pay Bills
      </Link>
      <Link
        to="/statements"
        className="p-4 bg-white/20 rounded-lg hover:bg-white/30 transition-colors flex items-center justify-center gap-2"
      >
        <FileText className="w-5 h-5" />
        Statements
      </Link>
      <Link
        to="/savings"
        className="p-4 bg-white/20 rounded-lg hover:bg-white/30 transition-colors flex items-center justify-center gap-2"
      >
        <PiggyBank className="w-5 h-5" />
        Savings
      </Link>
      <Link
        to="/security"
        className="p-4 bg-white/20 rounded-lg hover:bg-white/30 transition-colors flex items-center justify-center gap-2"
      >
        <Shield className="w-5 h-5" />
        Security
      </Link>
      <Link
        to="/help"
        className="p-4 bg-white/20 rounded-lg hover:bg-white/30 transition-colors flex items-center justify-center gap-2"
      >
        <HelpCircle className="w-5 h-5" />
        Help
      </Link>
    </div>
  );
}