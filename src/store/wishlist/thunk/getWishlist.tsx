import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';




const getWishlist = createAsyncThunk("wishlist/getWishlist",
    async(_,thunkAPI)=>{
        const {fulfillWithValue, rejectWithValue} = thunkAPI;


        try {
            // Here we need to get the id of the items inside the wishlist that the userId liked.
            const userWishlist = await axios.get(`/wishlist?userId=1`);

            // Here if there's no items inside the wishlist then return an empty array.
            if(!userWishlist.data.length){
                return fulfillWithValue([]);
            };

            // Here we get the id of the items and concate them together to be as => id=1&id=2&id=3 and so on this is of filtering id's using query params.
            const userWishlistIds = userWishlist.data.map((item:number)=> `id=${item}`).join("&");

            // Here we get the products with the id of the items inside the wishlist of the user.
            const res = await axios.get(`/products/${userWishlistIds}`);
            console.log(res.data);
            return res.data;

        } catch (error) {
            if(axios.isAxiosError(error)){
                const errorMessage = error?.response?.data.message || error.message || "Network Error";
                return rejectWithValue(errorMessage);
            }
            else{
                const errorMessage = "Unexpected Error!";
                return rejectWithValue(errorMessage);
            }
        }
    }
);



export default getWishlist;
