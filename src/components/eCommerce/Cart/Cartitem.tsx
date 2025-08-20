
const Cartitem = () => {
    return (
        <div className="flex justify-between border-b-2 border-gray-300">
            <div className="flex gap-4 mb-4">
                <img src="https://cdn-eu.dynamicyield.com/api/9876644/images/cfb357649428__hp-w12-22032022-h_m-men.jpg" className="w-32 h-36" />
                <div className="flex flex-col justify-between">
                    <div>
                        <h3 className="font-semibold">Test</h3>
                        <p>30EGP</p>
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