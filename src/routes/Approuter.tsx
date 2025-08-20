import Mainlayout from "@/layouts/Mainlayout";
import AboutUs from "@/pages/AboutUs";
import Categories from "@/pages/Categories";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Products from "@/pages/Products";
import Register from "@/pages/Register";
import Errorpage from "@/pages/Errorpage";
import { Cart } from "@/components/eCommerce";
import { createBrowserRouter, RouterProvider } from "react-router";



const router = createBrowserRouter([
    {
        path: "/",
        element: <Mainlayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/categories",
                element: <Categories />
            },
            {
                path: "/cart",
                element: <Cart />
            },
            {
                path: "/categories/products/:prefix",
                element: <Products />,
                // This errorElement makes this route "products/:id" falls back to the errorElement page when the params doesn't match a string.
                errorElement: <Errorpage />,
                // This loader is for checking if the user enters the params as a string or not so if it's not a string then don't call the API data and show the user the Bad Request "Handling error from the client side to avoid unnecessary API calls".
                loader: ({ params }) => {
                    if (typeof params.prefix !== "string" || !/^[A-Za-z]+$/.test(params.prefix)) {
                        throw new Response("Bad Request", { statusText: "Category is not found!", status: 400 });
                    }
                    return true;
                }
            },
            {
                path: "/aboutus",
                element: <AboutUs />
            },
        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "*",
        element: <Errorpage />
    }
]);


const Approuter = () => {
    return (
        <RouterProvider router={router} />
    )
};

export default Approuter;