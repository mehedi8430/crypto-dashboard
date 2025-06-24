import { useEffect } from "react";
import { useNavigate } from "react-router";
// import useCurrentUser from "./hooks/useCurrentUser";
 
export default function App() {
  const navigate = useNavigate();
  const currentUser = true;
 
  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [currentUser, navigate]);
 
  return null;
};