import CartIcon from "@/assets/svg/cart.svg?react";
import { useAppSelector } from "@/store/hooks";


const Headercart = () => {


  // There is a better approach to make this reduce function inside a function to use it multiple times.

  // Here we get the value of the items from the store.
  const cartItems = useAppSelector((state) => state.cart.items);

  // Initialzing the value with 0 to use it inside reduce function.
  const initialValue = 0;
  // Here with totalQuantity variable we target the values of the object and then use reduce to calculate the value of the accumulator and the current value => currentVal = 0 next value is 2 then 2 + 0 = 2 then the currentVal is 2 and the next val is 4 then 2 + 4 = 6 so the currentVal is 6 and so on.
  const totalQuantity = Object.values(cartItems).reduce((acc, currentVal) => (
    acc + currentVal
  ), initialValue);


  return (
    <div className="relative cursor-pointer">
      <CartIcon />
      <div className="absolute w-6 h-6 bg-blue-500 rounded-full p-2 text-center text-md -top-3 left-8 flex justify-center items-center">{totalQuantity}</div>
    </div>
  )
}

export default Headercart;