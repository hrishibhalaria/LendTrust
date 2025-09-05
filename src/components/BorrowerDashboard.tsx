import React, { useState } from 'react';
import { CreditCard, Clock, CheckCircle, AlertCircle, Calendar, TrendingUp, DollarSign, Users } from 'lucide-react';
import { UserProfile } from '../App';

interface BorrowerDashboardProps {
  userProfile: UserProfile;
}

interface LoanStatus {
  id: string;
  amount: number;
  purpose: string;
  interestRate: number;
  tenure: number;
  status: 'active' | 'pending' | 'funded' | 'completed';
  monthlyEMI: number;
  totalAmount: number;
  paidAmount: number;
  nextPayment: string;
  lendersCount: number;
  fundingProgress: number;
}

const BorrowerDashboard: React.FC<BorrowerDashboardProps> = ({ userProfile }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'loans' | 'payments'>('overview');

  // Sample loan data
  const loans: LoanStatus[] = [
    {
      id: 'LN001',
      amount: 75000,
      purpose: 'Medical Emergency',
      interestRate: 15,
      tenure: 6,
      status: 'active',
      monthlyEMI: 13500,
      totalAmount: 81000,
      paidAmount: 27000,
      nextPayment: '2024-02-15',
      lendersCount: 3,
      fundingProgress: 100
    },
    {
      id: 'LN002',
      amount: 50000,
      purpose: 'Business Expansion',
      interestRate: 18,
      tenure: 12,
      status: 'pending',
      monthlyEMI: 4800,
      totalAmount: 57600,
      paidAmount: 0,
      nextPayment: '2024-02-10',
      lendersCount: 0,
      fundingProgress: 35
    }
  ];

  const activeLoan = loans.find(loan => loan.status === 'active');
  const totalBorrowed = loans.reduce((sum, loan) => sum + loan.amount, 0);
  const totalPaid = loans.reduce((sum, loan) => sum + loan.paidAmount, 0);

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white border border-stone-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-stone-500">Total Borrowed</div>
              <div className="text-2xl font-bold text-blue-600">₹{totalBorrowed.toLocaleString()}</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-stone-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <div className="text-sm text-stone-500">Total Repaid</div>
              <div className="text-2xl font-bold text-green-600">₹{totalPaid.toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <div className="text-sm text-stone-500">CIBIL Score</div>
              <div className="text-2xl font-bold text-amber-600">{userProfile.cibilScore || 750}</div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <div className="text-sm text-stone-500">Active Lenders</div>
              <div className="text-2xl font-bold text-purple-600">{activeLoan?.lendersCount || 0}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Loan Card */}
      {activeLoan && (
        <div className="bg-white border border-stone-200 rounded-2xl p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-stone-800 mb-2">Active Loan - {activeLoan.id}</h3>
              <p className="text-stone-600">{activeLoan.purpose}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-stone-800">₹{activeLoan.amount.toLocaleString()}</div>
              <div className="text-sm text-stone-500">{activeLoan.interestRate}% interest</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-semibold text-stone-800 mb-3">Repayment Progress</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-600">Amount Paid</span>
                  <span className="font-semibold">₹{activeLoan.paidAmount.toLocaleString()}</span>
                </div>
                <div className="w-full bg-stone-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${(activeLoan.paidAmount / activeLoan.totalAmount) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-600">Remaining</span>
                  <span className="font-semibold">₹{(activeLoan.totalAmount - activeLoan.paidAmount).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-stone-800 mb-3">Next Payment</h4>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="h-5 w-5 text-amber-600" />
                  <span className="font-semibold text-amber-800">{activeLoan.nextPayment}</span>
                </div>
                <div className="text-2xl font-bold text-stone-800">₹{activeLoan.monthlyEMI.toLocaleString()}</div>
                <div className="text-sm text-stone-600">Monthly EMI</div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300">
              Pay Now
            </button>
            <button className="bg-stone-100 text-stone-600 px-6 py-3 rounded-xl font-semibold hover:bg-stone-200 transition-colors duration-200">
              View Details
            </button>
          </div>
        </div>
      )}

      {/* Pending Applications */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-stone-800 mb-4">Recent Applications</h3>
        {loans.filter(loan => loan.status === 'pending').map(loan => (
          <div key={loan.id} className="border border-stone-200 rounded-xl p-4 mb-4 last:mb-0">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-stone-800">{loan.purpose}</h4>
                <p className="text-stone-600 text-sm">Loan ID: {loan.id}</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-stone-800">₹{loan.amount.toLocaleString()}</div>
                <div className="text-sm text-amber-600">Seeking funding</div>
              </div>
            </div>
            
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-stone-600">Funding Progress</span>
                <span className="font-semibold">{loan.fundingProgress}%</span>
              </div>
              <div className="w-full bg-stone-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-amber-500 to-amber-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${loan.fundingProgress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-stone-500">
                <Clock className="h-4 w-4" />
                Expected funding in 2-3 days
              </div>
              <button className="text-amber-600 text-sm font-semibold hover:text-amber-700">
                View Lender Interest →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLoans = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-stone-800">My Loans</h2>
        <button className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300">
          Apply for New Loan
        </button>
      </div>

      {loans.map(loan => (
        <div key={loan.id} className="bg-white border border-stone-200 rounded-2xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-bold text-stone-800 text-lg">{loan.id}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  loan.status === 'active' ? 'bg-green-100 text-green-700' :
                  loan.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                  loan.status === 'funded' ? 'bg-blue-100 text-blue-700' :
                  'bg-stone-100 text-stone-700'
                }`}>
                  {loan.status === 'active' ? 'Active' : 
                   loan.status === 'pending' ? 'Seeking Funding' :
                   loan.status === 'funded' ? 'Funded' : 'Completed'}
                </span>
              </div>
              <p className="text-stone-600">{loan.purpose}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-stone-800">₹{loan.amount.toLocaleString()}</div>
              <div className="text-sm text-stone-500">{loan.interestRate}% for {loan.tenure} months</div>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-stone-500 mb-1">Monthly EMI</div>
              <div className="font-semibold text-stone-800">₹{loan.monthlyEMI.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-sm text-stone-500 mb-1">Total Amount</div>
              <div className="font-semibold text-stone-800">₹{loan.totalAmount.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-sm text-stone-500 mb-1">Paid So Far</div>
              <div className="font-semibold text-green-600">₹{loan.paidAmount.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-sm text-stone-500 mb-1">Lenders</div>
              <div className="font-semibold text-blue-600">{loan.lendersCount}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPayments = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-stone-800">Payment History</h2>
      <div className="bg-white border border-stone-200 rounded-2xl p-6">
        <div className="text-center py-12">
          <CreditCard className="h-16 w-16 text-stone-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-stone-600 mb-2">Payment History</h3>
          <p className="text-stone-500">Your payment transactions will appear here</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
      {/* Header */}
      <div className="bg-white border-b border-stone-200 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-stone-800">Hi {userProfile.fullName.split(' ')[0]}!</h1>
              <p className="text-stone-600 mt-1">Track your loans and manage repayments</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-stone-500">Borrower ID</div>
              <div className="font-semibold text-stone-700">BT{String(Math.random()).slice(2, 8)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-stone-200 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex space-x-8">
            {[
              { key: 'overview', label: 'Overview', icon: TrendingUp },
              { key: 'loans', label: 'My Loans', icon: CreditCard },
              { key: 'payments', label: 'Payments', icon: Calendar }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={`flex items-center gap-2 py-4 px-2 border-b-2 font-semibold transition-colors duration-200 ${
                  activeTab === key
                    ? 'border-amber-500 text-amber-600'
                    : 'border-transparent text-stone-500 hover:text-stone-700'
                }`}
              >
                <Icon className="h-5 w-5" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'loans' && renderLoans()}
        {activeTab === 'payments' && renderPayments()}
      </div>
    </div>
  );
};

export default BorrowerDashboard;