import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AxioserrorHandler from '@/utils/AxioserrorHandler';
import type { RootState } from '@/store';


const getToggleLike = createAsyncThunk("wishlist/getToggleLike",
    async(id:number, thunkAPI)=>{
        const {rejectWithValue, getState} = thunkAPI;

        const {auth} = getState() as RootState;

        if(!auth.user?.id){
            return rejectWithValue("User is not found!");
        }

        // Here we check if the user product is in wishlist(liked) or not(not liked);

        try {
            // Here we get the product inside the wishlist and then make a condition to like or dislike it from the API data.
            const wishlistItems = await axios.get(`/wishlist?userId=${auth.user?.id}&productId=${id}`);
            // Need to fix productExist endpoint since the console returns the id as undefined.

            // Here if the product exists inside the wishlist ? then that means this condition should be dislike so we delete the product from the wishlist.
            if(wishlistItems.data.length > 0){
                const itemExists = wishlistItems.data[0].id;
                await axios.delete(`/wishlist/${itemExists}`);
                return {type:"remove", id};
            }
            // Here this condition means that the product is not in the wishlist so that we post the data to the API with the userId and the productID to be inside the wishlist and that means => Like.
            else{
                // Here is the object that contains the data of the product that should be inside the wishlist when the user likes it.
                // There was a bug here that i hardcoded the userId with value of 1 only and since it's equal to 1 only when any user other than the userId with value of 1 likes products, the products don't show in the wishlist for any user except the userId with value of 1.
                const itemLiked = {userId:auth.user.id,productId:id};
                await axios.post(`/wishlist`, itemLiked);
                return {type:"add", id};
            }
        } catch (error) {
            return rejectWithValue(AxioserrorHandler(error));
        }
    }
);



export default getToggleLike;