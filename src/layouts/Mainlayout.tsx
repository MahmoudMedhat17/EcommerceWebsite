import {Header, Footer} from "@/components/common/index";
import { Outlet } from "react-router-dom";

const Mainlayout = () => {
  return (
    <div className="h-screen w-full flex flex-col px-8 md:px-12 xl:px-56 pt-4">
        <Header/>
        {/* Main Content */}
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Mainlayout;