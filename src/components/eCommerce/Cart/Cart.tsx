import Headingcomponent from "@/components/eCommerce/HeadingComponent/Headingcomponent";
import { LoadingComponent } from "@/components/feedback";
import Subtotal from "@/components/eCommerce/Cart/Subtotal";
import CartList from "@/components/eCommerce/Cart/CartList";
import useCart from "@/hooks/useCart";
import { LottieHandler } from "@/components/feedback";
import { useAppDispatch } from "@/store/hooks";
import OrdersModal from "@/utils/OrdersModal";
import { useState } from "react";
import getPlaceOrders from "@/store/orders/thunk/getPlaceOrders";
import { clearCart } from "@/store/cart/cartSlice";

const Cart = () => {

    const [subTotal, setSubTotal] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const dispatch = useAppDispatch();
    const { loading, products, productDetails, error, changeQuantity, deleteItems, handleClearCart, userAccessToken, orderLoading, orderError } = useCart();


    const handleModal = () => {
        setShowModal(!showModal);
    };

    // This function is to handle placing an order with getOrders syncThunk.
    const handlePlaceOrder = () => {
        dispatch(getPlaceOrders(subTotal)).unwrap().then(() => {
            // Here we dispatch clearCart to clear the cart after the user orders something.
            dispatch(clearCart());
            // Here we call handleModal function to close the Modal when the user confirm the order. So with this we close the Modal automatically.
            handleModal();
        });
    };


    return (
        <>
            <Headingcomponent title={"Your Cart"} />
            {
                /* If the cart has no items inside it then show that the cart is empty, if it has items inside it then show the cartList component. */
                productDetails.length === 0 ?
                    (
                        <div className="flex flex-col justify-center items-center h-screen space-y-4">
                            {/* Here with orderLoading coming from ordersSlice we decide to show which animation good for the message shown to the user. */}
                            {
                                // If orderLoading is === "Succeeded" state then show the animation of approve "successAnimation" and msg with "Order is placed successfully".
                                orderLoading === "Succeeded" ?
                                    <LottieHandler type="successAnimation" message="Your order has been succesfully placed!" />
                                    :
                                    // If orderLoading === "Idle" means the order has been placed already then show to the user an animation of the cart is empty and msg of the cart is empty so he can order a new order again.
                                    <LottieHandler type="emptyAnimation" message="Your cart is empty!" />
                            }
                        </div>
                    )
                    :
                    (
                        <LoadingComponent status={loading} error={error} loadingType="cart">
                            {/* Here we create a component that holds all the cartItems and pass the products we get from the cartSlice to it so we can use the props of this slice inside this component. */}
                            <CartList products={products} changeQuantity={changeQuantity} deleteItems={deleteItems} />
                            {/* This a component for subTotal amount */}
                            {/* Here we pass products that holds productDetails array coming from the cartSlice and pass it's data to Subtotal component.*/}
                            <Subtotal products={products} onSubTotal={setSubTotal} />
                            <div className="flex gap-2 mt-4">
                                <button type="button" onClick={handleClearCart} className="bg-gray-500 text-white px-4 md:px-8 py-2 hover:bg-red-600 duration-300 cursor-pointer rounded-md w-[100px] sm:w-[200px]">Clear</button>
                                {/* Here userAccessToken is for checking for if the the user is logged in then he can see and place an order. If not then the button disappears. */}
                                {
                                    userAccessToken && <button onClick={handleModal} type="button" className="bg-blue-500 text-black px-4 md:px-8 py-2 hover:bg-blue-500/95 duration-300 cursor-pointer rounded-md w-[100px] sm:w-[200px]">Place Order</button>
                                }
                            </div>
                            {/* Here if showModal is === true then show the OrdersModal to the user. */}
                            {
                                showModal && <OrdersModal handleModal={handleModal} handlePlaceOrder={handlePlaceOrder} subTotal={subTotal} orderLoading={orderLoading} />
                            }
                            {/* If there's an error coming from the ordersSlice then show a message error. */}
                            {
                                orderError && <p className="text-red-500 text-center mx-auto">{orderError}</p>
                            }
                        </LoadingComponent>
                    )
            }
        </>
    )
}

export default Cart;