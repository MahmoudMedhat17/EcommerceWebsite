import { createSlice } from '@reduxjs/toolkit';
import type { TOrders, TLoading } from '@/types';
import getPlaceOrders from '@/store/orders/thunk/getPlaceOrders';
import getOrders from '@/store/orders/thunk/getOrders';
import { isString } from '@/types';


interface IOrders {
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
    reducers: {
        // Here we want to reset the state of the UI of the order page to "Idle" state and null, so it shows there's no order yet, u need to create an order.
        resetOrderPlacement: (state) => {
            state.loading = "Idle";
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        // Place Orders
        builder.addCase(getPlaceOrders.pending, (state) => {
            state.loading = "Pending";
            state.error = null;
        });
        builder.addCase(getPlaceOrders.fulfilled, (state) => {
            state.loading = "Succeeded";
            state.error = null;
        });
        builder.addCase(getPlaceOrders.rejected, (state, action) => {
            state.loading = "Failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });

        //Get orders
        builder.addCase(getOrders.pending, (state) => {
            state.loading = "Pending";
            state.error = null;
        });
        builder.addCase(getOrders.fulfilled, (state, action) => {
            state.loading = "Succeeded";
            state.orders = action.payload;
        });
        builder.addCase(getOrders.rejected, (state, action) => {
            state.loading = "Failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        })
    }
});




export const { resetOrderPlacement } = ordersSlice.actions;
export default ordersSlice.reducer;
