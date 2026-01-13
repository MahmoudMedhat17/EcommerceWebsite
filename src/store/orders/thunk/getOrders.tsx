import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AxioserrorHandler from '@/utils/AxioserrorHandler';
import { type RootState } from '@/store';


const getOrders = createAsyncThunk("orders/getOrders", async (_, thunkAPI) => {
    const { rejectWithValue, signal, getState } = thunkAPI;
    const { auth } = getState() as RootState;

    const userId = auth.user?.id;

    console.log(userId, "This is the user ID");

    try {
        const res = await axios.get(`http://localhost:5000/orders?userId=${userId}`, { signal });
        console.log(res.data);
        return res.data;
    } catch (error) {
        return rejectWithValue(AxioserrorHandler(error));
    }
});


export default getOrders;