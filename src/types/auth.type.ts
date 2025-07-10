export type TUser = {
  email: string;
  password: string;
  fullName: string;
  role: "ADMIN" | "USER";
  isDeleted?: boolean;
};

export type TAuthStore = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
};

type User = {
  id: string;
  email: string;
  name: string;
  role: string;
};

type UserRole = "ADMIN" | "USER";

export type TTokenPayload = {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
};
