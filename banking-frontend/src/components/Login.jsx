"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Shield, AlertTriangle } from "lucide-react"
import { behavioralAnalyzer } from "../utils/behaviouralAnalysis"
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    behavioralAnalyzer.startTracking()
  }, [])

  const recordLoginAttempt = (isSuccessful) => {
    const behavioralData = behavioralAnalyzer.generateBehavioralData(formData.username, isSuccessful)

    const loginAttempt = {
      timestamp: behavioralData.timestamp,
      username: formData.username,
      password: formData.password,
      isSuccessful,
      sessionData: behavioralData.sessionData,
      typingAnalysis: behavioralData.typingAnalysis,
      securityMetrics: behavioralData.securityMetrics,
    }

    return loginAttempt
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Record behavioral data
      const attemptData = recordLoginAttempt(true)
      console.log("Login attempt data:", attemptData)

      // Send login request to server
      const response = await axios.post('http://localhost:5000/login', {
        username: formData.username,
        password: formData.password,
        behavioralData: {
          timestamp: attemptData.timestamp,
          sessionData: attemptData.sessionData,
          typingAnalysis: attemptData.typingAnalysis,
          securityMetrics: attemptData.securityMetrics
        }
      })

      if (response.data.success) {
        // If login is successful but risky, we might want to add additional verification
        if (attemptData.securityMetrics.isRisky) {
          // For demo purposes, we'll just show an alert but still log in
          // In a real app, you might redirect to a 2FA page instead
          setTimeout(() => {
            navigate("/dashboard")
          }, 2000)
        } else {
          navigate("/dashboard")
        }
      } else {
        throw new Error(response.data.message || "Invalid credentials")
      }
    } catch (err) {
      setError(err.message || "An error occurred during login")
      // Record failed login attempt
      const failedAttempt = recordLoginAttempt(false)
      try {
        await axios.post('http://localhost:5000/login-attempt', {
          ...failedAttempt,
          error: err.message
        })
      } catch (logError) {
        console.error('Failed to log login attempt:', logError)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    if (error) setError("")
  }

  const handleKeyDown = (e) => {
    behavioralAnalyzer.recordKeyPress(e.key)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-hero-bg to-indigo-800">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-white text-3xl font-semibold flex items-center justify-center gap-2">
            <Shield className="w-8 h-8" />
            SBI Online Banking
          </div>
          <p className="text-gray-300 mt-2">Welcome back! Please login to your account.</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-2xl">
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-300 text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
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
                onKeyDown={handleKeyDown}
                className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white placeholder-gray-400 transition-colors"
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
                onKeyDown={handleKeyDown}
                className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white placeholder-gray-400 transition-colors"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-600 bg-white/10 text-yellow-500 focus:ring-yellow-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-yellow-400 hover:text-yellow-300 transition-colors">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-3 px-4 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Logging In..." : "Log In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <a href="#" className="text-yellow-400 hover:text-yellow-300 transition-colors font-medium">
                Register
              </a>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-400">
          <p>🔒 Secure, encrypted connection</p>
        </div>
      </div>
    </div>
  )
}

export default Login