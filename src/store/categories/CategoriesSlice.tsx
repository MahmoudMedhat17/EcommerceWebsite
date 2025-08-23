import { createSlice } from '@reduxjs/toolkit';
import getCategories from '@/store/categories/thunk/GetCategories';
import type { TCategories } from "@/types/Categories";

// Here we define the data for records array is the data we get from the API, The Loading states with "Literal Types" and The error state with a string or null.
interface ICategories {
    records: TCategories[],
    loading: 'Idle' | 'Pending' | 'Succeeded' | 'Failed';
    error: string | null;
};

// Here we assign the ICategories interface to the initialState
const initialState: ICategories = {
    records: [],
    loading: "Idle",
    error: null
};

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    // ExtraReducers for API fetching data.
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state) => {
            // If the data is still pending then set the loading state as pending and error as null
            state.loading = "Pending";
            state.error = null;
        });
        builder.addCase(getCategories.fulfilled, (state, action) => {
            // Here if data fetching succeeded then fill the records array with that data.
            state.loading = "Succeeded";
            state.records = action.payload;
            state.error = null;
        });
        builder.addCase(getCategories.rejected, (state, action) => {
            // If the data fetching failed then show the custom error message coming from thunkApi from getCategories asyncThunk
            state.loading = "Failed";
            // Guard condition
            if (action.payload && typeof action.payload === "string") {
                state.error = action.payload;
            }
        })
    }
});


export default categoriesSlice.reducer;