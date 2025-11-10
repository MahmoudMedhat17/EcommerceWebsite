import categoriesSlice from "@/store/categories/categoriesSlice";
import productsSlice from "@/store/products/productsSlice";
import cartSlice from '@/store/cart/cartSlice';
import wishlistSlice from "@/store/wishlist/wishlistSlice";
import authSlice from "@/store/auth/authSlice";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 


// Here is the nomral config
const rootPresistConfig = {
    key:"root",
    storage,
    whiteList:["cart","auth"]
};

// Here we target the items to be only cached from the cart and not all the cart "Items & productsInfo array".
const cartPresistConfig = {
    key:"cart",
    // Here we choose Web storage.
    storage,
    // Here we choose to cache items only from the cart.
    whitelist:["items"]
};

const wishlistPresistConfig = {
    key:"wishlist",
    storage,
    whitelist:["itemsId"]
};

const authPresistConfig = {
    key:"auth",
    storage,
    whiteList:["user", "accessToken"]
};

// Here we combine reducers to use them in configureStore.
const rootReducers = combineReducers({
    categories: categoriesSlice,
    products:productsSlice,
    // Here we apply persistReducer to cart as we want to cache the items inside the cart.
    cart:persistReducer(cartPresistConfig, cartSlice),
    wishlist:persistReducer(wishlistPresistConfig, wishlistSlice),
    auth:persistReducer(authPresistConfig, authSlice)
});

const presistedReducer = persistReducer(rootPresistConfig, rootReducers)


export default presistedReducer;