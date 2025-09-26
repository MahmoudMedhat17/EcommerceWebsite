import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Headingcomponent from "@/components/eCommerce/HeadingComponent/Headingcomponent";
import { LoadingComponent } from "@/components/feedback";
import getWishlist from "@/store/wishlist/thunk/getWishlist";
import getToggleLike from "@/store/wishlist/thunk/getToggleLike";
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import { SpinnerCircular } from 'spinners-react';
import { cleanWishlistProductDetails } from "@/store/wishlist/wishlistSlice";


const Wishlist = () => {
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
    return () =>{
      dispatch(cleanWishlistProductDetails());
    }
  },[dispatch]);

  const handleToggleLike = (id:number) =>{
    setIsLoading(true);
    dispatch(getToggleLike(id)).finally(()=>setIsLoading(false));
  };

  
  return (
    <>
      <Headingcomponent title={"Your Wishlist"}/>
      <LoadingComponent status={loading} error={error}>
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 place-items-center">
            {
              productFullInfo.map((product)=>(
                <div key={product.id} className="space-y-4 relative">
                  <button type="button" onClick={()=>handleToggleLike(product.id)} className='absolute top-1 right-0.5 sm:-right-6'>
                    {
                      isLoading ? 
                      (
                        <SpinnerCircular size={20} thickness={100} speed={100} color="#2B7FFF"/>
                      )
                      :
                      product.liked ?
                      (
                        <FcLike className="cursor-pointer"/>
                      )
                      :
                      (
                        <FcLikePlaceholder className="cursor-pointer"/>
                      )
                    }
                  </button>
                  <img src={product.img} className="w-32 h-40 block mx-auto"/>
                  <h3 className="font-semibold">{product.title}</h3>
                  <p>{product.price} EGP</p>
                </div>
              ))
            }
           </div>
      </LoadingComponent>
    </>
  )
}

export default Wishlist;