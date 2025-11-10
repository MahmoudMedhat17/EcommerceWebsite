import Headingcomponent from "@/components/eCommerce/HeadingComponent/Headingcomponent";
import { useForm, type SubmitHandler } from "react-hook-form"
import { Forminput } from "@/components/forms/index";
import { LoginSchema, type LoginData } from "@/validations/LoginSchema";
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { useAppSelector } from "@/store/hooks";
import getAuthLogin from "@/store/auth/thunk/getAuthLogin";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { resetErrors } from "@/store/auth/authSlice";

const Login = () => {

  // Here we use searchParams from react router dom to get the message from the url and use it to display the message to the user when he registered an email.
  const [searchParams] = useSearchParams();
  // Here the msg we get using searchParams.
  const msg = searchParams.get("message");
  // Here the loginMsg we get using searchParams.
  const loginMsg = searchParams.get("loginMsg");
  // Here we use navigate from react router dom to navigate to another page.
  const navigate = useNavigate();

  const {register, handleSubmit, formState:{errors}} = useForm<LoginData>({
    mode:"onBlur",
    resolver:zodResolver(LoginSchema)
  });

  const dispatch = useAppDispatch();

  const {loading, error} = useAppSelector((state)=> state.auth);

  const submitForm: SubmitHandler<LoginData> = async (data) => {
    const {email,password} = data;
    // Here we dispatch the thunk of getAuthLogin and then when user successfully login then redirect the user to the main page.
    await dispatch(getAuthLogin({email,password})).unwrap().then(()=>navigate("/"));
  };

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
          <Forminput label="Email" placeHolder="Email" type="text" register={register} name="email" error={errors.email?.message}/>
          {/* <p className="text-red-500">
            {errors.Email?.message}
          </p> */}
          <Forminput label="Password" placeHolder="Password" type="password" register={register} name="password" error={errors.password?.message}/>
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