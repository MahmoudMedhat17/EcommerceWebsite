import { useForm, type SubmitHandler } from "react-hook-form";
import Headingcomponent from "@/components/eCommerce/HeadingComponent/Headingcomponent";
import { Forminput } from "@/components/forms/index";

type IFormData = {
  FirstName:string;
  LastName:string;
  Email:string;
  Password:string;
  ConfirmPassword:string;
};

const Register = () => {

  const {register, handleSubmit} = useForm<IFormData>();

  const submitForm: SubmitHandler<IFormData> = (data)=> console.log(data);
  
  return (
    <>
      <Headingcomponent title="Registeration" />
      <form action="" className="flex justify-center items-center my-4" onSubmit={handleSubmit(submitForm)}>
        <div className="p-4 sm:p-8 shadow-lg w-full sm:w-1/2">
          <Forminput label="FirstName" placeHolder="FirstName" type="text" register={register} name="FirstName"/>
          <Forminput label="LastName" placeHolder="LastName" type="text" register={register} name="LastName"/>
          <Forminput label="Email" placeHolder="Email" type="text" register={register} name="Email"/>
          <Forminput label="Password" placeHolder="Password" type="password" register={register} name="Password"/>
          <Forminput label="Confirm Password" placeHolder="Confirm Password" type="password" register={register} name="ConfirmPassword"/>
          <button className="cursor-pointer bg-blue-500 text-white py-1 px-2.5 rounded-sm">Submit</button>
        </div>
      </form>
    </>
  )
}

export default Register;