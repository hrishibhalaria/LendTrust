import React, { useState } from 'react';
import { Shield, CheckCircle, Award, Lock, Users, TrendingUp } from 'lucide-react';

interface TermsAndConditionsProps {
  onAccept: () => void;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ onAccept }) => {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);

  const canProceed = agreedToTerms && agreedToPrivacy;

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Trust Indicators */}
      <div className="bg-gradient-to-r from-amber-50 to-stone-100 border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-stone-800 mb-4">LendTrust</h1>
            <p className="text-xl text-stone-600 mb-6">India's Most Trusted Peer-to-Peer Lending Platform</p>
            
            {/* Trust Badges */}
            <div className="flex justify-center items-center gap-8 mb-6">
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-green-600" />
                <span className="text-sm font-medium text-stone-700">RBI Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-6 w-6 text-blue-600" />
                <span className="text-sm font-medium text-stone-700">256-bit SSL Secured</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-6 w-6 text-amber-600" />
                <span className="text-sm font-medium text-stone-700">ISO 27001 Certified</span>
              </div>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-8 w-8 text-stone-600" />
                </div>
                <div className="text-2xl font-bold text-stone-800">10,000+</div>
                <div className="text-sm text-stone-600">Active Users</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-stone-800">₹50 Cr+</div>
                <div className="text-sm text-stone-600">Loans Facilitated</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-stone-800">98.5%</div>
                <div className="text-sm text-stone-600">Repayment Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terms Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white border border-stone-200 rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-stone-50 px-8 py-6 border-b border-stone-200">
            <h2 className="text-2xl font-bold text-stone-800">Terms and Conditions</h2>
            <p className="text-stone-600 mt-2">Please read carefully before proceeding</p>
          </div>
          
          <div className="px-8 py-8 max-h-96 overflow-y-auto">
            <div className="space-y-6 text-stone-700 leading-relaxed">
              <section>
                <h3 className="text-lg font-semibold text-stone-800 mb-3">1. Platform Overview</h3>
                <p>
                  LendTrust is a peer-to-peer lending platform that connects individual lenders with borrowers. 
                  We facilitate secure, transparent, and regulated lending transactions while ensuring compliance 
                  with all RBI guidelines and regulations.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-stone-800 mb-3">2. Eligibility Criteria</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You must be at least 18 years old and a resident of India</li>
                  <li>Valid government-issued identification documents required</li>
                  <li>Verified bank account and contact information mandatory</li>
                  <li>Compliance with KYC and anti-money laundering requirements</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-stone-800 mb-3">3. Loan Terms</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Loan amounts range from ₹1,000 to ₹5,00,000</li>
                  <li>Repayment periods: 1, 3, or 6 months</li>
                  <li>Interest rates determined by risk assessment algorithm</li>
                  <li>Platform fee applicable on all transactions</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-stone-800 mb-3">4. Risk Disclosure</h3>
                <p>
                  Peer-to-peer lending involves risk of loss. Past performance does not guarantee future returns. 
                  Lenders should carefully evaluate borrower profiles and only lend amounts they can afford to lose. 
                  LendTrust does not guarantee loan repayment.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-stone-800 mb-3">5. Data Security & Privacy</h3>
                <p>
                  We employ industry-leading security measures to protect your personal and financial information. 
                  Your data will be processed in accordance with our Privacy Policy and applicable data protection laws.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-stone-800 mb-3">6. Dispute Resolution</h3>
                <p>
                  Any disputes arising from transactions will be resolved through our internal grievance mechanism 
                  followed by applicable legal procedures as per Indian law.
                </p>
              </section>
            </div>
          </div>

          {/* Agreement Section */}
          <div className="bg-stone-50 px-8 py-6 border-t border-stone-200">
            <div className="space-y-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 h-5 w-5 text-amber-600 border-stone-300 rounded focus:ring-amber-500"
                />
                <span className="text-stone-700">
                  I have read and agree to the <strong>Terms and Conditions</strong> and understand 
                  the risks involved in peer-to-peer lending.
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToPrivacy}
                  onChange={(e) => setAgreedToPrivacy(e.target.checked)}
                  className="mt-1 h-5 w-5 text-amber-600 border-stone-300 rounded focus:ring-amber-500"
                />
                <span className="text-stone-700">
                  I consent to the collection and processing of my personal data as outlined 
                  in the <strong>Privacy Policy</strong>.
                </span>
              </label>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={onAccept}
                disabled={!canProceed}
                className={`px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                  canProceed
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                    : 'bg-stone-300 text-stone-500 cursor-not-allowed'
                }`}
              >
                Accept and Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;