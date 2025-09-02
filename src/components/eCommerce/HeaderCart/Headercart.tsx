import CartIcon from "@/assets/svg/cart.svg?react";
import { useAppSelector } from "@/store/hooks";
import { getTotalQuantitySelector } from "@/store/cart/cartSlice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Headercart = () => {

  const [animate, setAnimate] = useState(false);
  // Here we use useNavigate to route instead of using Link to avoid the user to click on a button.
  const navigate = useNavigate();

  // There is a better approach to make this reduce function inside a function to use it multiple times.
  // Here we get the value of the items from the store.
  const cartItemsLength = useAppSelector(getTotalQuantitySelector);


  useEffect(() => {
    // Here if the cartItemsLength is 0 then prevent the animation if not then do the code under this condition.
    if (!cartItemsLength) {
      return;
    };
    // Here we set setAnimate to true when the cartItemsLength cart changes it's value "User added a product".
    setAnimate(true);  //Start Animation.

    // Here is a time with setTimeOut to trigger the animation to start with 200ms. then set the cart animation back to it's normal state with setAnimate(false).
    const timer = setTimeout(() => setAnimate(false), 200); //End the Animation.

    // Here we clear the timeOut to avoid memory leaks and avoiding Unecessary UI updates by React.
    return () => clearTimeout(timer);
    // Here this useEffect depends on the state change of the cartItemsLength.
  }, [cartItemsLength]);

  // Initialzing the value with 0 to use it inside reduce function.
  // const initialValue = 0;
  // Here with totalQuantity variable we target the values of the object and then use reduce to calculate the value of the accumulator and the current value => currentVal = 0 next value is 2 then 2 + 0 = 2 then the currentVal is 2 and the next val is 4 then 2 + 4 = 6 so the currentVal is 6 and so on.
  // const totalQuantity = Object.values(cartItems).reduce((acc, currentVal) => (
  //   acc + currentVal
  // ), initialValue);

  // Here to handle setAnimate with true or false.
  const handleCartBtnAnimate = () => {
    setAnimate((prev) => !prev);
  };


  return (
    <div onClick={() => navigate("/cart")} className="flex items-center cursor-pointer">
      <div className="relative">
        <CartIcon />
        {
          // Here we check if the cart has no items then don't show the circle icon with the number of items inside the cart.
          cartItemsLength > 0 && (
            <div onClick={handleCartBtnAnimate} className={`absolute w-5 h-5 bg-blue-500 rounded-full p-2 text-center text-md -top-4 left-4 flex justify-center items-center transition ${animate ? "scale-125 duration-300" : ""}`}>{cartItemsLength}</div>
          )
        }
      </div>
      <h5 className="ml-2 font-semibold">Cart</h5>
    </div >
  )
}

export default Headercart;