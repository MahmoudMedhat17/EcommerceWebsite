import Headingcomponent from "@/components/eCommerce/HeadingComponent/Headingcomponent";
import Subtotal from "@/components/eCommerce/Cart/Subtotal";
import { LoadingComponent } from "@/components/feedback";
import CartList from "@/components/eCommerce/Cart/CartList";
import getCartItems from "@/store/cart/thunk/getCartItems";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useCallback } from "react";
import { changeQuantityState } from "@/store/cart/cartSlice";



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


    return (
        <>
            <Headingcomponent>
                Your Cart
            </Headingcomponent>
            {
                /* If the cart has no items inside it then show that the cart is empty, if it has items inside it then show the cartList component. */
                items.length === 0 ?
                    (
                        <p className="font-semibold text-4xl text-center">Cart is Empty!</p>
                    )
                    :
                    (
                        <LoadingComponent status={loading} error={error}>
                            {/* Here we create a component that holds all the cartItems and pass the products we get from the cartSlice to it so we can use the props of this slice inside this component. */}
                            <CartList products={products} changeQuantity={changeQuantity} />
                            {/* This a component for subTotal amount */}
                            <Subtotal />
                        </LoadingComponent>
                    )
            }
        </>
    )
}

export default Cart;