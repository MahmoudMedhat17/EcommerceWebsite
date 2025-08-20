import Headingcomponent from "../HeadingComponent/Headingcomponent";
import Cartitem from "@/components/eCommerce/Cart/Cartitem";
import Subtotal from "@/components/eCommerce/Cart/Subtotal";

const Cart = () => {
    return (
        <>
            <Headingcomponent>
                Cart
            </Headingcomponent>
            <div>
                <Cartitem />
                <Cartitem />
                <Cartitem />
                <Subtotal />
            </div>
        </>
    )
}

export default Cart;