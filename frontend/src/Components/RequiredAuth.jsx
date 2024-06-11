import { useLocation, Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

const RequiredAuth = () => {
  const token = localStorage.getItem("token");
  let role = "";

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      role = decodedToken.role;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  } else {
    console.error("No token found in localStorage");
  }

  const location = useLocation();

  const isTeacherAuthorized = location.pathname === "/my-courses" && role === "teacher";

  return token && isTeacherAuthorized ? <Outlet /> : <Navigate to="/" />;
};

export default RequiredAuth;
