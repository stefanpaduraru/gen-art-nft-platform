import { ExceptionDefinition } from "./ExceptionDefinition";
import { ExceptionGroups } from "@common/integrations/Exceptions/ExceptionGroups";
import { HTTP } from "@common/utils/HTTPCodes";

const userDefinition = {
  unlockUnknownUser: {
    httpCode: HTTP.NOT_FOUND,
    type: "Requester tried to unlock unknown user account",
    publicMessage: "User not found",
  },
  userWithEmailExist: {
    httpCode: HTTP.BAD_REQUEST,
    type: "User with the current email already exists",
    publicMessage: "Incorrect data",
  },
  notFound: {
    httpCode: HTTP.NOT_FOUND,
    type: "User not found",
    publicMessage: "The requester user could not be found",
  },
  mustHaveAdminComplianceRole: {
    httpCode: HTTP.FORBIDDEN,
    type: "User must have admin compliance role",
    publicMessage: "User does not have a permission",
  },
  alreadyHaveAnInvestmentSubscription: {
    httpCode: HTTP.BAD_REQUEST,
    type: "User already has subscriptions for investments",
    publicMessage: "User already has subscriptions for investments",
  },
  incorrectOldPassword: {
    httpCode: HTTP.BAD_REQUEST,
    type: "Incorrect password provided by user",
    publicMessage: "Wrong password",
  },
  invalidNewPassword: {
    httpCode: HTTP.BAD_REQUEST,
    type: "New password is invalid",
    publicMessage: "New password is invalid",
  },
  failedToUpdatePassword: {
    httpCode: HTTP.INTERNAL_SERVER_ERROR,
    type: "Password update failed",
    publicMessage: "Password update failed",
  },
  notAuthorizedToViewInvestment: {
    httpCode: HTTP.FORBIDDEN,
    type: "User is not authorized to view investment",
    publicMessage: "User is not authorized to view investment",
  },
  noAccessOnlyRoWUsers: {
    httpCode: HTTP.FORBIDDEN,
    type: "Only for RoW user",
    publicMessage: "Only for RoW user",
  },
  cannotUpdateMailWhenThereIsNoPassword: {
    httpCode: HTTP.FORBIDDEN,
    type: "Could not update e-mail for User that has no password",
    publicMessage: "That action is not allowed",
  },
  managerNonRelated: {
    httpCode: HTTP.FORBIDDEN,
    type: "Manager can't reach personal data for non-related investor id",
    publicMessage:
      "No authorized rights to retrieve or update personal information for the given id",
  },
  maxChangeEmailAttemptsReached: {
    httpCode: HTTP.FORBIDDEN,
    type: "Maximum 'change email' attempts reached",
    publicMessage: "Invalid data after 5th time on submit",
  },
  incorrectPasswordChangeEmail: {
    httpCode: HTTP.BAD_REQUEST,
    type: "password of user is not correct for changing email",
    publicMessage: "Invalid Data",
  },
  cannotUpdateEmail: {
    httpCode: HTTP.FORBIDDEN,
    type: "Could not update e-mail for User",
    publicMessage: "That action is not allowed",
  },
  invalidPhoneNumber: {
    httpCode: HTTP.BAD_REQUEST,
    type: "Invalid phone number",
    publicMessage: "Invalid phone number",
  },
  roleShouldNotBeSpecified: {
    httpCode: HTTP.BAD_REQUEST,
    type: "Role should not be specified here",
    publicMessage: "Role should not be specified here",
  },
  partnerConsentsNotAccepted: {
    httpCode: HTTP.BAD_REQUEST,
    type: "Investor with email did not accept custom partner consent",
    publicMessage: "Invalid data",
  },
  cannotCreate: {
    httpCode: HTTP.BAD_REQUEST,
    type: "Cannot create a user",
    publicMessage: "Cannot create a user",
  },
  userMissingEmail: {
    httpCode: HTTP.UNPROCESSABLE_ENTITY,
    type: "User missing retrieved email",
    publicMessage: "User missing retrieved email",
  },
  failedToAuthenticateViaToken: {
    httpCode: HTTP.BAD_REQUEST,
    type: "Error while authenticating user with a token",
    publicMessage: "Could not authenticate user with provided token",
  },
  noWhitelistedTokensForUser: {
    httpCode: HTTP.UNAUTHORIZED,
    type: "User has no whitelisted tokens",
    publicMessage: "Could not find any valid tokens for the user",
  },
  couldNotParseJwtToken: {
    httpCode: HTTP.UNAUTHORIZED,
    type: "Could not parse JWT token",
    publicMessage: "Invalid JWT token",
  },
  noUserIdInJwtToken: {
    httpCode: HTTP.UNAUTHORIZED,
    type: "Could not find user in JTW token",
    publicMessage: "Could not find user in JTW token",
  },
  noUserByEmail: {
    httpCode: HTTP.UNAUTHORIZED,
    type: "Could not find user by email",
    publicMessage: "User not found",
  },
  userIsBanned: {
    httpCode: HTTP.UNAUTHORIZED,
    type: "User is banned",
    publicMessage: "User is banned",
  },
  userIsNotActive: {
    httpCode: HTTP.UNAUTHORIZED,
    type: "User has not been activated",
    publicMessage: "User has not been activated yet",
  },
  prospectIsNotActive: {
    httpCode: HTTP.UNAUTHORIZED,
    type: "Prospect has not been activated",
    publicMessage: "Prospect user has not been activated yet",
  },
  userIsBlocked: {
    httpCode: HTTP.FORBIDDEN,
    type: "User is blocked",
    publicMessage: "Too many failed login attempts: user has been blocked",
  },
  userHasNoPassword: {
    httpCode: HTTP.FORBIDDEN,
    type: "User has no password",
    publicMessage: "User has no password",
  },
  userHasPasswordResetInProgress: {
    httpCode: HTTP.UNAUTHORIZED,
    type: "User has password reset in progress",
    publicMessage:
      "User has requested a password reset but did not complete it yet",
  },
  wrongPassword: {
    httpCode: HTTP.UNAUTHORIZED,
    type: "User entered wrong password",
    publicMessage: "Wrong password",
  },
  adminHasNoPermissions: {
    httpCode: HTTP.FORBIDDEN,
    type: "Okta admin does not have permissions",
    publicMessage: "Okta Admin does not have permissions to access admin panel",
  },
  adminNotFound: {
    httpCode: HTTP.UNAUTHORIZED,
    type: "No Okta admin user found",
    publicMessage: "Could not find any OKTA admin user",
  },
  noUserFromOktaToken: {
    httpCode: HTTP.UNAUTHORIZED,
    type: "No user found from Okta token",
    publicMessage: "User not found",
  },
  changePasswordErrorInvalidToken: {
    httpCode: HTTP.BAD_REQUEST,
    type: "Token could not be validated",
    publicMessage: "Invalid token",
  },
  passwordAlreadyChanged: {
    httpCode: HTTP.BAD_REQUEST,
    type: "Password already changed",
    publicMessage: "User already changed his password",
  },
  changePasswordEmailTokenMismatch: {
    httpCode: HTTP.BAD_REQUEST,
    type: "Token has been invalidated because it belonged to another email",
    publicMessage: "Invalid token",
  },
  changePasswordTokenExpired: {
    httpCode: HTTP.BAD_REQUEST,
    type: "Outdated token, can not reset password",
    publicMessage: "Token is outdated",
  },
  invalidPasswordFormat: {
    httpCode: HTTP.BAD_REQUEST,
    type: "User provided invalid formatted password",
    publicMessage: "Invalid password format",
  },
  wrongPasswordAttemptsWarning: {
    httpCode: HTTP.UNAUTHORIZED,
    type: "Three failed login attempts",
    publicMessage: "The user has provided a wrong password for the 3rd time",
  },
  maxWrongPasswordAttemptsError: {
    httpCode: HTTP.FORBIDDEN,
    type: "Account blocked due to max login attempts",
    publicMessage: "Too many login attempts: the account has been blocked",
  },
  invalidToken: {
    httpCode: HTTP.BAD_REQUEST,
    type: "User by token not found",
    publicMessage: "The provided token is invalid. Cannot activate user",
  },
};

type User = {
  [K in keyof typeof userDefinition]: ExceptionDefinition<ExceptionGroups.User>;
};
const user = userDefinition as User;

export { user };
