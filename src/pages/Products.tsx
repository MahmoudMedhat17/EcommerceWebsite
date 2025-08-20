import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Product } from "@/components/eCommerce";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import getProducts from "@/store/products/thunk/getProducts";
import { productsCleanUp } from "@/store/products/productsSlice";
import { LoadingComponent } from "@/components/feedback/index";
import Headingcomponent from "@/components/eCommerce/HeadingComponent/Headingcomponent";

const Products = () => {

  const { loading, records, error } = useAppSelector((state) => state.products);
  const cartItemsLength = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const params = useParams();



  const productsFullInfo = records.map((product) => (
    {
      // Here we get the all product props
      ...product,
      // and here we add the quantity of the product by using the state coming from cartSlice as if the product with id = 1 has 2 quantities then the product here in this object with id of 1 has a quantity of 2 => quantity: 2.
      quantity: cartItemsLength[product.id || 0]
    }
  ));


  useEffect(() => {
    if (params.prefix) {
      dispatch(getProducts(params.prefix as string));
    };

    return () => {
      dispatch(productsCleanUp());
    };
  }, [dispatch, params]);

  return (
    <>
      {/* This is a component header that is an h2 tag that renders children */}
      <Headingcomponent>
        {/* Here are the children rendered as params.prefix => (men, women, kids, baby, sports) products coming from the API data. */}
        {params.prefix} products
      </Headingcomponent>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-10">

        {/* Here LoadingComponent is here to display the loading state or error state when calling the data. "Better for UserExperience"*/}
        <LoadingComponent status={loading} error={error}>
          {
            // Here checking if the productsFullInfo array that contain the categories is empty or not 
            productsFullInfo.length > 0 ?

              // If not empty then show the Products by <Product/> component
              (productsFullInfo.map((product) => (
                <div key={product.id}>
                  <Product id={product.id} title={product.title} price={product.price} img={product.img} max={product.max} quantity={product.quantity} />
                </div>
              )))
              :
              // If it's empty then show this msg
              <p className="font-semibold text-xl">"There are no products available!"</p>
          }
        </LoadingComponent>
      </div>
    </>
  )
}

export default Products;