import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import getProducts from "@/store/products/thunk/getProducts";
import { cleanProductsSlice } from "@/store/products/productsSlice";

const useProducts = () => {


  const { loading, records, error } = useAppSelector((state) => state.products);
  const cartItemsLength = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const params = useParams();
  // Here we need accessToken so we can use it with conditions about Authentications of the user.
  const { accessToken } = useAppSelector((state) => state.auth);

  const isAuthenticated = accessToken ? true : false;

  const productsFullInfo = records.map((product) => (
    {
      // Here we get the all product props
      ...product,
      // and here we add the quantity of the product by using the state coming from cartSlice as if the product with id = 1 has 2 quantities then the product here in this object with id of 1 has a quantity of 2 => quantity: 2.
      quantity: cartItemsLength[product.id || 0],
      // Here isAuthenticated checks first the accessToken if yes or no.
      isAuthenticated
    }
  ));


  useEffect(() => {
    if (params.prefix) {
      const promise = dispatch(getProducts(params.prefix as string));
      return ()=> promise.abort();
    };

    return () => {
      dispatch(cleanProductsSlice());
    };
  }, [dispatch, params]);


  return {loading, error, productsFullInfo, params}
}

export default useProducts;