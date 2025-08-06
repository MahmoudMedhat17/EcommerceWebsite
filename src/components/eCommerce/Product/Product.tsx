import type { TProducts } from "@/types/Products";
import { addToCart } from "@/store/cart/cartSlice";
import { useAppDispatch } from "@/store/hooks";

const Product = ({ id, title, price, img }: TProducts) => {

  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(id));
  };


  return (
    <div className="space-y-2 w-fit">
      <img src={img} className="h-36 mx-auto" />
      <h2 className="font-semibold">{title}</h2>
      <h3 className="font-medium">{price} EGP</h3>
      <div className="flex items-center justify-center">
        <button className="px-4 py-2 bg-blue-400 rounded-md hover:to-blue-700 duration-300 cursor-pointer text-lg font-semibold" onClick={handleAddToCart}>
          Add to cart
        </button>
      </div>
    </div>
  )
}

export default Product;