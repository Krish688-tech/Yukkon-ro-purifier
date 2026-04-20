import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    console.log("TOKEN:", token);

    if (token) {
      localStorage.setItem("token", token);
      navigate("/");
    }
  }, []);

  return <p>Logging you in...</p>;
};

export default GoogleSuccess;