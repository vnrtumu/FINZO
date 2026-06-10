export type RootStackParamList = {
  Onboarding: undefined;
  MainApp: undefined;
};

export type OnboardingStackParamList = {
  MobileOTP: undefined;
  Profile: undefined;
  PAN: undefined;
  Aadhaar: undefined;
  Selfie: undefined;
  Employment: undefined;
  BankAccount: undefined;
  Success: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Loans: undefined;
  Payments: undefined;
  ProfileTab: undefined;
};

export type LoanStackParamList = {
  LoanList: undefined;
  LoanDetail: {loanId: string};
  ApplyLoan: undefined;
  LoanOffer: {
    amount: number;
    tenure: number;
    purpose: string;
  };
  LoanSuccess: {
    loanId: string;
    amount: number;
  };
};

export type PaymentStackParamList = {
  PaymentHome: undefined;
  MakePayment: {
    loanId: string;
    amount: number;
    emiNumber: number;
  };
  PaymentHistory: undefined;
};
