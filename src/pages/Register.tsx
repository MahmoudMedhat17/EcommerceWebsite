import { useForm, type SubmitHandler } from "react-hook-form";
import Headingcomponent from "@/components/eCommerce/HeadingComponent/Headingcomponent";
import { Forminput } from "@/components/forms/index";
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpSchema, type SignUpData } from "@/validations/SignUpSchema";
import useCheckEmailAvailability from "@/hooks/useCheckEmailAvailability";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import getAuthRegister from "@/store/auth/thunk/getAuthRegister";
import { useNavigate } from "react-router-dom";


const Register = () => {

  const {register, handleSubmit, formState:{errors}, getFieldState, trigger,} = useForm<SignUpData>({
    // Here the resolver is to connect between the Zod validation and the form from React-hook form with the schema we implemented above.
    mode:"onBlur",
    resolver:zodResolver(SignUpSchema),
  });

  const {prevEmail, handleCheckEmailAvailability, checkEmailAvailability, resetCheckEmailAvailability} = useCheckEmailAvailability();

  const {loading, error} = useAppSelector((state)=> state.auth);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const submitForm: SubmitHandler<SignUpData> = async (data)=> {
    console.log(data)
    // The Refresh error is probably here!
    const {firstName,lastName,email,password} = data; 
    // I added the try catch to fix the error but nothing happened LOL.
  try {
        console.log("🟡 BEFORE dispatch");

      const result = await dispatch(getAuthRegister({firstName, lastName, email, password})).unwrap().then(()=> navigate(`/login?message=${firstName} Successfully Registered`));
      console.log("🟢 AFTER dispatch SUCCESS", result);
  } catch (error) {
    console.log("Registration failed:", error);
  }};


  const handleEmailOnblur = async(e:React.FocusEvent<HTMLInputElement>) =>{
    // e.preventDefault();
    // Here trigger is for triggering the Email input to check if it's valid or not.
    await trigger("email");
    const value = e.target.value;
    const {isDirty, invalid} = getFieldState("email");

    // Here we check if the input is not empty => isDirty and input is an actual Email and not random text and that Email the user enters is not the same as stored in the database to let the validation works since we don't want the validation to work everytime except when there's someting inside the input field and it's an actual Email and not the same Email the user used before.
    if(isDirty && !invalid && prevEmail !== value){
        handleCheckEmailAvailability(value);
    };

    // Here we check if the input field has something and invalid which means is not an email and the Email is already is checked in before then stop the validation. "Prevent validations for anything other than Emails.".
    if(isDirty && invalid && prevEmail){
      resetCheckEmailAvailability();
    };
    
    console.log(checkEmailAvailability);
  }
  
  return (
    <>
      <Headingcomponent title="Registeration" />
      <form  className="flex justify-center items-center my-4" onSubmit={handleSubmit(submitForm)}>
        <div className="p-4 sm:p-8 shadow-xl w-full sm:w-1/2">
          <Forminput label="FirstName" placeHolder="FirstName" type="text" register={register} name="firstName" error={errors.firstName?.message}/>
          {/* <p className="text-red-500">
            {errors.FirstName?.message}
          </p> */}
          <Forminput label="LastName" placeHolder="LastName" type="text" register={register} name="lastName" error={errors.lastName?.message}/>
          <Forminput label="Email" placeHolder="Email" type="text" register={register} name="email" error={errors.email?.message} onBlur={handleEmailOnblur} checkEmail={checkEmailAvailability === "Checking" ? "Checking The Email Availability..." : checkEmailAvailability === "Failed" ? "Error Checking Email" : checkEmailAvailability === "Taken" ? "Email is already Taken !" : ""} success={checkEmailAvailability === "Available" ? "This Email is Available!" : ""}/>
          <Forminput label="Password" placeHolder="Password" type="password" register={register} name="password" error={errors.password?.message}/>
          <Forminput label="Confirm Password" placeHolder="Confirm Password" type="password" register={register} name="confirmPassword" error={errors.confirmPassword?.message}/>
          <button type="submit" disabled={checkEmailAvailability === "Checking" || loading === "Pending"} className="cursor-pointer bg-blue-500 text-white py-1 px-2.5 rounded-sm mt-3">
            {loading === "Pending" ? "Loading..." : "Submit"}
          </button>
          {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
      </form>
    </>
  )
}

export default Register;