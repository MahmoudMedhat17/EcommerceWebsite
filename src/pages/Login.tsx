import Headingcomponent from "@/components/eCommerce/HeadingComponent/Headingcomponent";
import { useForm, type SubmitHandler } from "react-hook-form"
import { Forminput } from "@/components/forms/index";
import { LoginSchema, type LoginData } from "@/validations/LoginSchema";
import { zodResolver } from '@hookform/resolvers/zod';


const Login = () => {
  
  const {register, handleSubmit, formState:{errors}} = useForm<LoginData>({
    mode:"onBlur",
    resolver:zodResolver(LoginSchema)
  });

  const submitForm: SubmitHandler<LoginData> = (data) => console.log(data);
  
  return (
    <>
      <Headingcomponent title="Login" />
      <form onSubmit={handleSubmit(submitForm)} className="flex justify-center items-center my-4">
        <div className="p-4 sm:p-8 shadow-xl w-full sm:w-1/2">
          <Forminput label="Email" placeHolder="Email" type="text" register={register} name="Email" error={errors.Email?.message}/>
          {/* <p className="text-red-500">
            {errors.Email?.message}
          </p> */}
          <Forminput label="Password" placeHolder="Password" type="password" register={register} name="Password" error={errors.Password?.message}/>
          {/* <p className="text-red-500">
            {errors.Password?.message}
          </p> */}
          <button className="cursor-pointer bg-blue-500 text-white py-1 px-2.5 rounded-sm mt-3">Login</button>
        </div>
      </form>
    </>
  )
}

export default Login;