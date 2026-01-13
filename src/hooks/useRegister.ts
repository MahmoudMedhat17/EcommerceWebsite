import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpSchema, type SignUpData } from "@/validations/SignUpSchema";
import useCheckEmailAvailability from "@/hooks/useCheckEmailAvailability";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import getAuthRegister from "@/store/auth/thunk/getAuthRegister";
import { useNavigate } from "react-router-dom";

const useRegister = () => {


    const { register, handleSubmit, formState: { errors:formErrors }, getFieldState, trigger, } = useForm<SignUpData>({
        // Here the resolver is to connect between the Zod validation and the form from React-hook form with the schema we implemented above.
        mode: "onBlur",
        resolver: zodResolver(SignUpSchema),
    });

    const { prevEmail, handleCheckEmailAvailability, checkEmailAvailability, resetCheckEmailAvailability } = useCheckEmailAvailability();

    const { loading, error } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const submitForm: SubmitHandler<SignUpData> = async (data) => {
        const { firstName, lastName, email, password } = data;
        try {
            await dispatch(getAuthRegister({ firstName, lastName, email, password })).unwrap().then(() => navigate(`/login?message=${firstName} Successfully Registered`));
        } catch (error) {
            console.log("Registration failed:", error);
        }
    };


    const handleEmailOnblur = async (e: React.FocusEvent<HTMLInputElement>) => {
        // e.preventDefault();
        // Here trigger is for triggering the Email input to check if it's valid or not.
        await trigger("email");
        const value = e.target.value;
        const { isDirty, invalid } = getFieldState("email");

        // Here we check if the input is not empty => isDirty and input is an actual Email and not random text and that Email the user enters is not the same as stored in the database to let the validation works since we don't want the validation to work everytime except when there's someting inside the input field and it's an actual Email and not the same Email the user used before.
        if (isDirty && !invalid && prevEmail !== value) {
            handleCheckEmailAvailability(value);
        };

        // Here we check if the input field has something and invalid which means is not an email and the Email is already is checked in before then stop the validation. "Prevent validations for anything other than Emails.".
        if (isDirty && invalid && prevEmail) {
            resetCheckEmailAvailability();
        };

        console.log(checkEmailAvailability);
    };

    return { loading, error, register, handleSubmit, formErrors, submitForm, handleEmailOnblur, dispatch, checkEmailAvailability };
}

export default useRegister;