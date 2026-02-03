import { createAsyncThunk } from "@reduxjs/toolkit";
import AxioserrorHandler from "@/utils/AxioserrorHandler";
import axios from "axios";


interface IFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};



const getAuthRegister = createAsyncThunk("auth/getAuthRegister", async (formData: IFormData, thunkAPI) => {

    const { rejectWithValue } = thunkAPI;


    try {
        const res = await axios.post("https://e-commerce-json-server-kappa.vercel.app/register", formData);
        console.log(res.data);
        return res.data;
    } catch (error) {
        return rejectWithValue(AxioserrorHandler(error));
    }
});


export default getAuthRegister;