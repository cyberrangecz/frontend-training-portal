import {environment} from "../../../environments/environment";
import {AuthConfig} from "angular-oauth2-oidc";

export const authConfig: AuthConfig = {
  issuer: environment.issuer,
  redirectUri: environment.redirectUri,
  clientId: environment.clientId,
  scope: environment.scope,
  logoutUrl: environment.logoutUrl,
  sessionChecksEnabled: environment.sessionChecksEnabled,
  postLogoutRedirectUri: environment.postLogoutRedirectUri,
  clearHashAfterLogin: true,
};
