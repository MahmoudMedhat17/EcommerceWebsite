import { configureStore } from '@reduxjs/toolkit';
import categoriesSlice from "@/store/categories/categoriesSlice";
import productsSlice from "@/store/products/productsSlice";
import  cartSlice  from '@/store/cart/cartSlice';

export const ReduxStore = configureStore({
  reducer: {
    categories: categoriesSlice,
    products:productsSlice,
    cart:cartSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof ReduxStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof ReduxStore.dispatch;