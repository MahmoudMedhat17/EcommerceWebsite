import { Category } from "@/components/eCommerce";

const Categories = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-10">
      <Category/>
      <Category/>
      <Category/>
      <Category/>
      <Category/>
      <Category/>
      <Category/>
      <Category/>
    </div>
  )
}

export default Categories;