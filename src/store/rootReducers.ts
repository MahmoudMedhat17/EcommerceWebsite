// rootReducers.ts (or index.ts)
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer, type PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import categoriesSlice from "@/store/categories/categoriesSlice";
import productsSlice from "@/store/products/productsSlice";
import cartSlice from '@/store/cart/cartSlice';
import wishlistSlice from "@/store/wishlist/wishlistSlice";
import authSlice from "@/store/auth/authSlice";
import ordersSlice from "@/store/orders/ordersSlice";

// 1. Combine all plain reducers
const rootReducer = combineReducers({
    categories: categoriesSlice,
    products: productsSlice,
    orders: ordersSlice,
    cart: cartSlice,
    wishlist: wishlistSlice,
    auth: authSlice,
});

// 2. Infer clean RootState from the plain combined reducer
export type RootState = ReturnType<typeof rootReducer>;

// 3. Root-level persist config (whitelist only the slices you want to persist)
const rootPersistConfig: PersistConfig<RootState> = {
    key: "root",
    storage,
    whitelist: ["cart", "auth", "wishlist"], // ← add wishlist here if you want it persisted
    // If you still want to persist only "items" inside cart, you can use transforms (more advanced)
    // But for now, this persists the whole cart slice (simple & usually fine)
};

// 4. Create persisted version
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export default persistedReducer;