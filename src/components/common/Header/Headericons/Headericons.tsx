import { useNavigate } from "react-router-dom";


interface IHeadericons {
  title: string;
  Icon: React.ElementType;
  handleAnimateBtn: () => void;
  itemsLength: number;
  page: string;
  animate: boolean;
};

const Headericons = ({title, Icon, handleAnimateBtn, page, animate, itemsLength}: IHeadericons) => {

  const navigate = useNavigate();

  

   return (
    <div onClick={() => navigate(page)} className="flex items-center cursor-pointer">
      <div className="relative">
        <Icon />
        {
          // Here we check if the cart has no items then don't show the circle icon with the number of items inside the cart.
           itemsLength > 0 && (
            <div onClick={handleAnimateBtn} className={`absolute w-5 h-5 bg-blue-500 rounded-full p-2 text-center text-md -top-4 left-4 flex justify-center items-center transition ${animate ? "scale-125 duration-300" : ""}`}>
              {itemsLength}
            </div>
          )
        }
      </div>
      <h5 className="ml-2 font-semibold">{title}</h5>
    </div >
  )
};

export default Headericons;