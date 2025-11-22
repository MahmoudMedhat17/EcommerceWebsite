import type { TProducts } from "@/types/Products";
import { useEffect } from "react";



type subtTotalProps = {
    products: TProducts[];
    onSubTotal: (value:number) => void;
};



const Subtotal = ({products, onSubTotal}:subtTotalProps) => {
    
    // We get the products data coming from Cart component to use it here and calculate the price and the quantity of the products.

    // Here we use reduce function to calculate the subTotal of the products in the cart.
    const subtotalPrice = products.reduce((acc,product)=>{
        // We get the product price and intialize it to productPrice constant.
        const productprice = product.price ?? 0;
        // We get the product quantity and intialize it to productQuantity constant.
        const productQuantity = product.quantity ?? 0;
        

        // Here we return the accumlator => 0 to the product price multiplied by it's quantity.
        return acc + productprice * productQuantity;
    }, 0);
    


    // Here we want to return the subtotalPrice variable to the cart parent to use it there. So we create a state inside the cart component and then pass the setState from parent to here "Child" component and use useEffect to set the subtotalPrice variable to the setState coming from the cart component and with approach the state inside the cart component now contains what's inside the subtotalPrice variable.
    useEffect(() => {
        onSubTotal(subtotalPrice);
    },[subtotalPrice]);
    
    
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