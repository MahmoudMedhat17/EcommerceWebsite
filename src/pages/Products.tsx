import { Product } from "@/components/eCommerce";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useParams } from "react-router-dom";
import getProducts from "@/store/products/thunk/getProducts";
import { productsCleanUp } from "@/store/products/ProductsSlice";


const Products = () => {
  
  const {loading, records, error} = useAppSelector((state)=> state.products);
  const dispatch = useAppDispatch();
  const params = useParams();

  useEffect(()=>{
    if(params.prefix){
      dispatch(getProducts(params.prefix as string));
    };

    return () =>{
      dispatch(productsCleanUp());
    };
    console.log(params)
  },[dispatch,params]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-10">
      {
        records.map((product)=>(
          // Here checking if the records array that contain the categories is empty or not 
          records.length > 0 ?

          // If not empty then show the Products by <Product/> component
          <div key={product.id}>
            <Product title={product.title} price={product.price} img={product.img}/>
          </div>
          :
          // If it's empty then show this msg
          <p className="font-semibold text-xl">"There are no products available!"</p>
        ))
      }
    </div>
  )
}

export default Products;