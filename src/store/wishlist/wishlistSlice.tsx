import { createSlice } from '@reduxjs/toolkit';
import getToggleLike from '@/store/wishlist/thunk/getToggleLike';
import getWishlist from '@/store/wishlist/thunk/getWishlist';
import type {TProducts} from "@/types/Products";

interface IinitialStateprops{
    itemsId:number[];
    productDetails: TProducts[];
    loading: 'Idle' | 'Pending' | 'Succeeded' | 'Failed';
    error: null | string;
};


const initialState:IinitialStateprops={
    itemsId:[],
    productDetails:[],
    loading:"Idle",
    error:null
};

const wishlistSlice = createSlice({
    name:"wishlist",
    initialState,
    reducers:{
        // Need this clean when user logs out only.
        cleanWishlistProductDetails:(state)=>{
            state.productDetails = []
        }
    },
    extraReducers:(builder)=>{
        // getToggleLike
        builder.addCase(getToggleLike.pending,(state)=>{
            state.error = null;
        });
        builder.addCase(getToggleLike.fulfilled,(state,action)=>{
            // Here we make a condition if the action is equal to "Add" then this means that to add the item to wishlist (Liked).
            if(action.payload.type === "add"){
                state.itemsId.push(action.payload.id);
            }
            // If not then this means to remove the item from the wishlist (Unlike).
            else{
                state.itemsId = state.itemsId.filter((product)=> product !== action.payload.id);
                // Here to remove the product when disliked from the wishlist UI.
                state.productDetails = state.productDetails.filter((product)=> product.id !== action.payload.id);
            }
        });
        builder.addCase(getToggleLike.rejected,(state,action)=>{
            if(action.payload && typeof action.payload === "string"){
                state.error = action.payload;
            }
        });

        // getWishlist
        builder.addCase(getWishlist.pending,(state)=>{
            state.loading = "Pending";
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



export const {cleanWishlistProductDetails} = wishlistSlice.actions;
export default wishlistSlice.reducer;
