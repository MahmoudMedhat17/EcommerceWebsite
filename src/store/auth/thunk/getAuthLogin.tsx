import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AxioserrorHandler from "@/utils/AxioserrorHandler";


// This is what the Login form takes => Email & Password.
interface IFormData {
    email: string;
    password: string;
};

// This the Response we get from JSON-Auth => /Login .
interface IResponseData {
    accessToken: string;
    user: {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
    };
};

const getAuthLogin = createAsyncThunk("auth/getAuthLogin", async (formData: IFormData, thunkAPI) => {

    const { rejectWithValue } = thunkAPI;

    try {
        const res = await axios.post<IResponseData>("https://e-commerce-json-server-kappa.vercel.app/login", formData);
        console.log(res.data);
        return res.data;
    } catch (error) {
        return rejectWithValue(AxioserrorHandler(error));
    }
});


export default getAuthLogin;