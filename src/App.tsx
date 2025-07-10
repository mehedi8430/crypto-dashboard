import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/dashboard", { replace: true });
  }, [navigate]);

  return null;
}