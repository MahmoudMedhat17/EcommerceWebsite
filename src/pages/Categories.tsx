import { Category } from "@/components/eCommerce";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import getCategories from "@/store/categories/thunk/GetCategories";


const Categories = () => {
  
  
  const dispatch = useAppDispatch();
  const {loading,records,error} = useAppSelector((state)=> state.categories);

  useEffect(()=>{
    // Here this condition is for checking if the array that holds the products is empty or not if it's empty then fire the getCategories action if it's not then stop firing the getCategories action.
    if(!records.length){
      dispatch(getCategories());
    }
  },[dispatch, records]);
  
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-10">
      {
        records.map((category)=>(
          // Here checking if the records array that contain the categories is empty or not 
          records.length > 0 ?

          // If not empty then show the categories by <Category/> component
          <div key={category.id}>
            <Category prefix={category.prefix} title={category.title} img={category.img}/>
          </div>
          :
          // If it's empty then show this msg
          <p className="font-semibold text-xl">"There are no categories available!"</p>
        ))
      }
    </div>
  )
}

export default Categories;