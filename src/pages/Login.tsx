import Headingcomponent from "@/components/eCommerce/HeadingComponent/Headingcomponent";
import { useForm, type SubmitHandler } from "react-hook-form"
import { Forminput } from "@/components/forms/index";
import { LoginSchema, type LoginData } from "@/validations/LoginSchema";
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from "react-router-dom";


const Login = () => {

  const [searchParams] = useSearchParams();
  const msg = searchParams.get("message");
  const {register, handleSubmit, formState:{errors}} = useForm<LoginData>({
    mode:"onBlur",
    resolver:zodResolver(LoginSchema)
  });

  const submitForm: SubmitHandler<LoginData> = (data) => console.log(data);
  
  return (
    <>
      <Headingcomponent title="Login" />
      {
        msg && <p className="text-green-500 block w-full text-center">You’ve successfully registered! Please log in.</p>
      }
      <form onSubmit={handleSubmit(submitForm)} className="flex justify-center items-center my-4">
        <div className="p-4 sm:p-8 shadow-xl w-full sm:w-1/2">
          <Forminput label="Email" placeHolder="Email" type="text" register={register} name="email" error={errors.email?.message}/>
          {/* <p className="text-red-500">
            {errors.Email?.message}
          </p> */}
          <Forminput label="Password" placeHolder="Password" type="password" register={register} name="password" error={errors.password?.message}/>
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