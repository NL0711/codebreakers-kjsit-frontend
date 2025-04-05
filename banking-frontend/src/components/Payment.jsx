"use client"

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, ArrowLeft } from 'lucide-react';
import PaymentForm from './PaymentForm';

export default function Payment() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D191E] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="h-screen bg-hero-bg text-white overflow-hidden">
      {/* Navigation Bar */}
      <nav className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 p-2">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-yellow-500" />
              <span className="text-xl font-semibold">SecureBank</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 p-3">
        <div className="w-full max-w-3xl">
          <div className="text-center mb-8">
          </div>

          <PaymentForm />

          {/* Security Notice */}
          <div className="mt-8 text-center text-sm text-gray-400">
            <div className="flex items-center justify-center gap-2">
              <Shield className="w-4 h-4 text-yellow-500" />
              <span>Your transaction is protected by bank-grade security</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 