import { createSlice } from "@reduxjs/toolkit";
import getToggleLike from "@/store/wishlist/thunk/getToggleLike";
import getWishlist from "@/store/wishlist/thunk/getWishlist";

interface IWishlistState{
    itemsId:number[];
    productDetails: [];
    loading: 'Idle' | 'Pending' | 'Succeeded' | 'Failed';
    error: null | string;
};



const initialState : IWishlistState = {
    itemsId:[],
    productDetails:[],
    loading:"Idle",
    error:null,
};



const wishlistSlice = createSlice({
    name:"wishlist",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        // getToggleLike
        builder.addCase(getToggleLike.pending,(state)=>{
            state.error = null;
        });
        builder.addCase(getToggleLike.fulfilled,(state,action)=>{
            if(action.payload.type === "add"){
                state.itemsId.push(action.payload.id);
            }
            else{
                state.itemsId = state.itemsId.filter((product)=> product !== action.payload.id);
            }
        });
        builder.addCase(getToggleLike.rejected,(state,action)=>{
            if(action.payload && typeof action.payload === "string"){
                state.error = action.payload;
            }
        });

        // getWishlist
        builder.addCase(getWishlist.pending,(state)=>{
            state.loading = "Idle";
            state.error = null;
        });

        builder.addCase(getWishlist.fulfilled,(state,action)=>{
            state.loading = "Succeeded";
            state.productDetails = action.payload;
        });
        builder.addCase(getWishlist.rejected,(state,action)=>{
            state.loading = "Failed";
            if(action.payload && typeof action.payload === "string"){
                state.error = action.payload;
            }
        })
    }
});



export {getToggleLike};
export default wishlistSlice.reducer;