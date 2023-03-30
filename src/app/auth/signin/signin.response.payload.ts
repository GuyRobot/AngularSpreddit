export interface SigninResponsePayload {
  authenticationToken: string;
  refreshToken: string;
  expiresAt: Date;
  username: string;
}
