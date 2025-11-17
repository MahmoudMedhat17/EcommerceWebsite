import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import getCategories from "@/store/categories/thunk/getCategories";
import { cleanCategorySlice } from "@/store/categories/categoriesSlice";


const useCategories = () => {

    const dispatch = useAppDispatch();
    const { loading, records, error } = useAppSelector((state) => state.categories);

  useEffect(() => {
    // Here this condition is for checking if the array that holds the products is empty or not if it's empty then fire the getCategories action if it's not then stop firing the getCategories action.
    if (!records.length) {
      const promise = dispatch(getCategories());
      return ()=>{
        promise.abort();
        dispatch(cleanCategorySlice());
      };
    }
  }, [dispatch]);



  return {loading, records , error};
}

export default useCategories;