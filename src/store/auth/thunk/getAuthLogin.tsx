import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AxioserrorHandler from "@/utils/AxioserrorHandler";


interface IFormData{
    email:string;
    password:string;
};

interface IResponseData{
    accessToken:string;
    user:{
        id:number;
        email:string;
        firstName:string;
        lastName:string;
    };
}

const getAuthLogin = createAsyncThunk("auth/getAuthLogin", async(formData:IFormData,thunkAPI)=>{

    const {rejectWithValue} = thunkAPI;

    try {
        const res = await axios.post<IResponseData>("http://localhost:5000/login",formData);
        console.log(res.data);
        return res.data;
    } catch (error) {
        return rejectWithValue(AxioserrorHandler(error));
    }
});


export default getAuthLogin;