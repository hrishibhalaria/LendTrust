import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, Calendar, AlertCircle, CheckCircle, DollarSign } from 'lucide-react';
import { UserProfile } from '../App';

interface LoanApplicationProps {
  userProfile: UserProfile;
  onComplete: () => void;
}

interface LoanDetails {
  amount: number;
  tenure: number;
  purpose: string;
  interestRate: number;
  monthlyEMI: number;
  totalAmount: number;
  riskCategory: string;
}

const LoanApplication: React.FC<LoanApplicationProps> = ({ userProfile, onComplete }) => {
  const [loanDetails, setLoanDetails] = useState<LoanDetails>({
    amount: 50000,
    tenure: 3,
    purpose: '',
    interestRate: 0,
    monthlyEMI: 0,
    totalAmount: 0,
    riskCategory: ''
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [applicationStatus, setApplicationStatus] = useState<'draft' | 'calculating' | 'submitted'>('draft');

  const steps = ['Loan Details', 'Review & Calculate', 'Submit Application'];

  // Risk calculation algorithm
  const calculateRisk = () => {
    let riskScore = 0;
    
    // CIBIL Score impact (40% weightage)
    if (userProfile.cibilScore) {
      if (userProfile.cibilScore >= 800) riskScore += 40;
      else if (userProfile.cibilScore >= 750) riskScore += 35;
      else if (userProfile.cibilScore >= 700) riskScore += 30;
      else if (userProfile.cibilScore >= 650) riskScore += 20;
      else riskScore += 10;
    } else {
      riskScore += 15; // No CIBIL score
    }
    
    // Income impact (30% weightage)
    const incomeRange = userProfile.monthlyIncome;
    if (incomeRange === '200000+') riskScore += 30;
    else if (incomeRange === '100000-200000') riskScore += 25;
    else if (incomeRange === '50000-100000') riskScore += 20;
    else if (incomeRange === '25000-50000') riskScore += 15;
    else riskScore += 10;
    
    // Loan amount to income ratio (20% weightage)
    const monthlyIncome = parseInt(incomeRange?.split('-')[0] || '25000');
    const loanToIncomeRatio = (loanDetails.amount / loanDetails.tenure) / monthlyIncome;
    
    if (loanToIncomeRatio <= 0.3) riskScore += 20;
    else if (loanToIncomeRatio <= 0.5) riskScore += 15;
    else if (loanToIncomeRatio <= 0.7) riskScore += 10;
    else riskScore += 5;
    
    // Loan tenure impact (10% weightage)
    if (loanDetails.tenure <= 3) riskScore += 10;
    else if (loanDetails.tenure <= 6) riskScore += 8;
    else riskScore += 5;
    
    return riskScore;
  };

  const getRiskCategory = (score: number): { category: string; color: string; interestRate: number } => {
    if (score >= 90) return { category: 'A+ (Excellent)', color: 'green', interestRate: 12 };
    if (score >= 80) return { category: 'A (Very Good)', color: 'blue', interestRate: 15 };
    if (score >= 70) return { category: 'B+ (Good)', color: 'amber', interestRate: 18 };
    if (score >= 60) return { category: 'B (Fair)', color: 'orange', interestRate: 22 };
    return { category: 'C (High Risk)', color: 'red', interestRate: 28 };
  };

  // Calculate loan details when amount or tenure changes
  useEffect(() => {
    const riskScore = calculateRisk();
    const riskInfo = getRiskCategory(riskScore);
    
    // Platform takes 2-4% based on risk
    const platformFee = riskInfo.interestRate >= 20 ? 4 : 2;
    const lenderRate = riskInfo.interestRate - platformFee;
    
    const monthlyRate = riskInfo.interestRate / 100 / 12;
    const emi = loanDetails.amount * monthlyRate * Math.pow(1 + monthlyRate, loanDetails.tenure) / 
               (Math.pow(1 + monthlyRate, loanDetails.tenure) - 1);
    
    setLoanDetails(prev => ({
      ...prev,
      interestRate: riskInfo.interestRate,
      monthlyEMI: Math.round(emi),
      totalAmount: Math.round(emi * loanDetails.tenure),
      riskCategory: riskInfo.category
    }));
  }, [loanDetails.amount, loanDetails.tenure, userProfile]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setApplicationStatus('calculating');
      // Simulate application submission
      setTimeout(() => {
        setApplicationStatus('submitted');
        setTimeout(() => onComplete(), 2000);
      }, 3000);
    }
  };

  const renderLoanDetails = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Calculator className="h-16 w-16 text-amber-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-stone-800 mb-2">Loan Application</h2>
        <p className="text-stone-600">Configure your loan requirements</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-3">
            Loan Amount (₹)
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-400" />
            <input
              type="range"
              min="1000"
              max="500000"
              step="1000"
              value={loanDetails.amount}
              onChange={(e) => setLoanDetails(prev => ({ ...prev, amount: parseInt(e.target.value) }))}
              className="w-full mb-2"
            />
            <div className="text-center">
              <span className="text-2xl font-bold text-amber-600">₹{loanDetails.amount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-3">
            Repayment Tenure (Months)
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[1, 3, 6].map((months) => (
              <button
                key={months}
                onClick={() => setLoanDetails(prev => ({ ...prev, tenure: months }))}
                className={`py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                  loanDetails.tenure === months
                    ? 'bg-amber-500 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {months} Month{months > 1 ? 's' : ''}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-stone-700 mb-3">
          Loan Purpose *
        </label>
        <select
          value={loanDetails.purpose}
          onChange={(e) => setLoanDetails(prev => ({ ...prev, purpose: e.target.value }))}
          className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
        >
          <option value="">Select loan purpose</option>
          <option value="personal">Personal Expenses</option>
          <option value="medical">Medical Emergency</option>
          <option value="education">Education</option>
          <option value="business">Business/Startup</option>
          <option value="debt">Debt Consolidation</option>
          <option value="home">Home Improvement</option>
          <option value="travel">Travel</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Real-time calculation display */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
        <h3 className="font-bold text-stone-800 mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-amber-600" />
          Live Interest Rate Calculation
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600">{loanDetails.interestRate}%</div>
            <div className="text-sm text-stone-600">Annual Interest Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-stone-800">₹{loanDetails.monthlyEMI.toLocaleString()}</div>
            <div className="text-sm text-stone-600">Monthly EMI</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-stone-800">₹{loanDetails.totalAmount.toLocaleString()}</div>
            <div className="text-sm text-stone-600">Total Amount</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReviewCalculation = () => {
    const riskScore = calculateRisk();
    const riskInfo = getRiskCategory(riskScore);
    
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-stone-800 mb-2">Review Your Loan</h2>
          <p className="text-stone-600">Verify all details before submitting</p>
        </div>

        {/* Risk Assessment */}
        <div className={`border-2 rounded-2xl p-6 ${
          riskInfo.color === 'green' ? 'border-green-200 bg-green-50' :
          riskInfo.color === 'blue' ? 'border-blue-200 bg-blue-50' :
          riskInfo.color === 'amber' ? 'border-amber-200 bg-amber-50' :
          riskInfo.color === 'orange' ? 'border-orange-200 bg-orange-50' :
          'border-red-200 bg-red-50'
        }`}>
          <h3 className="font-bold text-stone-800 mb-2">Your Risk Category</h3>
          <div className="flex items-center justify-between">
            <div>
              <div className={`text-2xl font-bold ${
                riskInfo.color === 'green' ? 'text-green-700' :
                riskInfo.color === 'blue' ? 'text-blue-700' :
                riskInfo.color === 'amber' ? 'text-amber-700' :
                riskInfo.color === 'orange' ? 'text-orange-700' :
                'text-red-700'
              }`}>
                {loanDetails.riskCategory}
              </div>
              <div className="text-sm text-stone-600">Risk Score: {riskScore}/100</div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-stone-800">{loanDetails.interestRate}%</div>
              <div className="text-sm text-stone-600">Annual Rate</div>
            </div>
          </div>
        </div>

        {/* Loan Summary */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6">
          <h3 className="font-bold text-stone-800 mb-4">Loan Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-stone-600">Loan Amount</span>
              <span className="font-semibold">₹{loanDetails.amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-600">Tenure</span>
              <span className="font-semibold">{loanDetails.tenure} Month{loanDetails.tenure > 1 ? 's' : ''}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-600">Purpose</span>
              <span className="font-semibold capitalize">{loanDetails.purpose}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-600">Interest Rate</span>
              <span className="font-semibold">{loanDetails.interestRate}% p.a.</span>
            </div>
            <div className="border-t pt-3 flex justify-between text-lg font-bold">
              <span>Monthly EMI</span>
              <span className="text-amber-600">₹{loanDetails.monthlyEMI.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total Payable</span>
              <span className="text-stone-800">₹{loanDetails.totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Important Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-800">Important</h4>
              <p className="text-blue-700 text-sm mt-1">
                Your application will be visible to verified lenders. Multiple lenders may contribute 
                to fund your loan request. Auto-pay will be set up for hassle-free repayments.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSubmissionStatus = () => (
    <div className="text-center py-12">
      {applicationStatus === 'calculating' ? (
        <>
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-amber-500 border-t-transparent mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-stone-800 mb-4">Processing Your Application</h2>
          <p className="text-stone-600">
            We're matching you with the best lenders for your requirements...
          </p>
        </>
      ) : (
        <>
          <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-stone-800 mb-4">Application Submitted!</h2>
          <p className="text-stone-600 mb-8 text-lg">
            Your loan request has been published to verified lenders. You'll receive notifications as lenders show interest.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 max-w-md mx-auto">
            <h3 className="font-semibold text-green-800 mb-2">What's Next?</h3>
            <ul className="text-green-700 text-sm space-y-2 text-left">
              <li>• Lenders will review your profile</li>
              <li>• You'll get funding offers within 24 hours</li>
              <li>• Choose the best lender(s) for your loan</li>
              <li>• Funds will be transferred to your account</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            {steps.map((step, index) => (
              <React.Fragment key={step}>
                <div
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    index <= currentStep
                      ? 'bg-amber-500 text-white'
                      : 'bg-stone-200 text-stone-400'
                  }`}
                >
                  {step}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 h-1 transition-all duration-300 ${
                      index < currentStep ? 'bg-amber-500' : 'bg-stone-200'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
          <p className="text-center text-stone-500">Step {currentStep + 1} of {steps.length}</p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden">
          <div className="p-8">
            {currentStep === 0 && renderLoanDetails()}
            {currentStep === 1 && renderReviewCalculation()}
            {currentStep === 2 && renderSubmissionStatus()}
          </div>

          {/* Navigation */}
          {currentStep < 2 && applicationStatus === 'draft' && (
            <div className="bg-stone-50 px-8 py-6">
              <div className="flex justify-between">
                <button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    currentStep === 0
                      ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                      : 'bg-stone-600 text-white hover:bg-stone-700'
                  }`}
                >
                  Previous
                </button>
                
                <button
                  onClick={handleNext}
                  disabled={!loanDetails.purpose && currentStep === 0}
                  className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    !loanDetails.purpose && currentStep === 0
                      ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700'
                  }`}
                >
                  {currentStep === 1 ? 'Submit Application' : 'Next Step'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanApplication;