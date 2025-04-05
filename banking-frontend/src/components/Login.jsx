import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username: formData.username,
        password: formData.password
      });
      
      if (response.data.success) {
        // Login successful, navigate to dashboard
        navigate('/dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError(`Invalid email or password: ${err}`);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-hero-bg">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <Link to="/" className="text-white text-3xl font-semibold">
            SecureBank
          </Link>
          <p className="text-gray-400 mt-2">Welcome back! Please login to your account.</p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-2xl">
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-200 mb-2">
                Email Address
              </label>
              <input
                id="username"
                name="username"
                type="email"
                required
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#635bff] focus:border-transparent text-white placeholder-gray-400 transition-colors"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#635bff] focus:border-transparent text-white placeholder-gray-400 transition-colors"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-600 bg-white/10 text-[#635bff] focus:ring-[#635bff]"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>
              <Link to="/forgot-password" className="text-sm text-[#635bff] hover:text-[#635bff]/80 transition-colors">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-[#635bff] hover:bg-[#635bff]/90 text-white py-3 px-4 rounded-lg transition-colors font-medium"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#635bff] hover:text-[#635bff]/80 transition-colors font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-8 text-center text-sm text-gray-400">
          <p>🔒 Secure, encrypted connection</p>
        </div>
      </div>
    </div>
  );
};

export default Login; 