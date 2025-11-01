import {z} from "zod";



const SignUpSchema = z.object({
  firstName:z.string().min(1,{message:"First Name is required."}),
  lastName:z.string().min(1,{message:"Last Name is required."}),
  email:z.email(),
  password:z.string().min(8,{message:"Password must be at least 8 characters."}).
  regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,32}$/,{message:"Password must contain at least 1 Uppercase and 1 Special character."}),
  confirmPassword:z.string().min(1,{message:"Confirm Password is requried."})
})
// Here we check with refine coming from zod that if Password is equal to Confirm Password, if not then it shows an error message that they aren't equal and with path we mean that show this error under the Confirm Password input.
.refine((input)=> input.password === input.confirmPassword,{message:"Confirm Password should match the Password!",path:["ConfirmPassword"]});


// This z.infer is equal to manaully typing the properties using TS. So here IFormData will be equal to the properties of formSchema.
type SignUpData = z.infer<typeof SignUpSchema>; 
// {
//   FirstName:string;
//   LastName:string;
//   Email:string;
//   Password:string;
//   ConfirmPassword:string;
// };

export {SignUpSchema, type SignUpData};