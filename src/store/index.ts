import { configureStore } from '@reduxjs/toolkit'

export const ReduxStore = configureStore({
  reducer: {},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof ReduxStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof ReduxStore.dispatch;