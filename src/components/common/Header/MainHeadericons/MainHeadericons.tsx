import Headericons from "@/components/common/Header/Headericons/Headericons";
import { useAppSelector } from "@/store/hooks";
import { useState, useEffect } from "react";
import { getTotalQuantitySelector } from "@/store/cart/cartSlice";
import CartIcon from "@/assets/svg/cart.svg?react";
import WishlistIcon from "@/assets/svg/wishlist.svg?react";
import { type RootState } from "@/store";

const MainHeadericons = () => {
  const [animateCart, setAnimateCart] = useState(false);
  const [animateWishlist, setAnimateWishlist] = useState(false);
  const cartItems = useAppSelector(getTotalQuantitySelector);
  const wishlistItems = useAppSelector((state: RootState) => state.wishlist.itemsId.length);




  useEffect(() => {
    // Here if the cartItemsLength is 0 then prevent the animation if not then do the code under this condition.
    if (!cartItems) {
      return;
    };

    // Here we set setAnimate to true when the cartItemsLength cart changes it's value "User added a product".
    setAnimateCart(true);  //Start Animation.

    // Here is a time with setTimeOut to trigger the animation to start with 200ms. then set the cart animation back to it's normal state with setAnimate(false).
    const timer = setTimeout(() => setAnimateCart(false), 200); //End the Animation.

    // Here we clear the timeOut to avoid memory leaks and avoiding Unecessary UI updates by React.
    return () => clearTimeout(timer);
    // Here this useEffect depends on the state change of the cartItemsLength.
  }, [cartItems]);

  useEffect(() => {

    if (!wishlistItems) {
      return;
    };

    setAnimateWishlist(true);

    const debounce = setTimeout(() => setAnimateWishlist(false), 200);

    return () => clearTimeout(debounce);

  }, [wishlistItems]);



  // Initialzing the value with 0 to use it inside reduce function.
  // const initialValue = 0;
  // Here with totalQuantity variable we target the values of the object and then use reduce to calculate the value of the accumulator and the current value => currentVal = 0 next value is 2 then 2 + 0 = 2 then the currentVal is 2 and the next val is 4 then 2 + 4 = 6 so the currentVal is 6 and so on.
  // const totalQuantity = Object.values(cartItems).reduce((acc, currentVal) => (
  //   acc + currentVal
  // ), initialValue);

  // Here to handle setAnimate with true or false.
  const handleCartBtnAnimate = () => {
    setAnimateCart((prev) => !prev);
  };

  const handleWishlistBtnAnimate = () => {
    setAnimateWishlist((prev) => !prev);
  };

  return (
    <div className="flex items-center gap-4">
      <Headericons title={"Wishlist"} page={"/wishlist"} Icon={WishlistIcon} handleAnimateBtn={handleWishlistBtnAnimate} itemsLength={wishlistItems} animate={animateWishlist} />
      <Headericons title={"Cart"} page={"/cart"} Icon={CartIcon} handleAnimateBtn={handleCartBtnAnimate} itemsLength={cartItems} animate={animateCart} />
    </div>
  )
}

export default MainHeadericons;