export interface User {
  _id?: string;
  email: string;
  name: string;
  googleId?: string;
  password: string;
  role: string;

  isValidPassword(password: string): Promise<Error | boolean>;
}
