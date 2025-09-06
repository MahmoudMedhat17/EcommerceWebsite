import WishlistIcon from "@/assets/svg/wishlist.svg?react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Wishlist = () => {

  const totalQuantity = 0;
  const [animate,setAnimate] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    setAnimate(true);

    const timer = setTimeout(()=>setAnimate(false),200);

    return ()=> clearTimeout(timer);

  },[totalQuantity]);



  return (
    <div onClick={()=>navigate("/wishlist")} className="flex items-center gap-2 cursor-pointer px-5 border-r-2">
      <div className="relative">
        <WishlistIcon/>
        {
          // Here we check if the Wishlist has no items then don't show the circle icon with the number of items inside the Wishlist.
          totalQuantity > 0 && (
          <div className={`absolute w-5 h-5 bg-blue-500 rounded-full p-2 text-center text-md -top-4.5 left-4 flex justify-center items-center transition ${animate ? "scale-125 duration-300" : ""}`}>
            0
          </div>
          )
        }
      </div>
      <h5 className="font-semibold">Wishlist</h5>
    </div>
  )
}

export default Wishlist;