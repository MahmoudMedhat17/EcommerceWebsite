import CartIcon from "@/assets/svg/cart.svg?react";

const Headercart = () => {
  return (
    <div className="relative cursor-pointer">
        <CartIcon/>
        <div className="absolute w-6 h-6 bg-blue-500 rounded-full p-2 text-center text-md -top-3 left-8 flex justify-center items-center">0</div>
    </div>
  )
}

export default Headercart;