import Headingcomponent from "@/components/eCommerce/HeadingComponent/Headingcomponent";
import { Forminput } from "@/components/forms/index";
import { useEffect } from "react";
import { resetErrors } from "@/store/auth/authSlice";
import useRegister from "@/hooks/useRegister";

const Register = () => {

  const { loading, error, register, submitForm, formErrors, handleEmailOnblur, handleSubmit, checkEmailAvailability, dispatch} = useRegister();

  //Here this useEffect is for reseting the UI errors for Login and Register pages. When the error message appears this useEffect prevents the msg to appear in both forms and appears only at the form with the error only. 
  useEffect(()=>{
    dispatch(resetErrors());
  },[dispatch]);
  
  return (
    <>
      <Headingcomponent title="Registeration" />
      <form  className="flex justify-center items-center my-4" onSubmit={handleSubmit(submitForm)}>
        <div className="p-4 sm:p-8 shadow-xl w-full sm:w-1/2">
          <Forminput label="FirstName" placeHolder="FirstName" type="text" register={register} name="firstName" error={formErrors.firstName?.message}/>
          <Forminput label="LastName" placeHolder="LastName" type="text" register={register} name="lastName" error={formErrors.lastName?.message}/>
          <Forminput label="Email" placeHolder="Email" type="text" register={register} name="email" error={formErrors.email?.message} onBlur={handleEmailOnblur} checkEmail={checkEmailAvailability === "Checking" ? "Checking The Email Availability..." : checkEmailAvailability === "Failed" ? "Error Checking Email" : checkEmailAvailability === "Taken" ? "Email is already Taken !" : ""} success={checkEmailAvailability === "Available" ? "This Email is Available!" : ""}/>
          <Forminput label="Password" placeHolder="Password" type="password" register={register} name="password" error={formErrors.password?.message}/>
          <Forminput label="Confirm Password" placeHolder="Confirm Password" type="password" register={register} name="confirmPassword" error={formErrors.confirmPassword?.message}/>
          <button type="submit" disabled={checkEmailAvailability === "Checking" || loading === "Pending"} className="cursor-pointer bg-blue-500 text-white py-1 px-2.5 rounded-sm mt-3">
            {loading === "Pending" ? "Loading..." : "Submit"}
          </button>
          {error && <p className="text-red-500 w-full block mx-auto text-center mt-4">{error}</p>}
        </div>
      </form>
    </>
  )
}

export default Register;