export type UserRole = "ADMIN" | "USER";

export type TUser = {
  email: string;
  password: string;
  fullName: string;
  role: UserRole;
  isStatus?: boolean;
  img?: string;
};

export type TAuthStore = {
  user: TUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: TUser, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<TUser>) => void;
};

export type TTokenPayload = {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
  img?: string;
};
