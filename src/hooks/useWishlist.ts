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
  const prdocuctDetails = productDetails.map((product)=>(
    {
      ...product,
      quantity:cartItems[product.id],
      // User can't get here in this wishlist page till he logs in so always the items here are liked => true and isAuthenticated to not show a modal msg that says to the user to log in since he is in this wishlist page and must be logged in so it's always true too. 
      liked: true,
      isAuthenticated:true
    }
  ));


  useEffect(()=>{
    // Here this dispatch is to dispatch and dsplay the full info of the products inside the wishlist.
    const promise = dispatch(getWishlist("productsDetails"));
    return () => promise.abort();
  },[dispatch]);

  const handleToggleLike = (id:number) =>{
    setIsLoading(true);
    dispatch(getToggleLike(id)).finally(()=>setIsLoading(false));
  };


   return {isLoading, loading, prdocuctDetails, handleToggleLike, error};
};

export default useWishlist;