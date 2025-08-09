import { createSlice, createSelector } from '@reduxjs/toolkit';
import type { TProducts } from '@/types/Products';
import type { RootState } from '@/store/index';


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

// Here we used createSelector to memoize the state of the selector if the data is changed or not if it's changed then fire the function inside the selector if not then don't fire it.
const getTotalQuantitySelector = createSelector(
    // The purpose of RootState here to define that state is the same as useAppSelector becuase we don't use useAppSelector here.
    (state: RootState) => state.cart.items, (items) => {
        const initialVal = 0;
        const totalQuantity = Object.values(items).reduce((acc, currentVal) => (
            acc + currentVal
        ), initialVal)

        return totalQuantity;
    }
);



export { getTotalQuantitySelector };
export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;