export enum UserRole {
    Administrator,
    User
  }
  
export interface IToken {
    userId:         string;
    userName:       string;
    firstName:      string;
    lastName:       string;
    email:          string;
    expiration:     string;
    validity:       string;
    refreshToken:   string;
    token:          string;
    role:           UserRole;
    welcomeMessage: string;
}