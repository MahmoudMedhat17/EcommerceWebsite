import Headingcomponent from "@/components/eCommerce/HeadingComponent/Headingcomponent";
import { Forminput } from "@/components/forms/index";
import { useEffect } from "react";
import { resetErrors } from "@/store/auth/authSlice";
import useLogin from "@/hooks/useLogin";

const Login = () => {

  const { loading, error, searchParams, handleSubmit, register, formErrors, submitForm, dispatch } = useLogin();
  
  // Here the msg we get using searchParams.
  const msg = searchParams.get("message");
  // Here the loginMsg we get using searchParams.
  const loginMsg = searchParams.get("loginMsg");
  
  

  //Here this useEffect is for reseting the UI errors for Login and Register pages. When the error message appears this useEffect prevents the msg to appear in both forms and appears only at the form with the error only. 
  useEffect(()=>{
    return ()=>{
      dispatch(resetErrors());
    }
  },[dispatch]);
  
  return (
    <>
      <Headingcomponent title="Login" />
      {/* Here this msg for when the user Register his User details and then this msg appears once he navigate to Login Page. */}
      {
        msg && <p className="text-green-500 block w-full text-center">You’ve successfully registered! Please log in.</p>
      }
      {/* Here this msg appears when the user tries to access any of the Protected Routes without logging in. */}
      {
        loginMsg && <p className="text-green-500 block w-full text-center">You need to Login.</p>
      }
      <form onSubmit={handleSubmit(submitForm)} className="flex justify-center items-center my-4">
        <div className="p-4 sm:p-8 shadow-xl w-full sm:w-1/2">
          <Forminput label="Email" placeHolder="Email" type="text" register={register} name="email" error={formErrors.email?.message}/>
          {/* <p className="text-red-500">
            {errors.Email?.message}
          </p> */}
          <Forminput label="Password" placeHolder="Password" type="password" register={register} name="password" error={formErrors.password?.message}/>
          <button className="cursor-pointer bg-blue-500 text-white py-1 px-2.5 rounded-sm mt-3">
            {
            loading === "Pending" ?
            "Loading..." : "Login"
            }
          </button>
          {error && <p className="text-red-500 w-full block mx-auto text-center mt-4">{error}</p>}
        </div>
      </form>
    </>
  )
}

export default Login;