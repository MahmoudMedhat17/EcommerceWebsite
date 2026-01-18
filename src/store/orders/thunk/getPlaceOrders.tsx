import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AxioserrorHandler from "@/utils/AxioserrorHandler";
import type { RootState } from "@/store";



const getPlaceOrder = createAsyncThunk("/orders/placeOrder",
    async (subTotal: number, thunkAPI) => {
        const { rejectWithValue, getState } = thunkAPI;

        // Here we want to get the cart to get the order props from it and auth to use it and target the user who ordered this order by the userId.
        const { cart, auth } = getState() as RootState;


        // Here we want to get the properties of each order "Product" such as => Title, img, price etc. and we get from the cart since it holds all the props inside an array called productDetails. 
        const orderItemsProps = cart.productDetails.map((product) => (
            {
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.img,
                // Here exlpanation for quantity => cart.items[product.id] means that the quantity is equal to the items inside the cart and the items object has and id and the quantity next to it for ex: id=1 :2 means that the product with id of 1 has two items of it quantity = 2 of that item, so this line means give me the quantity according to the id of each product the user ordered. so if it's product with id of 1 then the quantity of that product is 2!
                quantity: cart.items[product.id]
            }
        ));

        // Here is the object we pass to post METHOD that contains the order details such as the userId who ordered the order, items which is item detail itself such as title, img, price, etc. and the subTotal price of the whole order of the user.
        const orderPostData = {
            userId: auth.user?.id,
            items: orderItemsProps,
            subTotal
        };

        try {
            const res = await axios.post("http://localhost:5000/orders", orderPostData);
            console.log(res.data);

            return res.data;
        } catch (error) {
            return rejectWithValue(AxioserrorHandler(error));
        }
    }
);



export default getPlaceOrder;