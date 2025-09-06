import { createSlice } from '@reduxjs/toolkit';
import getToggleLike from './thunk/getLikeToggle';


interface IWishlistState{
    itemsId:number[],
    error:null | string
};


const initialState: IWishlistState = {
    itemsId:[],
    error:null
};



const wishlistSlice = createSlice({
    name:"wishlist",
    initialState,
    reducers:{},
    // Need to apply the getToggleLike pending, fulfiled, rejected status.
    extraReducers:(builder)=>{

    }
    }
});





export default wishlistSlice.reducer;