import getCartItems from "@/store/cart/thunk/getCartItems";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useCallback } from "react";
import { changeQuantityState, removeItems, clearCart, cleanCartSlice } from "@/store/cart/cartSlice";




const useCart = () => {
    
    const dispatch = useAppDispatch();
    const { items, loading, error, productDetails } = useAppSelector((state) => state.cart);
    const wishlistItems = useAppSelector((state) => state.wishlist.itemsId);
    const userAccessToken = useAppSelector((state) => state.auth.accessToken);

    useEffect(() => {
        const promise = dispatch(getCartItems());

        return ()=>{
            promise.abort();
            dispatch(cleanCartSlice());
        }
    }, [dispatch]);


    // Here i want to get the productDetails from the cartSlice but with the quantity so i get all the props inside the productDetails and with quantity of each item inside the cart.

    // Here i want to filter the productDetails to only get the products that the user has added to the cart only to prevent rendering the Products that the user didn't add in the cart.
    // By getting the product id in the items.
    const productsInCart = productDetails.filter((product)=> items[product.id]);

    // Here i loop over the filtered array with the products added to the cart only and not all the products, with this approach we make sure that there's no product is rendered inside the cart the user didn't add.
    const products = productsInCart.map((product)=>(
        {
            ...product,
            quantity: items[product.id || 0],
            liked: wishlistItems.includes(product.id)
        }
    ));


    //This is a function to dispatch the changeQuantityState action that includes the item id and it's quantity and then pass it as a props to the cartItem.
    // We used useCallback here to cache the data of items if not changed.
    const changeQuantity =useCallback((id: number, quantity: number)=>{
        dispatch(changeQuantityState({ id, quantity }));
    },[dispatch]);


    // Here we handle the deleteItems from the cart as the changeQuantity function to handle the cache of the items that is not changed.
    //This function is passed through to Cartitem as a props.
    const deleteItems =useCallback((id:number)=>{
        // removeItems coming from the cartSlice that takes the id of the item that should be removed.
        dispatch(removeItems({id}));
    },[dispatch]);


    // This function for dispatching the clearCart action coming from the cartSlice.
    const handleClearCart = () =>{
        dispatch(clearCart());
    };

    return { loading, products, productDetails, error, changeQuantity, deleteItems, handleClearCart, userAccessToken };
}

export default useCart