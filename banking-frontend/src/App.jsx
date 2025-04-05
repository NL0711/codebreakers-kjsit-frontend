import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';
import { AuthProvider } from './context/AuthContext';
import Payment from './components/Payment';
import OTPVerification from './components/OTPVerification';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-[#0D191E]">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/verify-transaction" element={<OTPVerification />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App; 