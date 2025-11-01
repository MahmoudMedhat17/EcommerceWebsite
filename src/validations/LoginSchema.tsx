import {z} from "zod";


const LoginSchema = z.object({
    email:z.email({message:"Invalid Email Address."}),
    password:z.string().min(1,{message:"Password is not correct!"})
});



type LoginData = z.infer<typeof LoginSchema>;


export {LoginSchema, type LoginData};