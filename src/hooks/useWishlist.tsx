import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import getWishlist from "@/store/wishlist/thunk/getWishlist";
import getToggleLike from "@/store/wishlist/thunk/getToggleLike";

const useWishlist = () => {
  
  const [isLoading,setIsLoading] = useState(false);
  const {loading, productDetails, error} = useAppSelector((state)=> state.wishlist);
  const cartItems = useAppSelector((state)=> state.cart.items);
  const dispatch = useAppDispatch();

  // Here we return all the product props "Title, price, images, etc.", product quantity from the cartItems state that contains the amount of the quantity of each product and liked as true only since all the products in the wishlist must be liked for sure. 
  const productFullInfo = productDetails.map((product)=>(
    {
      ...product,
      quantity:cartItems[product.id],
      liked:true
    }
  ));


  useEffect(()=>{
    dispatch(getWishlist());
  },[dispatch]);

  const handleToggleLike = (id:number) =>{
    setIsLoading(true);
    dispatch(getToggleLike(id)).finally(()=>setIsLoading(false));
  };


   return {isLoading, loading, productFullInfo, handleToggleLike, error};
};

export default useWishlist;