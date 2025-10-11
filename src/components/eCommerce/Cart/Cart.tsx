import Headingcomponent from "@/components/eCommerce/HeadingComponent/Headingcomponent";
import { LoadingComponent } from "@/components/feedback";
import Subtotal from "@/components/eCommerce/Cart/Subtotal";
import CartList from "@/components/eCommerce/Cart/CartList";
import useCart from "@/hooks/useCart";
import {LottieHandler} from "@/components/feedback";

const Cart = () => {

    const {loading, products, productDetails, error, changeQuantity, deleteItems, handleClearCart} = useCart();


    return (
        <>
            <Headingcomponent title={"Your Cart"}/>
            {
                /* If the cart has no items inside it then show that the cart is empty, if it has items inside it then show the cartList component. */
                productDetails.length === 0 ?
                    (
                        <div className="flex flex-col justify-center items-center h-screen space-y-4">
                            <LottieHandler type="emptyAnimation" message="Your cart is empty!"/>
                        </div>
                    )
                    :
                    (
                        <LoadingComponent status={loading} error={error} loadingType="cart">
                            {/* Here we create a component that holds all the cartItems and pass the products we get from the cartSlice to it so we can use the props of this slice inside this component. */}
                            <CartList products={products} changeQuantity={changeQuantity} deleteItems={deleteItems}/>
                            {/* This a component for subTotal amount */}
                            {/* Here we pass products that holds productDetails array coming from the cartSlice and pass it's data to Subtotal component.*/}
                            <Subtotal products={products}/>
                            <button type="button" onClick={handleClearCart} className="bg-gray-500 text-white px-4 md:px-8 py-2 hover:bg-red-600 duration-300 cursor-pointer rounded-md w-[100px] sm:w-[200px] mt-4">Clear</button>
                        </LoadingComponent>
                    )
            }
        </>
    )
}

export default Cart;