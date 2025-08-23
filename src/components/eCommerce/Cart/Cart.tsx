import Headingcomponent from "@/components/eCommerce/HeadingComponent/Headingcomponent";
import Subtotal from "@/components/eCommerce/Cart/Subtotal";
import getCartItems from "@/store/cart/thunk/getCartItems";
import { LoadingComponent } from "@/components/feedback";
import CartList from "@/components/eCommerce/Cart/CartList";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";



const Cart = () => {

    const dispatch = useAppDispatch();
    const { items, loading, error, productDetails } = useAppSelector((state) => state.cart);

    useEffect(() => {
        dispatch(getCartItems());
    }, [dispatch, items]);


    // Here i want to get the productDetails from the cartSlice but with the quantity so i get all the props inside the productDetails and with quantity of each item inside the cart.
    const products = productDetails.map((product) => (
        {
            // Here we get all the props from the productDetails.
            ...product,
            // Here we want to get the quantity of each item by using items coming from the cartSlice with each product id.
            quantity: items[product.id || 0]
        }
    ));

    return (
        <>
            <Headingcomponent>
                Cart
            </Headingcomponent>
            <LoadingComponent status={loading} error={error}>
                {/* Here we create a component that holds all the cartItems and pass the products we get from the cartSlice to it so we can use the props of this slice inside this component. */}
                <CartList products={products} />
                <Subtotal />
            </LoadingComponent>
        </>
    )
}

export default Cart;