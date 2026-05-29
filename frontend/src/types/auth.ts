export type LoginError = {
  email?: string;
  password?: string;
  otherError?: string;
};

export type SignupError = {
  username?: string;
  password?: string;
  email?: string;
  otherError?: string;
};