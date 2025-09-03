export type UserPayloads = {
  unlockUnknownUser: {
    userId: number;
  };
  userWithEmailExist: {
    emailId: number;
  };
  notFound: {
    userId: number;
  };
  mustHaveAdminComplianceRole: {
    userId: number;
  };
  alreadyHaveAnInvestmentSubscription: {
    investmentNames: string | string[];
  };
  notAuthorizedToViewInvestment: {
    userId: number;
  };
  noAccessOnlyRoWUsers: {
    userId: number;
  };
  invalidPhoneNumber: {
    phoneNumber: string;
    obfuscatedEmail: string;
  };
  cannotCreate: {
    obfuscatedEmail: string;
  };
  noUserByEmail: {
    email: string;
  };
  adminHasNoPermissions: {
    userInfo: string | number;
  };
  adminNotFound: {
    email: string;
  };
  noUserFromOktaToken: {
    email: string;
  };
  invalidToken: {
    activationToken: string;
  };
};
