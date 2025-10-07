import { Category } from "@/components/eCommerce";
import { LoadingComponent } from "@/components/feedback";
import useCategories from "@/hooks/useCategories";

const Categories = () => {


  const {loading, records, error} = useCategories();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-10">
      {/* Here LoadingComponent is here to display the loading state or error state when calling the data. "Better for UserExperience"*/}
      <LoadingComponent status={loading} error={error} loadingType="category">
        {
          records.map((category) => (
            // Here checking if the records array that contain the categories is empty or not 
            records.length > 0 ?

              // If not empty then show the categories by <Category/> component
              <div key={category.id}>
                <Category prefix={category.prefix} title={category.title} img={category.img} />
              </div>
              :
              // If it's empty then show this msg
              <>
              <p className="font-semibold text-xl">"There are no categories available!"</p>
              </>
          ))
        }
      </LoadingComponent>
    </div>
  )
}

export default Categories;