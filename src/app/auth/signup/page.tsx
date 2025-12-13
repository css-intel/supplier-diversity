'use client';

import Link from 'next/link';
import { useState, Suspense } from 'react';
import { User, Mail, Lock, Building2, ArrowRight } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

function SignupContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || 'buyer';
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    accountType: type
  });

  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signup attempt:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">SD</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">SupplierDiversity</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Get Started Today</h1>
          <p className="text-gray-600">Join thousands of businesses connecting on SupplierDiversity</p>
        </div>

        {/* Signup Form */}
        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          <form onSubmit={handleSignup} className="space-y-5">
            {/* Account Type Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">I am a...</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'buyer', label: 'Buyer/Procurement' },
                  { value: 'supplier', label: 'Supplier' }
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData({...formData, accountType: option.value})}
                    className={`p-3 rounded-lg border-2 font-semibold transition ${
                      formData.accountType === option.value
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Company Name</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                  placeholder="Your Company"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Terms & Conditions */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded mt-1"
                required
              />
              <span className="text-sm text-gray-700">
                I agree to the{" "}
                <Link href="/terms" className="text-blue-600 hover:text-blue-700 font-semibold">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-blue-600 hover:text-blue-700 font-semibold">
                  Privacy Policy
                </Link>
              </span>
            </label>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              Create Account
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or sign up with</span>
            </div>
          </div>

          {/* Social Signup */}
          <div className="grid grid-cols-2 gap-4">
            <button className="border border-gray-300 rounded-lg py-3 hover:bg-gray-50 transition font-semibold">
              Google
            </button>
            <button className="border border-gray-300 rounded-lg py-3 hover:bg-gray-50 transition font-semibold">
              LinkedIn
            </button>
          </div>

          {/* Login Link */}
          <p className="text-center text-gray-700 mt-6">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-600 font-bold hover:text-blue-700">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SignupContent />
    </Suspense>
  );
}