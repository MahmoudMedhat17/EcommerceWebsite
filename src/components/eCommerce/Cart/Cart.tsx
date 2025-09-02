import Headingcomponent from "@/components/eCommerce/HeadingComponent/Headingcomponent";
import Subtotal from "@/components/eCommerce/Cart/Subtotal";
import { LoadingComponent } from "@/components/feedback";
import CartList from "@/components/eCommerce/Cart/CartList";
import getCartItems from "@/store/cart/thunk/getCartItems";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useCallback } from "react";
import { changeQuantityState, removeItems, clearCart } from "@/store/cart/cartSlice";




const Cart = () => {

    const dispatch = useAppDispatch();
    const { items, loading, error, productDetails } = useAppSelector((state) => state.cart);

    useEffect(() => {
        dispatch(getCartItems());
    }, [dispatch]);


    // Here i want to get the productDetails from the cartSlice but with the quantity so i get all the props inside the productDetails and with quantity of each item inside the cart.
    const products = productDetails.map((product) => (
        {
            // Here we get all the props from the productDetails.
            ...product,
            // Here we want to get the quantity of each item by using items coming from the cartSlice with each product id.
            quantity: items[product.id || 0]
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

    return (
        <>
            <Headingcomponent>
                Your Cart
            </Headingcomponent>
            {
                /* If the cart has no items inside it then show that the cart is empty, if it has items inside it then show the cartList component. */
                productDetails.length === 0 ?
                    (
                        <p className="font-semibold text-4xl text-center">Cart is Empty!</p>
                    )
                    :
                    (
                        <LoadingComponent status={loading} error={error}>
                            {/* Here we create a component that holds all the cartItems and pass the products we get from the cartSlice to it so we can use the props of this slice inside this component. */}
                            <CartList products={products} changeQuantity={changeQuantity} deleteItems={deleteItems}/>
                            {/* This a component for subTotal amount */}
                            {/* Here we pass products that holds productDetails array coming from the cartSlice and pass it's data to Subtotal component.*/}
                            <Subtotal products={products}/>
                            <button onClick={handleClearCart} className="bg-gray-500 text-white px-4 md:px-8 py-2 hover:bg-red-600 duration-300 cursor-pointer rounded-md w-[100px] sm:w-[200px] mt-4">Clear</button>
                        </LoadingComponent>
                    )
            }
        </>
    )
}

export default Cart;