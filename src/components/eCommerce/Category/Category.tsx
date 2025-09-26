import { Link } from "react-router-dom";
import type { TCategories } from "@/types/Categories";


// interface ICategory{
//   prefix:string;
//   title:string;
//   img:string;
// };

const Category = ({prefix, title, img}:TCategories) => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <Link to={`/categories/products/${prefix}`} className="space-y-4">
          <img src={img} className="w-32 h-32 rounded-full"/>
          <p className="font-semibold text-lg cursor-pointer text-center hover:underline duration-300">{title}</p>
        </Link>
      </div>
    </div>
  )
}

export default Category;