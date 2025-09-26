import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



const getToggleLike = createAsyncThunk("wishlist/getToggleLike",
    async(id:number, thunkAPI)=>{
        const {rejectWithValue} = thunkAPI;


        // Here we check if the user product is in wishlist(liked) or not(not liked);

        try {
            // Here we get the product inside the wishlist and then make a condition to like or dislike it from the API data.
            const wishlistItems = await axios.get(`/wishlist?userId=1&productId=${id}`);
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
                const itemLiked = {userId:1,productId:id};
                await axios.post(`/wishlist`, itemLiked);
                return {type:"add", id};
            }
        } catch (error) {
            if(axios.isAxiosError(error)){
                const errorMessage = error.response?.data.message || error.message || "Network Error";
                return rejectWithValue(errorMessage);
            }
            else{
                const errorMessage = "Unexpected Error";
                return rejectWithValue(errorMessage);
            }
        }
    }
);



export default getToggleLike;