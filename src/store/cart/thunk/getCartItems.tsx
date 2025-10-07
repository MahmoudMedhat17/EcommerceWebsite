import type { RootState } from '@/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AxioserrorHandler from '@/utils/AxioserrorHandler';

const getCartItems = createAsyncThunk(
    "products/getCartItems", async (_, thunkAPI) => {

        // Here we call rejectWithValue & getState & fulfillWithValue & signl for Http request cancellation from thunkAPI.
        const { rejectWithValue, getState, fulfillWithValue, signal } = thunkAPI;
        const state = getState() as RootState;
        // Here we get the current state of the store of the cart.items.
        const cart = state.cart.items;

        // Here we get the id of each product in the object of the cart items => {id:1, product:"test"} => we get the id = 1.
        const items = Object.keys(cart);

        // Here we map over the ids we got from the object that holds the cart items and loop around them and then add each of them with "&" so they well look like this => id="1"&id="2"&id="3".
        const productIds = items.map((productId) => (`id=${productId}`)).join("&");

        if (!items.length) {
            return fulfillWithValue([]);
        };


        // Here with Try & Catch we call the API data using axios and handle the errors.
        try {
            // Get the data of /products with the modified ids we created above => productIds.
            const res = await axios.get(`/products?${productIds}`,{signal:signal});

            // Here we assign data variable with data coming from the API. 
            let data = res.data;

            if (typeof data === "string") {
                try {
                    data = JSON.parse(data);
                } catch {
                    return data = [];
                }
            };


            // Here a check if data is not an array then return it as an array.
            if (!Array.isArray(data)) {
                return data = [];
            };

            return data;
        } catch (error) {
            return rejectWithValue(AxioserrorHandler(error));
        }

    }
)


export default getCartItems;




