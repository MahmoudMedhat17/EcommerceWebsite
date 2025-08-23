import type { TProducts } from "@/types/Products";
import Cartitem from "@/components/eCommerce/Cart/Cartitem";


type cartItemsProps = {
    products: TProducts[]
};

// Here we get the props from the productDetails inside the cartSlice coming from the Cart component.
const CartList = ({ products }: cartItemsProps) => {
    return (
        // Then here we map over the products props and pass them props to the Cartitem component so we can use them inside the Cartitem component.
        <>
            {
                products.map((product) => (
                    <Cartitem key={product.id} title={product.title} price={product.price} image={product.img} />
                ))
            }
        </>
    )
}

export default CartList;