import { createSlice, createSelector } from '@reduxjs/toolkit';
import type { TProducts } from '@/types/Products';
import type { RootState } from '@/store/index';
import getCartItems from './thunk/getCartItems';

interface IcartSlice {
    // Here we make sure with index signature that items object recieves an id as a number only.
    items: { [key: string]: number };
    // Here productDetails includes all the props coming from TProducts.
    productDetails: TProducts[];
    loading: 'Idle' | 'Pending' | 'Succeeded' | 'Failed';
    error: string | null;
};



const initialState: IcartSlice = {
    items: {},
    productDetails: [],
    loading: "Idle",
    error: null
};



export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            // Here we get the ID from that we gonna use to fire the action of adding item to the cart.
            const id = action.payload;

            // Check if the id of the products already exists in the cart "items" if so then increase this product with 1 so this item be included two times inside the cart "The user added to the cart twice and so on".
            if (state.items[id]) {
                state.items[id]++;
            }
            // If the id of the product doesn't exist in the cart "items" then this product is new so change it's id to 1 as it's added for the first time and when the user wants to add again then the first condition gonna work.
            else {
                state.items[id] = 1;
            }
        },
        // This reducer is for changing the quantity state that is used to dispatch it inside the cart page.
        changeQuantityState: (state, action) => {
            // Here we set the state of the item we want to change the quantity using it's ID and provide the ID with the new quantity amount.
            state.items[action.payload.id] = action.payload.quantity;
        },
        // This action is to remove an item from the cart.
        removeItems:(state,action)=>{
            // Here we target the id of the product and set into a variable instead of writing everytime action.payload.id.
            const targetItem = action.payload.id;
            // delete is a JS operator that removes the property from the Object. so Here we want to remove the item from the cart by it's ID "targetItem".
            delete state.items[targetItem];
            // Here we use filter method around productDetails array to remove the matched id of the chosen product to be deletd from the array.
            state.productDetails =  state.productDetails.filter((item)=> item.id !== targetItem);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCartItems.pending, (state) => {
            state.loading = "Pending";
            state.error = null;
        });
        builder.addCase(getCartItems.fulfilled, (state, action) => {
            state.loading = "Succeeded";
            // Here intialize the productDetails array with the array coming from the API.
            state.productDetails = action.payload;
        });
        builder.addCase(getCartItems.rejected, (state, action) => {
            state.loading = "Failed";
            if (action.payload && typeof action.payload === "string") {
                // Here intialize the error with the error coming from the API.
                state.error = action.payload;
            }
        })
    }
});

// Here we used createSelector to memoize the state of the selector if the data is changed or not if it's changed then fire the function inside the selector if not then don't fire it.
const getTotalQuantitySelector = createSelector(
    // The purpose of RootState here to define that state is the same as useAppSelector because we don't use useAppSelector here.
    (state: RootState) => state.cart.items, (items) => {
        const initialVal = 0;
        const totalQuantity = Object.values(items).reduce((acc, currentVal) => (
            acc + currentVal
        ), initialVal)

        return totalQuantity;
    }
);



export { getTotalQuantitySelector };
export const { addToCart, changeQuantityState, removeItems } = cartSlice.actions;
export default cartSlice.reducer;