export interface SigninResponsePayload {
  authenticationToken: string;
  refreshToken: string;
  expireAt: Date;
  username: string;
}
