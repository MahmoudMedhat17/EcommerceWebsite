import LoadingCategories from "@/components/feedback/LoadingMessages/LoadingCategories";
import LoadingProducts from "@/components/feedback/LoadingMessages/LoadingProducts";
import LoadingCart from "@/components/feedback/LoadingMessages/LoadingCart";
import {LottieHandler} from "@/components/feedback/index";

interface IloadingComponent {
  status: 'Idle' | 'Pending' | 'Succeeded' | 'Failed';
  error: null | string;
  children: React.ReactNode;
  loadingType: "category" | "product" | "cart";
};




// Here's an Object that contains the components that we want to render depend on which component loading state is.
// Each Loading Component has a key to make Component variable detect which LoadingType to show instead of doing If conditions.
const loadingTypes = {
  category:LoadingCategories,
  product:LoadingProducts,
  cart:LoadingCart
};

const LoadingComponent = ({ status, error, children, loadingType }: IloadingComponent) => {

  // Here this variable acts as multiple if conditions between the LoadingTypes we assigned above.
  const Component = loadingTypes[loadingType];


  // Here we check if the Status of the data is Pending or Idle then show for the user the Loading...
   if (status === "Pending" || status === "Idle") {
    return <Component/>

    // if(loadingType === "category"){
    //   return <LoadingCategories/>
    // };
    // if(loadingType === "product"){
    //   return <LoadingProducts/>
    // };
    // if(loadingType === "cart"){
    //   return <LoadingCart/>
    // }
  };
    

  // Here we check if the Status of the data is Failed to call then show for the user the Error.
  if (status === "Failed") {
    return <div className="col-span-full flex flex-col justify-center items-center"><LottieHandler type="errorAnimation" message="Network Error"/>{error}</div>
  };

  // Here we check if the Status of the data is Succeeded then show for the user the data.
  if (status === "Succeeded") {
    // Here we return the children under this component "The data called from the API".
    return <>{children}</>
  };
};

export default LoadingComponent;