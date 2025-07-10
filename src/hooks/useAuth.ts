import type { TTokenPayload } from "@/types";
import { jwtDecode } from "jwt-decode";

export function useAuth(): TTokenPayload | null {
  try {
    const storedData = localStorage.getItem("auth-storage");

    if (!storedData) return null;

    const parsedData = JSON.parse(storedData);

    const loginToken = parsedData?.state?.token?.data;

    if (!loginToken || typeof loginToken !== "string") return null;

    return jwtDecode<TTokenPayload>(loginToken);
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
}
