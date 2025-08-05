import { createSlice } from '@reduxjs/toolkit';
import type { TProducts } from '@/types/Products';


interface IcartSlice {
    // Here we make sure with index signature that items object recieves an id as a number only.
    items: { [key: string]: number };
    // Here productDetails includes all the props coming from TProducts.
    productDetails: TProducts[];
};


const initialState: IcartSlice = {
    items: {},
    productDetails: []
};


export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            // Here we get the ID from that we gonna use to fire the action of adding item to the cart.
            const id = action.payload.id;

            // Check if the id of the products already exists in the cart "items" if so then increase this product with 1 so this item be included two times inside the cart "The user added to the cart twice and so on".
            if (state.items[id]) {
                state.items[id]++;
            }
            // If the id of the product doesn't exist in the cart "items" then this product is new so change it's id to 1 as it's added for the first time and when the user wants to add again then the first condition gonna work.
            else {
                state.items[id] = 1;
            }
        }
    }
});




export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;