import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Profilelayout = () => {

    const navigate = useNavigate();

    return (
        <div className="mt-8 flex gap-8">
            {/* Need to make this flexable on mobile screens */}
            <div className="hidden md:flex flex-col w-fit space-y-4">
                <button onClick={() => navigate("/profile")} className="bg-blue-500 text-white px-4 py-1.5 rounded-lg cursor-pointer">
                    Account info
                </button>
                <button onClick={() => navigate("/profile/orders")} className="bg-blue-500 text-white px-4 py-1.5 rounded-lg cursor-pointer">
                    Orders
                </button>
            </div>
            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    )
}

export default Profilelayout;