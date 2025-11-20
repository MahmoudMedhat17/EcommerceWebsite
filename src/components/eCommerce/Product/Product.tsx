import type { TProducts } from "@/types/Products";
import { addToCart } from "@/store/cart/cartSlice";
import { useAppDispatch } from "@/store/hooks";
import { useEffect, useState, memo } from "react";
import getToggleLike from "@/store/wishlist/thunk/getToggleLike";
import { SpinnerCircular } from 'spinners-react';
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import Modals from "@/utils/Modals";
import {ProductInfo} from "@/components/eCommerce/index";



const Product = memo(({ id, title, price, img, max, quantity, liked, isAuthenticated }: TProducts) => {

  const [isBtnDisabled, setIsBtnDisabled] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);


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

  const handleLikeToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Here we make sure with this condition that if the user is Authenticated or not if yes then he can like the products, if not then a modal appears saying "you should log in first.".
    if (isAuthenticated) {
      if (isLoading) {
        return;
      };
      e.preventDefault();
      e.stopPropagation();
      setIsLoading(true);
      dispatch(getToggleLike(id))
      console.log(id, "Working");
    }
    // If the user is not Authenticated then show the Modal model.
    else {
      setShowModal(true);
    }
  };

  return (
    <>
      {showModal && <Modals setShowModal={setShowModal} />}
        <ProductInfo title={title} image={img} price={price} direction="column">
          <h4 className="font-normal text-xs">{isMaxReached ? "You reached the max amount of this product!" : `You can add more of this product ${productMaxReached}`}</h4>
          <div className="flex items-center justify-center mt-4">
            <button disabled={isBtnDisabled || isMaxReached} className="w-full px-4 py-2 bg-blue-400 rounded-md hover:to-blue-700 duration-300 cursor-pointer text-lg font-semibold" onClick={handleAddToCart}>
              {/* Here if the isBtnDisabled is true then the animation shows "Loading...", if it's not true then show "Add to cart" */}
              {isBtnDisabled ? "Loading..." : "Add to cart"}
            </button>
          </div>
          <button className='absolute top-1 right-0.5 sm:right-1' type='button' onClick={handleLikeToggle}>
            {
              isLoading ?
                (
                  <SpinnerCircular size={20} thickness={100} speed={100} color="#2B7FFF" />
                )
                :
                liked ?
                  (
                    <FcLike className="cursor-pointer" />
                  )
                  :
                  (
                    <FcLikePlaceholder className="cursor-pointer" />
                  )
            }
          </button>
        </ProductInfo>
    </>
  )
});

export default Product;