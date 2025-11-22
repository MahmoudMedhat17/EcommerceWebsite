import { createSlice } from '@reduxjs/toolkit';
import getCategories from '@/store/categories/thunk/getCategories';
import type { TCategories, TLoading } from "@/types/index";
import {isString} from '@/types/index';

// Here we define the data for records array is the data we get from the API, The Loading states with "Literal Types" and The error state with a string or null.
interface ICategories {
    records: TCategories[],
    loading: TLoading;
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
    reducers: {
        cleanCategorySlice:(state)=>{
            state.records = []
        }
    },
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
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        })
    }
});

export const {cleanCategorySlice} = categoriesSlice.actions
export default categoriesSlice.reducer;