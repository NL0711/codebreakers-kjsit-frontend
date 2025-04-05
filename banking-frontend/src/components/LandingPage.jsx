import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="min-h-screen bg-hero-bg">
      {/* Navigation */}
      <nav className="px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-white text-xl font-semibold">SecureBank</Link>
        </div>
        <div className="flex items-center space-x-8 p-12">
          <Link to="/customers" className="text-gray-300 hover:text-white text-sm transition-colors">Customers</Link>
          <Link to="/resources" className="text-gray-300 hover:text-white text-sm transition-colors">Resources</Link>
          <Link to="/dashboard" className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md text-sm transition-colors">
            Dashboard
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="px-8 py-16 max-w-7xl mx-auto">
        <div className="bg-header-gradient rounded-lg p-12 shadow-xl">
          <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
            International<br />
            payments, <span className="text-gray-400">solved</span>
          </h1>
          <p className="text-gray-300 text-xl mb-8 max-w-2xl leading-relaxed">
            Automate invoice processing and payments,
            onboard vendors seamlessly, customize
            approval flows, and more — for 30% less.
          </p>
          <Link 
            to="/login" 
            className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-md transition-colors"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage; 