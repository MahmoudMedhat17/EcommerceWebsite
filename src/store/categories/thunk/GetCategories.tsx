import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


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
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.message || error.message);
            }
            // If it's not coming from axios then we write the error msg
            else {
                return rejectWithValue("Unexpected Error!");
            }
        }
    }
);


export default getCategories;