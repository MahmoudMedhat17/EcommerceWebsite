import categoriesSlice from "@/store/categories/categoriesSlice";
import productsSlice from "@/store/products/productsSlice";
import cartSlice from '@/store/cart/cartSlice';
import wishlistSlice from "@/store/wishlist/wishlist";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 


// Here is the nomral config
// const rootPersistConfig = {
//   key: 'root',
//   storage,
//   whitelist:["cart"]
// };

// Here we target the items to be only cached from the cart and not all the cart "Items & productsInfo array".
const cartPresistConfig = {
    key:"cart",
    // Here we choose Web storage.
    storage,
    // Here we choose to cache items only from the cart.
    whitelist:["items"]
};

// Here we combine reducers to use them in configureStore.
const rootReducers = combineReducers({
    categories: categoriesSlice,
    products:productsSlice,
    // Here we apply persistReducer to cart as we want to cache the items inside the cart.
    cart:persistReducer(cartPresistConfig, cartSlice),
    wishlist: wishlistSlice
});

export default rootReducers;