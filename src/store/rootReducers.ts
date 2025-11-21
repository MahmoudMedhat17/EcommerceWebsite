import categoriesSlice from "@/store/categories/categoriesSlice";
import productsSlice from "@/store/products/productsSlice";
import cartSlice from '@/store/cart/cartSlice';
import wishlistSlice from "@/store/wishlist/wishlistSlice";
import authSlice from "@/store/auth/authSlice";
import ordersSlice from "@/store/orders/OrdersSlice";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 


// Here is the nomral config
const rootPersistConfig = {
    key:"root",
    storage,
    whitelist:["cart","auth"]
};

// Here we target the items to be only cached from the cart and not all the cart "Items & productsInfo array".
const cartPersistConfig = {
    key:"cart",
    // Here we choose Web storage.
    storage,
    // Here we choose to cache items only from the cart.
    whitelist:["items"]
};

const wishlistPersistConfig = {
    key:"wishlist",
    storage,
    whitelist:["itemsId"]
};

const authPersistConfig = {
    key:"auth",
    storage,
    whitelist:["user", "accessToken"]
};

// Here we combine reducers to use them in configureStore.
const rootReducers = combineReducers({
    categories: categoriesSlice,
    products: productsSlice,
    orders: ordersSlice,
    // Here we apply persistReducer to cart as we want to cache the items inside the cart.
    cart:persistReducer(cartPersistConfig, cartSlice),
    wishlist:persistReducer(wishlistPersistConfig, wishlistSlice),
    auth:persistReducer(authPersistConfig, authSlice)
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducers)


export default persistedReducer;