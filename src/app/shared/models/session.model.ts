export interface SessionState {
  isAuth: boolean;
}

export interface SquidexToken {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
}
