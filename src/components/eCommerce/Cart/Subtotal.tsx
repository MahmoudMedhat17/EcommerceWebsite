import type { TProducts } from "@/types/Products";



type subtTotalProps = {
    products:TProducts[]
};



const Subtotal = ({products}:subtTotalProps) => {
    
    // We get the products data coming from Cart component to use it here and calculate the price and the quantity of the products.

    // Here we use reduce function to calculate the subTotal of the products in the cart.
    const subtotalPrice = products.reduce((acc,product)=>{
        // We get the product price and intialize it to productPrice constant.
        const productprice = product.price ?? 0;
        // We get the product quantity and intialize it to productQuantity constant.
        const productQuantity = product.quantity ?? 0;
        

        // Here we return the accumlator => 0 to the product price multiplied by it's quantity.
        return acc + productprice * productQuantity;
    },0);
    
    
    return (
        <div className="flex justify-between items-center">
            <span className="font-semibold text-lg md:text-xl">
                Subtotal:
            </span>
            <span className="text-md md:text-lg font-semibold">
                {subtotalPrice.toFixed(2)} EGP
            </span>
        </div>
    )
}

export default Subtotal;