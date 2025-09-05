import React, { useState } from 'react';
import { Search, Filter, TrendingUp, Users, DollarSign, Clock, Eye, CheckCircle, AlertCircle } from 'lucide-react';
import { UserProfile } from '../App';

interface LenderDashboardProps {
  userProfile: UserProfile;
}

interface BorrowerRequest {
  id: string;
  name: string;
  amount: number;
  purpose: string;
  tenure: number;
  interestRate: number;
  riskCategory: string;
  cibilScore: number;
  monthlyIncome: string;
  occupation: string;
  requestedAt: string;
  fundingProgress: number;
  verified: boolean;
}

const LenderDashboard: React.FC<LenderDashboardProps> = ({ userProfile }) => {
  const [activeTab, setActiveTab] = useState<'browse' | 'portfolio' | 'earnings'>('browse');
  const [selectedRisk, setSelectedRisk] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample borrower requests
  const borrowerRequests: BorrowerRequest[] = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      amount: 75000,
      purpose: 'Medical Emergency',
      tenure: 6,
      interestRate: 15,
      riskCategory: 'A (Very Good)',
      cibilScore: 780,
      monthlyIncome: '50000-100000',
      occupation: 'Software Engineer',
      requestedAt: '2 hours ago',
      fundingProgress: 60,
      verified: true
    },
    {
      id: '2', 
      name: 'Priya Sharma',
      amount: 150000,
      purpose: 'Business Expansion',
      tenure: 12,
      interestRate: 18,
      riskCategory: 'B+ (Good)',
      cibilScore: 720,
      monthlyIncome: '100000-200000',
      occupation: 'Business Owner',
      requestedAt: '5 hours ago',
      fundingProgress: 25,
      verified: true
    },
    {
      id: '3',
      name: 'Amit Patel',
      amount: 25000,
      purpose: 'Education',
      tenure: 3,
      interestRate: 12,
      riskCategory: 'A+ (Excellent)',
      cibilScore: 820,
      monthlyIncome: '25000-50000',
      occupation: 'Teacher',
      requestedAt: '1 day ago',
      fundingProgress: 90,
      verified: true
    }
  ];

  const filteredRequests = borrowerRequests.filter(request => {
    const matchesSearch = request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = selectedRisk === 'all' || request.riskCategory.includes(selectedRisk);
    return matchesSearch && matchesRisk;
  });

  const renderBrowseLoans = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-stone-800">Browse Loan Requests</h2>
          <p className="text-stone-600">Find the right borrowers for your investment</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">₹2,45,000</div>
          <div className="text-sm text-stone-600">Available to Lend</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-400" />
          <input
            type="text"
            placeholder="Search by name or purpose..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          />
        </div>
        <select
          value={selectedRisk}
          onChange={(e) => setSelectedRisk(e.target.value)}
          className="px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
        >
          <option value="all">All Risk Categories</option>
          <option value="A+">A+ (Excellent)</option>
          <option value="A">A (Very Good)</option>
          <option value="B+">B+ (Good)</option>
          <option value="B">B (Fair)</option>
          <option value="C">C (High Risk)</option>
        </select>
      </div>

      {/* Loan Requests Grid */}
      <div className="grid gap-6">
        {filteredRequests.map((request) => (
          <div key={request.id} className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {request.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-800 text-lg">{request.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-stone-600 text-sm">{request.occupation}</span>
                      {request.verified && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-stone-800">₹{request.amount.toLocaleString()}</div>
                  <div className="text-sm text-stone-600">{request.tenure} months</div>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div>
                  <div className="text-sm text-stone-500 mb-1">Purpose</div>
                  <div className="font-semibold text-stone-700">{request.purpose}</div>
                </div>
                <div>
                  <div className="text-sm text-stone-500 mb-1">Interest Rate</div>
                  <div className="font-semibold text-green-600">{request.interestRate}% p.a.</div>
                </div>
                <div>
                  <div className="text-sm text-stone-500 mb-1">CIBIL Score</div>
                  <div className="font-semibold text-blue-600">{request.cibilScore}</div>
                </div>
                <div>
                  <div className="text-sm text-stone-500 mb-1">Monthly Income</div>
                  <div className="font-semibold text-stone-700">₹{request.monthlyIncome}</div>
                </div>
              </div>

              {/* Risk Category */}
              <div className="flex items-center justify-between mb-4">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  request.riskCategory.includes('A+') ? 'bg-green-100 text-green-700' :
                  request.riskCategory.includes('A') ? 'bg-blue-100 text-blue-700' :
                  request.riskCategory.includes('B+') ? 'bg-amber-100 text-amber-700' :
                  request.riskCategory.includes('B') ? 'bg-orange-100 text-orange-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  Risk: {request.riskCategory}
                </div>
                <div className="flex items-center gap-2 text-sm text-stone-500">
                  <Clock className="h-4 w-4" />
                  {request.requestedAt}
                </div>
              </div>

              {/* Funding Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-stone-600">Funding Progress</span>
                  <span className="font-semibold">{request.fundingProgress}% funded</span>
                </div>
                <div className="w-full bg-stone-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${request.fundingProgress}%` }}
                  ></div>
                </div>
                <div className="text-sm text-stone-500 mt-1">
                  ₹{Math.round((request.amount * request.fundingProgress) / 100).toLocaleString()} of ₹{request.amount.toLocaleString()} funded
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 bg-stone-100 text-stone-600 py-3 px-6 rounded-xl font-semibold hover:bg-stone-200 transition-colors duration-200 flex items-center justify-center gap-2">
                  <Eye className="h-4 w-4" />
                  View Profile
                </button>
                <button className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300">
                  Fund This Loan
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPortfolio = () => (
    <div className="space-y-6">
      <div className="text-center py-12">
        <Users className="h-16 w-16 text-stone-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-stone-600 mb-2">Your Lending Portfolio</h3>
        <p className="text-stone-500">Active loans and investment history will appear here</p>
      </div>
    </div>
  );

  const renderEarnings = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white border border-stone-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <div className="text-sm text-stone-500">Total Earnings</div>
              <div className="text-2xl font-bold text-green-600">₹12,500</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-stone-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-stone-500">Average Return</div>
              <div className="text-2xl font-bold text-blue-600">16.8%</div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Users className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <div className="text-sm text-stone-500">Active Loans</div>
              <div className="text-2xl font-bold text-amber-600">8</div>
            </div>
          </div>
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
              <h1 className="text-3xl font-bold text-stone-800">Welcome back, {userProfile.fullName}</h1>
              <p className="text-stone-600 mt-1">Manage your lending portfolio and discover new opportunities</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-stone-500">Lender ID</div>
              <div className="font-semibold text-stone-700">LT{String(Math.random()).slice(2, 8)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-stone-200 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex space-x-8">
            {[
              { key: 'browse', label: 'Browse Loans', icon: Search },
              { key: 'portfolio', label: 'My Portfolio', icon: Users },
              { key: 'earnings', label: 'Earnings', icon: TrendingUp }
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
        {activeTab === 'browse' && renderBrowseLoans()}
        {activeTab === 'portfolio' && renderPortfolio()}
        {activeTab === 'earnings' && renderEarnings()}
      </div>
    </div>
  );
};

export default LenderDashboard;