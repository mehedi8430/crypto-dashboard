import { apiClient } from "@/api";
import type { TUser } from "@/types";

export const authApi = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await apiClient.post("/auth/login", credentials);
    return response.data;
  },

  register: async (userData: TUser) => {
    const response = await apiClient.post("/users", userData);
    return response.data;
  },

  logout: async () => {
    await apiClient.post("/auth/logout");
  },

  //   refreshToken: async () => {
  //     const response = await apiClient.post("/auth/refresh");
  //     return response.data;
  //   },
};

// import { apiClient } from "@/api";
// import type { TUser } from "@/types";
// import adminData from "@/data/admin.json";
// import userData from "@/data/user.json";

// // Function to create a mock JWT
// const createMockToken = (payload: object) => {
//   const header = { alg: "HS256", typ: "JWT" };
//   const encodedHeader = btoa(JSON.stringify(header));
//   const encodedPayload = btoa(JSON.stringify(payload));
//   // In a real scenario, you'd have a signature. Here, it's empty.
//   return `${encodedHeader}.${encodedPayload}.`;
// };

// export const authApi = {
//   login: async (credentials: { email: string; password: string }) => {
//     const { email, password } = credentials;

//     // Check for mock admin or user credentials
//     if (password === "123456") {
//       if (email === adminData.email) {
//         const mockToken = createMockToken(adminData);
//         return { data: mockToken };
//       }
//       if (email === userData.email) {
//         const mockToken = createMockToken(userData);
//         return { data: mockToken };
//       }
//     }

//     // If not mock credentials, proceed with the actual API call
//     const response = await apiClient.post("/auth/login", credentials);
//     return response.data;
//   },

//   register: async (userData: TUser) => {
//     const response = await apiClient.post("/users", userData);
//     return response.data;
//   },

//   logout: async () => {
//     return Promise.resolve();
//   },
// };
