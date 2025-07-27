import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const getProducts = createAsyncThunk("/products/getProducts",
    async (prefix,thunkApi) =>{
        const {rejectWithValue} = thunkApi;
        try {
            const response = await axios.get(`http://localhost:5000/products?cat_prefix=${prefix}`);
            return response.data;
        } catch (error) {
            // Here we check if the error comes from Axios itself then show the rejectWithValue msg with the response msg or the msg of the error itself
            if(axios.isAxiosError(error)){
                return rejectWithValue(error.response?.data.message || error.message);
            }
            // If it's not coming from axios then we write the error msg
            else{
                return rejectWithValue("Unexpected Error!");
            };
        }
    }
);


export default getProducts;