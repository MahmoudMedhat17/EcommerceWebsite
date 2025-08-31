import type { TProducts } from "@/types/Products";
import Cartitem from "@/components/eCommerce/Cart/Cartitem";


// This type is for TProducts and for the function coming as props from Cart.
type cartItemsProps = {
    products: TProducts[],
    changeQuantity: (id: number, quantity: number) => void;
    deleteItems:(id:number)=>void;
};

// Here we get the props from the productDetails inside the cartSlice coming from the Cart component.
const CartList = ({ products, changeQuantity, deleteItems }: cartItemsProps) => {
    return (
        // Then here we map over the products props and pass them props to the Cartitem component so we can use them inside the Cartitem component.
        <>
            {
                products.map((product) => (
                    <Cartitem key={product.id} id={product.id} title={product.title} price={product.price} img={product.img} quantity={product.quantity} max={product.max} changeQuantity={changeQuantity} deleteItems={deleteItems}/>
                ))
            }
        </>
    )
}

export default CartList;