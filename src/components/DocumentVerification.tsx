import React, { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, FileText, Camera, Shield, Award } from 'lucide-react';
import { UserType } from '../App';

interface DocumentVerificationProps {
  userType: UserType;
  onComplete: () => void;
}

interface DocumentStatus {
  uploaded: boolean;
  verified: boolean;
  error?: string;
}

interface DocumentState {
  [key: string]: DocumentStatus;
}

const DocumentVerification: React.FC<DocumentVerificationProps> = ({ userType, onComplete }) => {
  const [documents, setDocuments] = useState<DocumentState>({});
  const [currentStep, setCurrentStep] = useState(0);

  const borrowerDocuments = [
    { key: 'panCard', name: 'PAN Card', icon: FileText, required: true },
    { key: 'aadhaar', name: 'Aadhaar Card', icon: FileText, required: true },
    { key: 'addressProof', name: 'Address Proof', icon: FileText, required: true },
    { key: 'incomeProof', name: 'Income Proof/Salary Slips', icon: FileText, required: true },
    { key: 'bankStatement', name: 'Bank Statement (6 months)', icon: FileText, required: true },
    { key: 'cibilScore', name: 'CIBIL Score Report', icon: FileText, required: true },
    { key: 'photo', name: 'Recent Photograph', icon: Camera, required: true },
  ];

  const lenderDocuments = [
    { key: 'panCard', name: 'PAN Card', icon: FileText, required: true },
    { key: 'aadhaar', name: 'Aadhaar Card', icon: FileText, required: true },
    { key: 'addressProof', name: 'Address Proof', icon: FileText, required: true },
    { key: 'netWorthCertificate', name: 'CA Certificate (Net Worth)', icon: Award, required: true },
    { key: 'bankStatement', name: 'Bank Statement (6 months)', icon: FileText, required: true },
    { key: 'itr', name: 'Income Tax Returns (2 years)', icon: FileText, required: true },
    { key: 'photo', name: 'Recent Photograph', icon: Camera, required: true },
  ];

  const currentDocuments = userType === 'borrower' ? borrowerDocuments : lenderDocuments;
  const verificationSteps = ['Document Upload', 'AI Verification', 'Manual Review', 'Completion'];

  const handleFileUpload = (documentKey: string, file: File) => {
    // Simulate file upload
    setDocuments(prev => ({
      ...prev,
      [documentKey]: { uploaded: true, verified: false }
    }));

    // Simulate verification process
    setTimeout(() => {
      setDocuments(prev => ({
        ...prev,
        [documentKey]: { uploaded: true, verified: true }
      }));
    }, 2000);
  };

  const getDocumentStatus = (documentKey: string): DocumentStatus => {
    return documents[documentKey] || { uploaded: false, verified: false };
  };

  const allDocumentsVerified = () => {
    return currentDocuments.every(doc => 
      doc.required ? getDocumentStatus(doc.key).verified : true
    );
  };

  const handleNext = () => {
    if (currentStep < verificationSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (allDocumentsVerified()) {
      onComplete();
    }
  };

  const renderDocumentUpload = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Shield className="h-16 w-16 text-amber-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-stone-800 mb-2">Document Verification</h2>
        <p className="text-stone-600">
          Upload your documents for secure verification. All data is encrypted and protected.
        </p>
      </div>

      <div className="grid gap-4">
        {currentDocuments.map((doc) => {
          const status = getDocumentStatus(doc.key);
          const IconComponent = doc.icon;
          
          return (
            <div
              key={doc.key}
              className={`border-2 border-dashed rounded-xl p-6 transition-all duration-300 ${
                status.verified
                  ? 'border-green-300 bg-green-50'
                  : status.uploaded
                  ? 'border-amber-300 bg-amber-50'
                  : 'border-stone-300 hover:border-amber-400 hover:bg-amber-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${
                    status.verified
                      ? 'bg-green-100 text-green-600'
                      : status.uploaded
                      ? 'bg-amber-100 text-amber-600'
                      : 'bg-stone-100 text-stone-600'
                  }`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-800">{doc.name}</h3>
                    {doc.required && (
                      <p className="text-sm text-stone-500">Required document</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {status.verified ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                      <span className="text-sm font-medium">Verified</span>
                    </div>
                  ) : status.uploaded ? (
                    <div className="flex items-center gap-2 text-amber-600">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-amber-600 border-t-transparent"></div>
                      <span className="text-sm font-medium">Verifying...</span>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleFileUpload(doc.key, e.target.files[0]);
                          }
                        }}
                      />
                      <div className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors duration-200 flex items-center gap-2">
                        <Upload className="h-4 w-4" />
                        Upload
                      </div>
                    </label>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upload Guidelines */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-semibold text-blue-800 mb-3">Upload Guidelines</h3>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• Ensure documents are clear and readable</li>
          <li>• Supported formats: PDF, JPG, PNG (max 5MB each)</li>
          <li>• All personal information should be clearly visible</li>
          <li>• Documents should be recent and valid</li>
        </ul>
      </div>
    </div>
  );

  const renderVerificationProcess = () => (
    <div className="text-center py-12">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-amber-500 border-t-transparent mx-auto mb-6"></div>
      <h2 className="text-2xl font-bold text-stone-800 mb-4">Verification in Progress</h2>
      <p className="text-stone-600 mb-8">
        Our AI system is analyzing your documents using OCR and cross-referencing with official databases.
      </p>
      
      <div className="space-y-4 max-w-md mx-auto">
        <div className="flex items-center gap-3 text-green-600">
          <CheckCircle className="h-5 w-5" />
          <span>Document quality check completed</span>
        </div>
        <div className="flex items-center gap-3 text-green-600">
          <CheckCircle className="h-5 w-5" />
          <span>OCR text extraction completed</span>
        </div>
        <div className="flex items-center gap-3 text-amber-600">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-amber-600 border-t-transparent"></div>
          <span>Cross-referencing with databases...</span>
        </div>
      </div>
    </div>
  );

  const renderManualReview = () => (
    <div className="text-center py-12">
      <AlertCircle className="h-16 w-16 text-amber-500 mx-auto mb-6" />
      <h2 className="text-2xl font-bold text-stone-800 mb-4">Manual Review</h2>
      <p className="text-stone-600 mb-8">
        Your documents have been forwarded to our verification team for final review. 
        This typically takes 2-4 business hours.
      </p>
      
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 max-w-md mx-auto">
        <h3 className="font-semibold text-amber-800 mb-2">What happens next?</h3>
        <ul className="text-amber-700 text-sm space-y-2 text-left">
          <li>• Expert review of all documents</li>
          <li>• Verification with issuing authorities</li>
          <li>• Risk assessment completion</li>
          <li>• Account activation notification</li>
        </ul>
      </div>
    </div>
  );

  const renderCompletion = () => (
    <div className="text-center py-12">
      <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
      <h2 className="text-3xl font-bold text-stone-800 mb-4">Verification Complete!</h2>
      <p className="text-stone-600 mb-8 text-lg">
        Congratulations! Your account has been verified and is ready to use.
      </p>
      
      <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <h3 className="font-semibold text-green-800 mb-2">What's Verified</h3>
          <ul className="text-green-700 text-sm space-y-1 text-left">
            <li>✓ Identity documents</li>
            <li>✓ Address verification</li>
            <li>✓ Financial information</li>
            <li>✓ Credit history</li>
          </ul>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-800 mb-2">Next Steps</h3>
          <ul className="text-blue-700 text-sm space-y-1 text-left">
            <li>• Access your dashboard</li>
            <li>• {userType === 'borrower' ? 'Apply for loans' : 'Browse loan requests'}</li>
            <li>• Set up auto-pay</li>
            <li>• Start {userType === 'borrower' ? 'borrowing' : 'lending'}</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return renderDocumentUpload();
      case 1:
        return renderVerificationProcess();
      case 2:
        return renderManualReview();
      case 3:
        return renderCompletion();
      default:
        return renderDocumentUpload();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            {verificationSteps.map((step, index) => (
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
                {index < verificationSteps.length - 1 && (
                  <div
                    className={`w-12 h-1 transition-all duration-300 ${
                      index < currentStep ? 'bg-amber-500' : 'bg-stone-200'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
          <p className="text-center text-stone-500">Step {currentStep + 1} of {verificationSteps.length}</p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden">
          <div className="p-8">
            {renderCurrentStep()}
          </div>

          {/* Navigation */}
          {(currentStep === 0 && allDocumentsVerified()) || currentStep === 3 ? (
            <div className="bg-stone-50 px-8 py-6">
              <button
                onClick={handleNext}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300"
              >
                {currentStep === 3 ? 'Continue to Dashboard' : 'Start Verification'}
              </button>
            </div>
          ) : currentStep > 0 && currentStep < 3 ? (
            <div className="bg-stone-50 px-8 py-6">
              <button
                onClick={handleNext}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300"
              >
                Continue
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default DocumentVerification;