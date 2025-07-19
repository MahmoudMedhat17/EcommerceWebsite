import Mainlayout from "@/layouts/Mainlayout";
import AboutUs from "@/pages/AboutUs";
import Categories from "@/pages/Categories";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Products from "@/pages/Products";
import Register from "@/pages/Register";
import Errorpage from "@/pages/Errorpage";
import { createBrowserRouter, RouterProvider } from "react-router";



const router = createBrowserRouter([
    {
        path:"/",
        element:<Mainlayout/>,
        children:[
            {
                index:true,
                element:<Home/>
            },
            {
                path:"/categories",
                element:<Categories/>
            },
            {
                path:"/products/:prefix",
                element:<Products/>
            },
            {
                path:"/aboutus",
                element:<AboutUs/>
            },
        ]
    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    },
    {
        path:"*",
        element:<Errorpage/>
    }
]);


const Approuter = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default Approuter;