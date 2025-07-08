import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "./hooks/useAuth";
// import useCurrentUser from "./hooks/useCurrentUser";

export default function App() {
  const navigate = useNavigate();
  const currentUser = useAuth();

  useEffect(() => {
    if (currentUser?.isAuthenticated) {
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [currentUser, navigate]);

  return null;
}
