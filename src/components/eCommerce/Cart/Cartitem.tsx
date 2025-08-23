
// type cartItemProps = {
//     title: string;
//     price:number;
//     image:string;
// };


// There is an error with productDetails need to fix it.
const Cartitem = ({ title, price, image }) => {
    return (
        <div className="flex justify-between border-b-2 border-gray-300">
            <div className="flex gap-4 mb-4">
                <img src={image} className="w-32 h-36" />
                <div className="flex flex-col justify-between">
                    <div>
                        <h3 className="font-semibold">{title}</h3>
                        <p>{price} EGP</p>
                    </div>
                    <button className="bg-gray-500 text-white px-4 md:px-8 py-2 hover:bg-red-600 duration-300 cursor-pointer rounded-md">Remove</button>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <p>Quantity</p>
                <input type="number" value="1" className="w-16" />
            </div>
        </div>
    )
}

export default Cartitem;