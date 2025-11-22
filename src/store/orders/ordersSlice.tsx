import { createSlice } from '@reduxjs/toolkit';
import type { TOrders ,TLoading } from '@/types';
import getOrders from '@/store/orders/thunk/getOrders';
import {isString} from '@/types';


interface IOrders{
    loading: TLoading;
    orders: TOrders[];
    error: string | null;
};


const initialState: IOrders = {
    loading: "Idle",
    orders: [],
    error: null
};


const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getOrders.pending, (state) => {
            state.loading = "Pending";
            state.error = null;
        });
        builder.addCase(getOrders.fulfilled, (state) => {
            state.loading = "Succeeded";
            state.error = null;
        });
        builder.addCase(getOrders.rejected, (state, action) => {
            state.loading = "Failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        })
    }
});





export default ordersSlice.reducer;
