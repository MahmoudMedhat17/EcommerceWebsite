import { createSlice } from "@reduxjs/toolkit";
import { isString, type TLoading, type TOrders } from "@/types";
import getPlaceOrder from "@/store/orders/thunk/getPlaceOrders";
import getOrders from "@/store/orders/thunk/getOrders";



interface Iorder {
    loading: TLoading,
    userOrders: TOrders[],
    error: string | null
};

const initialState: Iorder = {
    loading: "Idle",
    userOrders: [],
    error: null
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        resetOrderPlacement: (state) => {
            state.loading = "Idle";
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        // Place Order
        builder.addCase(getPlaceOrder.pending, (state) => {
            state.loading = "Pending";
            state.error = null;
        });
        builder.addCase(getPlaceOrder.fulfilled, (state) => {
            state.loading = "Succeeded";
            state.error = null;
        });
        builder.addCase(getPlaceOrder.rejected, (state, action) => {
            state.loading = "Failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        })

        // Get Orders
        builder.addCase(getOrders.pending, (state) => {
            state.loading = "Pending";
            state.error = null;
        });
        builder.addCase(getOrders.fulfilled, (state, action) => {
            state.loading = "Succeeded";
            state.userOrders = action.payload;
        });
        builder.addCase(getOrders.rejected, (state, action) => {
            state.loading = "Failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        })
    },
});

export const { resetOrderPlacement } = orderSlice.actions;
export default orderSlice.reducer;
