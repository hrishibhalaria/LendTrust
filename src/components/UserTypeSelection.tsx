import React from 'react';
import { ArrowRight, TrendingUp, HandHeart, Shield, Users } from 'lucide-react';
import { UserType } from '../App';

interface UserTypeSelectionProps {
  onSelect: (type: UserType) => void;
}

const UserTypeSelection: React.FC<UserTypeSelectionProps> = ({ onSelect }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-stone-800 mb-4">Welcome to LendTrust</h1>
          <p className="text-xl text-stone-600 mb-8">Choose your journey with India's most trusted P2P platform</p>
          
          {/* Trust indicators */}
          <div className="flex justify-center items-center gap-8 mb-12">
            <div className="flex items-center gap-2 text-green-600">
              <Shield className="h-5 w-5" />
              <span className="text-sm font-medium">Bank-grade Security</span>
            </div>
            <div className="flex items-center gap-2 text-blue-600">
              <Users className="h-5 w-5" />
              <span className="text-sm font-medium">10,000+ Happy Users</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Lender Card */}
          <div 
            onClick={() => onSelect('lender')}
            className="group bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden cursor-pointer transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 pb-6">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800 mb-2">I Want to Lend</h2>
              <p className="text-stone-600 text-lg">Earn attractive returns by lending to verified borrowers</p>
            </div>
            
            <div className="p-8 pt-6">
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-stone-700">Earn 12-24% annual returns</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-stone-700">Choose your risk level</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-stone-700">View detailed borrower profiles</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-stone-700">Diversify across multiple loans</span>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-xl p-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-700">₹10,000</div>
                  <div className="text-sm text-green-600">Minimum investment</div>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 group-hover:from-green-600 group-hover:to-green-700 transition-all duration-300">
                Start Lending
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Borrower Card */}
          <div 
            onClick={() => onSelect('borrower')}
            className="group bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden cursor-pointer transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="bg-gradient-to-br from-amber-50 to-orange-100 p-8 pb-6">
              <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <HandHeart className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800 mb-2">I Need a Loan</h2>
              <p className="text-stone-600 text-lg">Get quick access to funds with competitive interest rates</p>
            </div>
            
            <div className="p-8 pt-6">
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-stone-700">Quick approval in 24 hours</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-stone-700">Competitive interest rates</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-stone-700">Flexible repayment options</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-stone-700">No hidden charges</span>
                </div>
              </div>
              
              <div className="bg-amber-50 rounded-xl p-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-700">₹1K - ₹5L</div>
                  <div className="text-sm text-amber-600">Loan amount range</div>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 group-hover:from-amber-600 group-hover:to-amber-700 transition-all duration-300">
                Apply for Loan
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-stone-600 mb-4">
            Join thousands of users who trust LendTrust for their financial needs
          </p>
          <div className="flex justify-center items-center gap-6 text-sm text-stone-500">
            <span>🏆 Best P2P Platform 2024</span>
            <span>🔒 RBI Compliant</span>
            <span>⭐ 4.8/5 User Rating</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelection;