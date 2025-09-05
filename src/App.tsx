import React, { useState } from 'react';
import TermsAndConditions from './components/TermsAndConditions';
import UserTypeSelection from './components/UserTypeSelection';
import ProfileCreation from './components/ProfileCreation';
import DocumentVerification from './components/DocumentVerification';
import LoanApplication from './components/LoanApplication';
import LenderDashboard from './components/LenderDashboard';
import BorrowerDashboard from './components/BorrowerDashboard';

export type UserType = 'borrower' | 'lender' | null;
export type AppStep = 'terms' | 'user-type' | 'profile' | 'documents' | 'loan-application' | 'dashboard';

export interface UserProfile {
  fullName: string;
  gender: string;
  phoneNumber: string;
  email: string;
  panCard: string;
  aadhaarCard: string;
  address: string;
  occupation: string;
  monthlyIncome?: string;
  cibilScore?: number;
  netWorth?: string; // for lenders
}

function App() {
  const [currentStep, setCurrentStep] = useState<AppStep>('terms');
  const [userType, setUserType] = useState<UserType>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    fullName: '',
    gender: '',
    phoneNumber: '',
    email: '',
    panCard: '',
    aadhaarCard: '',
    address: '',
    occupation: '',
    monthlyIncome: '',
    cibilScore: 0,
    netWorth: ''
  });

  const handleTermsAccept = () => {
    setCurrentStep('user-type');
  };

  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type);
    setCurrentStep('profile');
  };

  const handleProfileComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setCurrentStep('documents');
  };

  const handleDocumentsComplete = () => {
    if (userType === 'borrower') {
      setCurrentStep('loan-application');
    } else {
      setCurrentStep('dashboard');
    }
  };

  const handleLoanApplicationComplete = () => {
    setCurrentStep('dashboard');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'terms':
        return <TermsAndConditions onAccept={handleTermsAccept} />;
      case 'user-type':
        return <UserTypeSelection onSelect={handleUserTypeSelect} />;
      case 'profile':
        return (
          <ProfileCreation
            userType={userType!}
            onComplete={handleProfileComplete}
            initialData={userProfile}
          />
        );
      case 'documents':
        return (
          <DocumentVerification
            userType={userType!}
            onComplete={handleDocumentsComplete}
          />
        );
      case 'loan-application':
        return (
          <LoanApplication
            userProfile={userProfile}
            onComplete={handleLoanApplicationComplete}
          />
        );
      case 'dashboard':
        return userType === 'lender' ? (
          <LenderDashboard userProfile={userProfile} />
        ) : (
          <BorrowerDashboard userProfile={userProfile} />
        );
      default:
        return <TermsAndConditions onAccept={handleTermsAccept} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
      {renderCurrentStep()}
    </div>
  );
}

export default App;