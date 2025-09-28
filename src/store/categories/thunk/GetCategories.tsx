import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AxioserrorHandler from '@/utils/AxioserrorHandler';

// Here we define the Response coming from the API as an object with defined props using Types
// type TResponse = {
//     id:number;
//     title:string;
//     prefix:string;
//     img:string;
// };


const getCategories = createAsyncThunk(
    "categories/getCategories",
    async (_, thunkAPI) => {

        const { rejectWithValue } = thunkAPI;

        try {
            const response = await axios.get("http://localhost:5000/categories");
            return response.data;
        } catch (error) {
            // Here we check if the error comes from Axios itself then show the rejectWithValue msg with the response msg or the msg of the error itself
            return rejectWithValue(AxioserrorHandler(error));
        }
    }
);


export default getCategories;