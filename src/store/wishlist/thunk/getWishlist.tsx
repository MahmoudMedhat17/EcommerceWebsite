import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AxioserrorHandler from '@/utils/AxioserrorHandler';
import type { TProducts } from '@/types/Products';
import type { RootState } from '@/store';

// Trying to change the id from string to number.
interface IWishlistProps{
    id:number;
    userId:number;
    productId:string;
};


type TDataType = "productsDetails" | "productsIds";

const getWishlist = createAsyncThunk("wishlist/getWihslist",
    async(dataType:TDataType,thunkAPI)=>{
        // Here signal is for Http request cancellation.
        const { rejectWithValue, signal, getState} = thunkAPI;


        const {auth} = getState() as RootState;

        // Need to separate the IDS of the products and the full products info to display them differently according to the user who is signed in.
        try {

            // Here we get the wishlist products the user with ID = 1 liked.
            const userWishlist = await axios.get(`/wishlist?userId=${auth.user?.id}`,{signal:signal});

            console.log(userWishlist)

            if(!userWishlist.data.length){
                return{data:[],dataType:dataType};
            };
            
            // console.log(userWishlist.data);

            // Here we map over the userWishlist to get only the productIds.
            const userWishlistItemsIds = userWishlist.data.map((product:IWishlistProps)=>(
                product.productId
            ));

            console.log(userWishlistItemsIds)
            
            if(dataType === "productsIds"){
                return {data:userWishlistItemsIds, dataType:"productsIds"};
            }
            else{
                // Here we call the products to target the IDS of the products.
                const allProducts = await axios.get("/products");

                console.log(allProducts)
                // Here we filter the IDS of the products to match the productId of each product liked in the wishlist so this userWishlistProducts variable returns only the liked products in the wishlist to display them in the wishlist.
                const userWishlistAllProducts = allProducts.data.filter((product:TProducts)=>(
                    userWishlistItemsIds.includes(product.id)
                ));

                console.log(userWishlistAllProducts)

                return {data:userWishlistAllProducts, dataType:"productsDetails"};
            }
        } catch (error) {
            return rejectWithValue(AxioserrorHandler(error));
        }
    }
);


export default getWishlist;