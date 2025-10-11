import Headingcomponent from "@/components/eCommerce/HeadingComponent/Headingcomponent";
import { Forminput } from "@/components/forms/index";


const Login = () => {
  return (
    <>
      <Headingcomponent title="Login" />
      <form action="" className="flex justify-center items-center my-4">
        <div className="p-4 sm:p-8 shadow-lg w-full sm:w-1/2">
          <Forminput label="Email" placeHolder="Email" type="text" />
          <Forminput label="Password" placeHolder="Password" type="password" />
          <button className="cursor-pointer bg-blue-500 text-white py-1 px-2.5 rounded-sm">Login</button>
        </div>
      </form>
    </>
  )
}

export default Login;