
import {jwtDecode} from "jwt-decode"; // Correct default import
import { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";

function useAuth() {
   let token = localStorage.getItem('token');
   
   if (token) {
      
      try {
       
         const decodedToken = jwtDecode(token);
         console.log(token)
         // Optionally add more checks here (e.g., token expiration)
         
    
         return true;
      } catch (error) {
         console.log("Invalid or expired token:", error);
         localStorage.removeItem("token")
         return false;
         
      }
   }
   console.log("No token found");
   return false;
}

export default function ProtectRoute() {
    let isAuth = useAuth();
    console.log("Is Authenticated:", isAuth);
    return isAuth ? <Outlet /> : <Navigate to="/Login" />;
}
