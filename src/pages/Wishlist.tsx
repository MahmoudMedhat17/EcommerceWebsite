import useWishlist from "@/hooks/useWishlist";
import Headingcomponent from "@/components/eCommerce/HeadingComponent/Headingcomponent";
import { LoadingComponent } from "@/components/feedback";
import {LottieHandler} from "@/components/feedback";
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import { SpinnerCircular } from 'spinners-react';


const Wishlist = () => {
 
  const {isLoading, loading, productFullInfo, handleToggleLike, error} = useWishlist();
  
  return (
    <>
      <Headingcomponent title={"Your Wishlist"}/>
      <LoadingComponent status={loading} error={error} loadingType="cart">
        {
          productFullInfo.length === 0 && 
          <div className="flex flex-col justify-center items-center h-screen space-y-4">
            <LottieHandler type="emptyAnimation" message="Your wishlist is empty!"/>
          </div>
        }
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