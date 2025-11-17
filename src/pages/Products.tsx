import { Product } from "@/components/eCommerce";
import { LoadingComponent, LottieHandler } from "@/components/feedback/index";
import Headingcomponent from "@/components/eCommerce/HeadingComponent/Headingcomponent";
import useProducts from "@/hooks/useProducts";

const Products = () => {

  
  const {loading, productsFullInfo, error, params} = useProducts();

  return (
    <>
      {/* This is a component header that is an h2 tag that renders children */}
      <Headingcomponent title={`${(params.prefix)?.replace(/^./, char => char.toUpperCase())} products`}/>
        {/* Here are the children rendered as params.prefix => (men, women, kids, baby, sports) products coming from the API data. */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-10">

        {/* Here LoadingComponent is here to display the loading state or error state when calling the data. "Better for UserExperience"*/}
        <LoadingComponent status={loading} error={error} loadingType="product">
          {
            // Here checking if the productsFullInfo array that contain the categories is empty or not 
            productsFullInfo.length > 0 ?

              // If not empty then show the Products by <Product/> component
              (productsFullInfo.map((product) => (
                <div key={product.id}>
                  <Product id={product.id} title={product.title} price={product.price} img={product.img} max={product.max} quantity={product.quantity} isAuthenticated={product.isAuthenticated } />
                </div>
              )))
              :
              // If it's empty then show this Animation
              <div className="col-span-full flex justify-center items-center">
                <LottieHandler type="notFoundAnimation"/>
              </div>
          }
        </LoadingComponent>
      </div>
    </>
  )
}

export default Products;