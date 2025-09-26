import { memo, useState } from 'react';
import type { TProducts } from "@/types/Products";
import { useAppDispatch } from '@/store/hooks';
import getToggleLike from '@/store/wishlist/thunk/getToggleLike';
import { SpinnerCircular } from 'spinners-react';
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";


// Here is a type for TProducts and intersection with function changeQuantity coming as props from the Cart.
type cartItemsProps = TProducts & {
    changeQuantity: (id: number, quantity: number) => void;
    deleteItems:(id:number) => void;
};

// Wrapped the component with memo to cache the props coming from the parent if it's not changed to aboid unnecessary renders.
const Cartitem = memo(({ id, title, price, img, quantity, max, changeQuantity, deleteItems, liked }: cartItemsProps) => {
    const[isLoading ,setIsLoading] = useState(false);
    const dispatch = useAppDispatch();

    //Here I make max of the items in the cart coming from the store as an array and fill this array with dummy data (0) and then map around this array 
    //to get the quantity from max => 4 to 1 with the index of each number in the array 
    //then return this index to <option/> so it can be used in <select></select> to display the number of quantity of each item in a dropdown menu.
    const quantityVal = Array(max).fill(0).map((_, index) => {
        const quantity = index + 1;

        return (
            <option key={quantity} value={quantity}>
                {quantity}
            </option>
        )
    });


    // This function that is used to onChange the <select></select> by the function passed as props from the Cart.
    const handleChangeQuantity = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // Here we make sure that the value that the user selects is in number.
        const quantity = Number(e.target.value);

        // Here is the function coming from the Cart that takes the id and the quantity of the item in the Cart.
        changeQuantity(id, quantity);
    };


    // This is a function coming from Cart component as a props that takes the deleteItems from the cartSlice and that deleteItems action takes the id of the product that is chosen to be removed then we set this function to onClick to the remove button.
    const handleDeleteItems = ()=>{
        deleteItems(id);
    };

    // Handle like toggle button by changing between liked and unlike icons and isLoading state here used to load the spinner icon between the duration of liking and unliking the item.
    const handleLikeToggle = (e:React.MouseEvent<HTMLButtonElement>) =>{
        if(isLoading){
            return;
        };
        e.preventDefault();
        e.stopPropagation();
        setIsLoading(true);
        dispatch(getToggleLike(id))
        console.log(id,"Working");
    };


    return (
        <div className="flex justify-between border-b-2 border-gray-300 my-4">
            <div className="flex gap-4 mb-4">
                <div className='relative w-44 sm:w-52'>
                    <img src={img} className="w-32 h-36 mx-auto" />
                    <button className='absolute top-1 right-0.5 sm:right-1' type='button' onClick={handleLikeToggle}>
                        {
                            isLoading ? 
                            (
                                <SpinnerCircular size={20} thickness={100} speed={100} color="#2B7FFF"/>
                            )
                            :
                            liked ? 
                            (
                                <FcLike className="cursor-pointer"/>
                            )
                            :
                            (
                                <FcLikePlaceholder className="cursor-pointer"/>
                            )
                        }
                    </button>
                </div>
                <div className="flex flex-col justify-between">
                    <div>
                        <h3 className="font-semibold">{title}</h3>
                        <p>{price} EGP</p>
                    </div>
                    <button type='button' onClick={handleDeleteItems} className="bg-gray-500 text-white px-4 md:px-8 py-2 hover:bg-red-600 duration-300 cursor-pointer rounded-md w-fit">Remove</button>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <p>Quantity</p>
                <select onChange={handleChangeQuantity} value={quantity} className="w-full text-center">
                    {quantityVal}
                </select>
            </div>
        </div>
    )
});

export default Cartitem;