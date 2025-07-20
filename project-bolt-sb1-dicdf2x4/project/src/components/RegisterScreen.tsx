import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, Heart, Users } from 'lucide-react';

interface RegisterScreenProps {
  onRegister: (userType: 'unicorn' | 'couple') => void;
  onSwitchToSignIn: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ onRegister, onSwitchToSignIn }) => {
  const [step, setStep] = useState<'type' | 'details'>('type');
  const [userType, setUserType] = useState<'unicorn' | 'couple' | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTypeSelect = (type: 'unicorn' | 'couple') => {
    setUserType(type);
    setStep('details');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userType && formData.password === formData.confirmPassword) {
      onRegister(userType);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-6">
        <img 
          src="/cornr_logo_orig_bg_removed_name_removed.png" 
          alt="CORNR Logo" 
          className="h-8 w-auto"
        />
        <h1 className="text-xl font-semibold text-gray-800">
          {step === 'type' ? 'Join CORNR' : 'Create Account'}
        </h1>
        <div className="w-8"></div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          {step === 'type' ? (
            <>
              {/* CORNR Title */}
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">CORNR</h1>
                <p className="text-gray-600">How would you like to join?</p>
              </div>

              {/* User Type Selection */}
              <div className="space-y-4">
                <button
                  onClick={() => handleTypeSelect('unicorn')}
                  className="w-full p-6 bg-white rounded-2xl border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <div className="flex flex-col items-center space-y-3">
                    <div className="p-3 bg-purple-100 rounded-full">
                      <Heart className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Single Unicorn</h3>
                    <p className="text-sm text-gray-600 text-center">
                      Join as an individual looking to connect with couples or other unicorns
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => handleTypeSelect('couple')}
                  className="w-full p-6 bg-white rounded-2xl border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <div className="flex flex-col items-center space-y-3">
                    <div className="p-3 bg-purple-100 rounded-full">
                      <Users className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Couple</h3>
                    <p className="text-sm text-gray-600 text-center">
                      Join as a couple looking to connect with unicorns
                    </p>
                  </div>
                </button>
              </div>

              {/* Switch to Sign In */}
              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <button
                    onClick={onSwitchToSignIn}
                    className="text-purple-600 hover:text-purple-700 font-semibold"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Back Button */}
              <button
                onClick={() => setStep('type')}
                className="mb-6 text-purple-600 hover:text-purple-700 font-medium"
              >
                ← Back to user type
              </button>

              {/* Registration Form */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Create your {userType === 'unicorn' ? '🦄 Unicorn' : '👫 Couple'} account
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      {userType === 'couple' ? 'Couple Name' : 'Your Name'}
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent bg-purple-50/30"
                        placeholder={userType === 'couple' ? 'e.g., Alex & Jordan' : 'Enter your name'}
                        required
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent bg-purple-50/30"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="w-full pl-12 pr-12 py-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent bg-purple-50/30"
                        placeholder="Create a password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password Field */}
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="w-full pl-12 pr-12 py-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent bg-purple-50/30"
                        placeholder="Confirm your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-600"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Create Account Button */}
                  <button
                    type="submit"
                    disabled={formData.password !== formData.confirmPassword}
                    className="w-full bg-purple-400 hover:bg-purple-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl"
                  >
                    Create Account
                  </button>
                </form>

                {/* Switch to Sign In */}
                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    Already have an account?{' '}
                    <button
                      onClick={onSwitchToSignIn}
                      className="text-purple-600 hover:text-purple-700 font-semibold"
                    >
                      Sign In
                    </button>
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};