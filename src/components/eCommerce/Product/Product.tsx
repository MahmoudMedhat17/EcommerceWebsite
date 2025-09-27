import type { TProducts } from "@/types/Products";
import { addToCart } from "@/store/cart/cartSlice";
import { useAppDispatch } from "@/store/hooks";
import { useEffect, useState, memo } from "react";

const Product = memo(({ id, title, price, img, max, quantity }: TProducts) => {

  const [isBtnDisabled, setIsBtnDisabled] = useState(false);

  // Here Initialize the productMaxReached with max value - the quantity of the item stored in the RTK store => max(4) - quantity(2) = 2.
  const productMaxReached = (max ?? 0) - (quantity ?? 0);
  // This variable is if productMaxReached = 0 then set it to true if not != 0 then it's false; so if it's true then show a msg that "You reached the max amount of this product!", if it's false then show this msg `You can add more of this product ${productMaxReached}`.
  const isMaxReached = productMaxReached == 0 ? true : false;

  useEffect(() => {
    // If this state is not clicked then don't show the animation or continue the code underneath this if statement.
    if (!isBtnDisabled) {
      return;
    };

    // If the state is true then do the effect with useEffect
    setIsBtnDisabled(true);

    // Here disable the animation after 200 ms.
    const debounce = setTimeout(() => setIsBtnDisabled(false), 200);


    // Clean the setTimeout after it finishes the animation.
    return () => clearTimeout(debounce);
  }, [isBtnDisabled]);

  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(id));
    setIsBtnDisabled(true);
  };


  return (
    <div className="space-y-2 w-fit">
      <img src={img} className="h-36 mx-auto" />
      <h2 className="font-semibold">{title}</h2>
      <h3 className="font-medium">{price} EGP</h3>
      <h4 className="font-normal text-xs">{isMaxReached ? "You reached the max amount of this product!" : `You can add more of this product ${productMaxReached}`}</h4>
      <div className="flex items-center justify-center">
        <button disabled={isBtnDisabled || isMaxReached} className="px-4 py-2 bg-blue-400 rounded-md hover:to-blue-700 duration-300 cursor-pointer text-lg font-semibold" onClick={handleAddToCart}>
          {/* Here if the isBtnDisabled is true then the animation shows "Loading...", if it's not true then show "Add to cart" */}
          {isBtnDisabled ? "Loading..." : "Add to cart"}
        </button>
      </div>
    </div>
  )
});

export default Product;