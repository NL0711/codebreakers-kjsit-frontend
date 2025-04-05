import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="min-h-screen bg-primary">
      {/* Navigation */}
      <nav className="px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-white text-xl font-semibold">SecureBank</Link>
        </div>
        <div className="flex items-center space-x-8">
          <Link to="/product" className="text-gray-300 hover:text-white text-sm transition-colors">Product</Link>
          <Link to="/solutions" className="text-gray-300 hover:text-white text-sm transition-colors">Solutions</Link>
          <Link to="/developers" className="text-gray-300 hover:text-white text-sm transition-colors">Developers</Link>
          <Link to="/customers" className="text-gray-300 hover:text-white text-sm transition-colors">Customers</Link>
          <Link to="/resources" className="text-gray-300 hover:text-white text-sm transition-colors">Resources</Link>
          <Link to="/pricing" className="text-gray-300 hover:text-white text-sm transition-colors">Pricing</Link>
          <Link to="/login" className="text-gray-300 hover:text-white text-sm transition-colors">Log in</Link>
          <Link to="/demo" className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md text-sm transition-colors">
            Request a demo
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
          <button className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-md transition-colors">
            Request a demo
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage; 