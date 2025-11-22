import { createSlice } from '@reduxjs/toolkit';
import getToggleLike from '@/store/wishlist/thunk/getToggleLike';
import getWishlist from '@/store/wishlist/thunk/getWishlist';
import type { TProducts, TLoading} from "@/types/index";
import { authLogout } from '@/store/auth/authSlice';
import {isString} from '@/types/index';

interface IinitialStateprops{
    itemsId:number[];
    productDetails: TProducts[];
    loading: TLoading;
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
            
            if(action.payload.type === "add"){
                state.itemsId.push(action.payload.id);
            }
            else{
                state.itemsId = state.itemsId.filter((product)=> product !== action.payload.id);
                state.productDetails = state.productDetails.filter((product)=> product.id !== action.payload.id);
            }
        });
        builder.addCase(getToggleLike.rejected,(state,action)=>{
            if(isString(action.payload)){
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
            
            if(action.payload.dataType === "productsDetails"){
                state.productDetails = action.payload.data as TProducts[];
            }
            else if (action.payload.dataType === "productsIds"){
                state.itemsId = action.payload.data as number[];
            }
            else{
                state.productDetails = [];
                state.itemsId = [];
            }
        });
        builder.addCase(getWishlist.rejected,(state,action)=>{
            console.error("Error:", action.payload);
            state.loading = "Failed";
            if(isString(action.payload)){
                state.error = action.payload;
            }
        });
        
        builder.addCase(authLogout,(state)=>{
            state.itemsId = [];
            state.productDetails = [];
        });
    }
});

export const {cleanWishlistProductDetails} = wishlistSlice.actions;
export default wishlistSlice.reducer;