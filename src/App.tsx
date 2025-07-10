import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "./hooks/useAuth";
// import useCurrentUser from "./hooks/useCurrentUser";

export default function App() {
  const navigate = useNavigate();
  const userData = useAuth();
  console.log({ userData });

  useEffect(() => {
    if (userData?.id) {
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [userData, navigate]);

  return null;
}
