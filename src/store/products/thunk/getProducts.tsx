import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AxioserrorHandler from "@/utils/AxioserrorHandler";


const getProducts = createAsyncThunk("/products/getProducts",
    async (prefix:string,thunkApi) =>{
        const {rejectWithValue} = thunkApi;
        try {
            const response = await axios.get(`http://localhost:5000/products?cat_prefix=${prefix}`);
            return response.data;
        } catch (error) {
            // Here we check if the error comes from Axios itself then show the rejectWithValue msg with the response msg or the msg of the error itself
           return rejectWithValue(AxioserrorHandler(error));
        }
    }
);


export default getProducts;