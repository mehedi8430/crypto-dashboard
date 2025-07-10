import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function App() {
  const navigate = useNavigate();
  const userData = useAuth();

  useEffect(() => {
    if (userData?.id) {
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [userData, navigate]);

  return null;
}