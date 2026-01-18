import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AxioserrorHandler from "@/utils/AxioserrorHandler";
import type { RootState } from "@/store";



const getOrders = createAsyncThunk("/orders/getOrders", async (_, thunkAPI) => {
    const { rejectWithValue, getState, signal } = thunkAPI;

    const { auth } = getState() as RootState;

    try {
        const res = await axios.get(`http://localhost:5000/orders?userId=${auth.user?.id}`, { signal });
        console.log(res.data);
        return res.data;
    } catch (error) {
        return rejectWithValue(AxioserrorHandler(error));
    }
});


export default getOrders;