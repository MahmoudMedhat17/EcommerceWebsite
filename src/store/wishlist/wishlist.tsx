import { createSlice } from '@reduxjs/toolkit';
import getToggleLike from '@/store/wishlist/thunk/getToggleLike';


interface IWishlistState{
    itemsId:number[];
    error:null | string;
};


const initialState : IWishlistState ={
    itemsId:[],
    error: null
};

const wishlistSlice =createSlice({
    name:"wishlist",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
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
        })
    }
});


export default wishlistSlice.reducer;