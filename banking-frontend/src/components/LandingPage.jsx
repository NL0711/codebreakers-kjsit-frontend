import { Link } from 'react-router-dom';
import circleBackground from '../assets/circle-bg_component.svg';
import headerImage from '../assets/header-img.jpg';
import logo from '../assets/logo.svg';

function LandingPage() {
  return (
    <div className="min-h-screen bg-hero-bg relative">
      <img 
        src={circleBackground} 
        alt="" 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
        aria-hidden="true"
      />
      {/* Navigation */}
      <nav className="px-8 py-4 flex justify-between items-center relative z-10">
        <div className="flex items-center">
          <img src={logo} alt="SecureBank Logo" className="w-[22rem]" />
        </div>
        <div className="flex items-center space-x-8 p-12">
          <Link to="/customers" className="text-gray-300 hover:text-white text-3xl transition-colors">Customers</Link>
          <Link to="/resources" className="text-gray-300 hover:text-white text-3xl transition-colors">Resources</Link>
          <Link to="/dashboard" className="bg-yellow-500 hover:bg-yellow-500/90 text-black font-semibold px-4 py-2 rounded-md text-3xl transition-colors">
            Dashboard
          </Link>
        </div>  
      </nav>

      {/* Hero Section */}
      <div className="px-8 py-16 max-w-7xl mx-auto relative z-10 opacity-80 rounded-3xl">
        <div className="bg-black/10 rounded-2xl p-12 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-6xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Secure<br />
                payments, <span className="text-yellow-500">solved</span>
              </h1>
              <p className="text-gray-300 text-xl mb-8 max-w-2xl leading-relaxed">
                Our system blends smart fraud detection with manual review, ensuring every transaction is accurate, secure, and trustworthy.
              </p>
              <Link 
                to="/login" 
                className="bg-yellow-500 hover:bg-yellow-500/90 text-black font-bold px-8 py-4 rounded-md text-lg transition-colors inline-block"
              >
                Login
              </Link>
            </div>
            <div className="flex-1 flex justify-center items-center">
              <img 
                src={headerImage} 
                alt="Secure Banking Illustration" 
                className="w-full max-w-lg rounded-md h-auto object-contain transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage; 