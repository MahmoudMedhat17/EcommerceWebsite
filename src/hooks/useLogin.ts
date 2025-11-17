import { useForm, type SubmitHandler } from "react-hook-form"
import { LoginSchema, type LoginData } from "@/validations/LoginSchema";
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { useAppSelector } from "@/store/hooks";
import getAuthLogin from "@/store/auth/thunk/getAuthLogin";
import { useNavigate } from "react-router-dom";


const useLogin = () => {

    // Here we use searchParams from react router dom to get the message from the url and use it to display the message to the user when he registered an email.
    const [searchParams] = useSearchParams();

    // Here we use navigate from react router dom to navigate to another page.
  const navigate = useNavigate();


    const { register, handleSubmit, formState: { errors:formErrors } } = useForm<LoginData>({
        mode: "onBlur",
        resolver: zodResolver(LoginSchema)
    });

    const dispatch = useAppDispatch();

    const { loading, error } = useAppSelector((state) => state.auth);

    const submitForm: SubmitHandler<LoginData> = async (data) => {
        const { email, password } = data;
        // Here we dispatch the thunk of getAuthLogin and then when user successfully login then redirect the user to the main page.
        await dispatch(getAuthLogin({ email, password })).unwrap().then(() => navigate("/"));
    };

    return {searchParams, register, handleSubmit, formErrors, loading, error, submitForm, dispatch};
}

export default useLogin;