import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';





const getToggleLike = createAsyncThunk("getToggleLike/toggleLike",
    async(id:number, thunkAPI)=>{
        const {rejectWithValue} = thunkAPI;

        // Here we check if the user product is in wishlist(liked) or not(not liked);
        try {
            // Here we get the product inside the wishlist and then make a condition to like or dislike it from the API data.
            const productExist = await axios.get(`wishlist?userId=1&productId=${id}`);

            console.log(productExist.data)

            // Here if the product exists inside the wishlist ? then that means this condition should be dislike so we delete the product from the wishlist.
            if(productExist.data.length > 0){
                await axios.delete(`wishlist/${productExist.data[0].id}`);
                return {type:"remove", id};
            }
            // Here this condition means that the product is not in the wishlist so that we post the data to the API with the userId and the productID to be inside the wishlist and that means => Like.
            else{
                // Here is the object that contains the data of the product that should be inside the wishlist when the user likes it.
                const itemsLiked = {
                    userId:1,
                    id
                };

                const response = await axios.post(`wishlist`,itemsLiked);
                console.log(response.data)
                return {type:"add", id: response.data.id};
            }
        } catch (error) {
            if(axios.isAxiosError(error)){
                return rejectWithValue(error.response?.data.message || error.message);
            }
            else{
                return rejectWithValue("Unexpected Error!");
            }
        }
    }
);



export default getToggleLike;