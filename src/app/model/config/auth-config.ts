import {environment} from "../../../environments/environment";
import {AuthConfig} from "angular-oauth2-oidc";

export const authConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: environment.issuer,

  // URL of the SPA to redirect the user after silent refresh
  silentRefreshRedirectUri: environment.silentRefreshRedirectUri,

  // URL of the SPA to redirect the user to after login
  redirectUri: environment.redirectUri,

  // The SPA's id. The SPA is registered with this id at the config-server
  clientId: environment.clientId,

  // set the scope for the permissions the client should request
  scope: environment.scope,

  sessionChecksEnabled: environment.sessionChecksEnabled
};
