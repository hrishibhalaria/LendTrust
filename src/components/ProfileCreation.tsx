import React, { useState } from 'react';
import { UserType, UserProfile } from '../App';
import { User, Phone, Mail, CreditCard, MapPin, Briefcase, DollarSign, TrendingUp } from 'lucide-react';

interface ProfileCreationProps {
  userType: UserType;
  onComplete: (profile: UserProfile) => void;
  initialData: UserProfile;
}

const ProfileCreation: React.FC<ProfileCreationProps> = ({ userType, onComplete, initialData }) => {
  const [profile, setProfile] = useState<UserProfile>(initialData);
  const [errors, setErrors] = useState<Partial<UserProfile>>({});
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = userType === 'lender' ? 3 : 2;

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<UserProfile> = {};
    
    if (step === 1) {
      if (!profile.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!profile.gender) newErrors.gender = 'Gender selection is required';
      if (!profile.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
      if (!/^\d{10}$/.test(profile.phoneNumber)) newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
      if (!profile.email.trim()) newErrors.email = 'Email is required';
      if (!/\S+@\S+\.\S+/.test(profile.email)) newErrors.email = 'Please enter a valid email';
    }
    
    if (step === 2) {
      if (!profile.panCard.trim()) newErrors.panCard = 'PAN card number is required';
      if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(profile.panCard)) newErrors.panCard = 'Please enter a valid PAN number';
      if (!profile.aadhaarCard.trim()) newErrors.aadhaarCard = 'Aadhaar card number is required';
      if (!/^\d{12}$/.test(profile.aadhaarCard.replace(/\s/g, ''))) newErrors.aadhaarCard = 'Please enter a valid 12-digit Aadhaar number';
      if (!profile.address.trim()) newErrors.address = 'Address is required';
      if (!profile.occupation.trim()) newErrors.occupation = 'Occupation is required';
      if (userType === 'borrower' && !profile.monthlyIncome) newErrors.monthlyIncome = 'Monthly income is required';
    }

    if (step === 3 && userType === 'lender') {
      if (!profile.netWorth) newErrors.netWorth = 'Net worth is required for lenders';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        onComplete(profile);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field: keyof UserProfile, value: string | number) => {
    setProfile(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-stone-800 mb-6">Personal Information</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-2">Full Name *</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-400" />
            <input
              type="text"
              value={profile.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 ${
                errors.fullName ? 'border-red-500' : 'border-stone-300'
              }`}
              placeholder="Enter your full name"
            />
          </div>
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-2">Gender *</label>
          <select
            value={profile.gender}
            onChange={(e) => handleInputChange('gender', e.target.value)}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 ${
              errors.gender ? 'border-red-500' : 'border-stone-300'
            }`}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-2">Phone Number *</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-400" />
            <input
              type="tel"
              value={profile.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 ${
                errors.phoneNumber ? 'border-red-500' : 'border-stone-300'
              }`}
              placeholder="10-digit mobile number"
            />
          </div>
          {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-2">Email Address *</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-400" />
            <input
              type="email"
              value={profile.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 ${
                errors.email ? 'border-red-500' : 'border-stone-300'
              }`}
              placeholder="Enter your email"
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-stone-800 mb-6">Identity & Financial Information</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-2">PAN Card Number *</label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-400" />
            <input
              type="text"
              value={profile.panCard}
              onChange={(e) => handleInputChange('panCard', e.target.value.toUpperCase())}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 ${
                errors.panCard ? 'border-red-500' : 'border-stone-300'
              }`}
              placeholder="ABCDE1234F"
              maxLength={10}
            />
          </div>
          {errors.panCard && <p className="text-red-500 text-sm mt-1">{errors.panCard}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-2">Aadhaar Card Number *</label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-400" />
            <input
              type="text"
              value={profile.aadhaarCard}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
                handleInputChange('aadhaarCard', value);
              }}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 ${
                errors.aadhaarCard ? 'border-red-500' : 'border-stone-300'
              }`}
              placeholder="1234 5678 9012"
              maxLength={14}
            />
          </div>
          {errors.aadhaarCard && <p className="text-red-500 text-sm mt-1">{errors.aadhaarCard}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-stone-700 mb-2">Current Address *</label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-5 w-5 text-stone-400" />
          <textarea
            value={profile.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 resize-none ${
              errors.address ? 'border-red-500' : 'border-stone-300'
            }`}
            rows={3}
            placeholder="Enter your complete address"
          />
        </div>
        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-2">Occupation *</label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-400" />
            <input
              type="text"
              value={profile.occupation}
              onChange={(e) => handleInputChange('occupation', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 ${
                errors.occupation ? 'border-red-500' : 'border-stone-300'
              }`}
              placeholder="Your profession"
            />
          </div>
          {errors.occupation && <p className="text-red-500 text-sm mt-1">{errors.occupation}</p>}
        </div>

        {userType === 'borrower' && (
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-2">Monthly Income *</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-400" />
              <select
                value={profile.monthlyIncome}
                onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 ${
                  errors.monthlyIncome ? 'border-red-500' : 'border-stone-300'
                }`}
              >
                <option value="">Select Income Range</option>
                <option value="15000-25000">₹15,000 - ₹25,000</option>
                <option value="25000-50000">₹25,000 - ₹50,000</option>
                <option value="50000-100000">₹50,000 - ₹1,00,000</option>
                <option value="100000-200000">₹1,00,000 - ₹2,00,000</option>
                <option value="200000+">₹2,00,000+</option>
              </select>
            </div>
            {errors.monthlyIncome && <p className="text-red-500 text-sm mt-1">{errors.monthlyIncome}</p>}
          </div>
        )}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-stone-800 mb-6">Lender Qualification</h2>
      
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
        <h3 className="font-semibold text-amber-800 mb-2">Minimum Net Worth Requirement</h3>
        <p className="text-amber-700 text-sm">As a lender, you need to demonstrate minimum financial capacity to ensure responsible lending.</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-stone-700 mb-2">Net Worth *</label>
        <div className="relative">
          <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-400" />
          <select
            value={profile.netWorth}
            onChange={(e) => handleInputChange('netWorth', e.target.value)}
            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 ${
              errors.netWorth ? 'border-red-500' : 'border-stone-300'
            }`}
          >
            <option value="">Select Net Worth Range</option>
            <option value="500000-1000000">₹5,00,000 - ₹10,00,000</option>
            <option value="1000000-2500000">₹10,00,000 - ₹25,00,000</option>
            <option value="2500000-5000000">₹25,00,000 - ₹50,00,000</option>
            <option value="5000000+">₹50,00,000+</option>
          </select>
        </div>
        {errors.netWorth && <p className="text-red-500 text-sm mt-1">{errors.netWorth}</p>}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-semibold text-blue-800 mb-2">Required Documentation</h3>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• Chartered Accountant certificate for net worth verification</li>
          <li>• Bank statements (last 6 months)</li>
          <li>• Income tax returns (last 2 years)</li>
          <li>• Investment portfolio details</li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-stone-800 mb-2">Create Your Profile</h1>
          <p className="text-stone-600">
            {userType === 'lender' ? 'Set up your lender account' : 'Set up your borrower account'}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
              <React.Fragment key={step}>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                    step <= currentStep
                      ? 'bg-amber-500 text-white'
                      : 'bg-stone-200 text-stone-400'
                  }`}
                >
                  {step}
                </div>
                {step < totalSteps && (
                  <div
                    className={`w-16 h-1 transition-all duration-300 ${
                      step < currentStep ? 'bg-amber-500' : 'bg-stone-200'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
          <p className="text-center text-stone-500">Step {currentStep} of {totalSteps}</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden">
          <div className="p-8">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
          </div>

          {/* Navigation */}
          <div className="bg-stone-50 px-8 py-6 flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                currentStep === 1
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  : 'bg-stone-600 text-white hover:bg-stone-700'
              }`}
            >
              Previous
            </button>
            
            <button
              onClick={handleNext}
              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300"
            >
              {currentStep === totalSteps ? 'Complete Profile' : 'Next Step'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCreation;