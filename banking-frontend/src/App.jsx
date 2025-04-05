import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PaymentInterface from './components/PaymentInterface';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0D191E]">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/payment" element={<PaymentInterface />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 