import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { TProducts } from '@/types/Products';
import AxioserrorHandler from '@/utils/AxioserrorHandler';


interface IWishlistProps{
    id:string;
    userId:string;
    productId:string;
};


const getWishlist = createAsyncThunk("wishlist/getWihslist",
    async(_,thunkAPI)=>{
        const { rejectWithValue, fulfillWithValue} = thunkAPI;


        try {

            // Here we get the wishlist products the user with ID = 1 liked.
            const userWishlist = await axios.get(`/wishlist?userId=1`);
            
            // console.log(userWishlist.data);

            // Here we map over the userWishlist to get only the productIds.
            const userWishlistIds = userWishlist.data.map((product:IWishlistProps)=>product.productId);

            // console.log(userWishlistIds);

            // Here we call the products to target the IDS of the products.
            const allProducts = await axios.get(`/products`);

            // console.log(allProducts.data);

            // Here we filter the IDS of the products to match the productId of each product liked in the wishlist so this userWishlistProducts variable returns only the liked products in the wishlist to display them in the wishlist.
            const userWishlistProducts = allProducts.data.filter((product:TProducts)=>(
                userWishlistIds.includes(product.id)
            ));

            // console.log(userWishlistProducts);

            return fulfillWithValue(userWishlistProducts);
        } catch (error) {
            return rejectWithValue(AxioserrorHandler(error));
        }
    }
);


export default getWishlist;