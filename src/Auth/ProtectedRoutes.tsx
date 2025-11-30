import { useAppSelector } from "@/store/hooks"
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  
  // Here we get the accessToken from the AuthSlice.
  const {accessToken} = useAppSelector((state)=> state.auth);
  

  // Here we check if there's no accessToken (Means there's no user logged in) then navigate the user to the login page so he / she can log in to there account.
  if(!accessToken){
    return <Navigate to={"/login?loginMsg=login_required"}/>
  }
  // Here we set Outlet means go the rest of the routes of the user is logged in and in our case our protected routes are the cart and wishlist and with Outlet we can get access to these routes since the user is logged in successfully.   
  else{
    return <Outlet/>
  }
};

export default ProtectedRoutes;
