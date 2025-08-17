export type TUserData = {
  id: string;
  email: string;
  fullName: string;
  createdAt: string;
  role: "ADMIN" | "USER";
  img: string;
  isStatus: boolean;
};
