import { useForm, type SubmitHandler } from "react-hook-form";
import Headingcomponent from "@/components/eCommerce/HeadingComponent/Headingcomponent";
import { Forminput } from "@/components/forms/index";
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpSchema, type SignUpData } from "@/validations/SignUpSchema";
import useCheckEmailAvailability from "@/hooks/useCheckEmailAvailability";


const Register = () => {

  const {register, handleSubmit, formState:{errors}, getFieldState, trigger} = useForm<SignUpData>({
    // Here the resolver is to connect between the Zod validation and the form from React-hook form with the schema we implemented above.
    mode:"onBlur",
    resolver:zodResolver(SignUpSchema),
  });

  const {prevEmail, handleCheckEmailAvailability, checkEmailAvailability, resetCheckEmailAvailability} = useCheckEmailAvailability();

  const submitForm: SubmitHandler<SignUpData> = (data)=> console.log(data);

  const handleEmailOnblur = async(e:React.FocusEvent<HTMLInputElement>) =>{
    console.log(e);

    // Here trigger is for triggering the Email input to check if it's valid or not.
    await trigger("Email");
    const value = e.target.value;
    const {isDirty, invalid} = getFieldState("Email");
    console.log("Field is not empty", isDirty);
    console.log("Email input", invalid);

    // Here we check if the input is not empty => isDirty and input is an actual Email and not random text and that Email the user enters is not the same as stored in the database to let the validation works since we don't want the validation to work everytime except when there's someting inside the input field and it's an actual Email and not the same Email the user used before.
    if(isDirty && !invalid && prevEmail !== value){
        handleCheckEmailAvailability(value);
    };

    // Here we check if the input field has something and invalid which means is not an email and the Email is already is checked in before then stop the validation. "Prevent validations for anything other than Emails.".
    if(isDirty && invalid && prevEmail){
      resetCheckEmailAvailability();
    };
  }
  
  return (
    <>
      <Headingcomponent title="Registeration" />
      <form action="" className="flex justify-center items-center my-4" onSubmit={handleSubmit(submitForm)}>
        <div className="p-4 sm:p-8 shadow-xl w-full sm:w-1/2">
          <Forminput label="FirstName" placeHolder="FirstName" type="text" register={register} name="FirstName" error={errors.FirstName?.message}/>
          {/* <p className="text-red-500">
            {errors.FirstName?.message}
          </p> */}
          <Forminput label="LastName" placeHolder="LastName" type="text" register={register} name="LastName" error={errors.LastName?.message}/>
          {/* <p className="text-red-500">
            {errors.LastName?.message}
          </p> */}
          <Forminput label="Email" placeHolder="Email" type="text" register={register} name="Email" error={errors.Email?.message} onBlur={handleEmailOnblur}/>
          {/* <p className="text-red-500">
            {errors.Email?.message}
          </p> */}
          <Forminput label="Password" placeHolder="Password" type="password" register={register} name="Password" error={errors.Password?.message}/>
          {/* <p className="text-red-500">
            {errors.Password?.message}
          </p> */}
          <Forminput label="Confirm Password" placeHolder="Confirm Password" type="password" register={register} name="ConfirmPassword" error={errors.ConfirmPassword?.message}/>
          {/* <p className="text-red-500">
            {errors.ConfirmPassword?.message}
          </p> */}
          <button className="cursor-pointer bg-blue-500 text-white py-1 px-2.5 rounded-sm mt-3">Submit</button>
        </div>
      </form>
    </>
  )
}

export default Register;