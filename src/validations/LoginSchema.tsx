import {z} from "zod";


const LoginSchema = z.object({
    Email:z.email({message:"Invalid Email Address."}),
    Password:z.string().min(1,{message:"Password is not correct!"})
});



type LoginData = z.infer<typeof LoginSchema>;


export {LoginSchema, type LoginData};