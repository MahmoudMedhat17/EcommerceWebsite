import { createSlice } from '@reduxjs/toolkit';
import type {TProducts} from "@/types/Products";
import getProducts from '@/store/products/thunk/getProducts';


interface IProducts{
    records:TProducts[],
    loading:'Idle' | 'Pending' | 'Succeeded' | 'Failed';
    error: string | null;
};


const initialState:IProducts={
    records:[],
    loading:"Idle",
    error:null
};



const ProductsSlice = createSlice({
    name:"products",
    initialState,
    reducers:{
        // Here we clean the array "records" that holds the products when the user gets out of the products page and route to another page.
        productsCleanUp:(state)=>{
            state.records = []
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getProducts.pending,(state)=>{
            state.loading = "Idle";
            state.error = null;
        });
        builder.addCase(getProducts.fulfilled, (state,action)=>{
            state.records = action.payload;
            state.error = null;
        });
        builder.addCase(getProducts.rejected, (state,action)=>{
            state.loading = "Failed";
            if(action.payload && typeof action.payload === "string"){
                state.error = null;
            };
        });
    }
});



export const {productsCleanUp} = ProductsSlice.actions;
export default ProductsSlice.reducer;