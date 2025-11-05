import { createAsyncThunk } from "@reduxjs/toolkit";
import AxioserrorHandler from "@/utils/AxioserrorHandler";
import axios from "axios";


interface IFormData {
    firstName:string;
    lastName:string;
    email:string;
    password:string;
};



const getAuthRegister = createAsyncThunk("auth/getAuth", async (formData: IFormData,thunk)=>{

    const {rejectWithValue} = thunk;


    try {
        const res = await axios.post("http://localhost:5000/register",formData);
        console.log(res.data);
        return res.data;
    } catch (error) {
        return rejectWithValue(AxioserrorHandler(error));
    }
});


export default getAuthRegister;