import { lazy, Suspense } from "react";
const Mainlayout = lazy(()=>import ("@/layouts/Mainlayout"));
const AboutUs = lazy(()=> import("@/pages/AboutUs"));
const Categories = lazy(()=>import("@/pages/Categories"));
const Home = lazy(()=>import("@/pages/Home"));
const Login = lazy(()=> import ("@/pages/Login"));
const Products = lazy(()=> import("@/pages/Products"));
const Register = lazy(()=> import("@/pages/Register"));
const Errorpage = lazy(()=> import("@/pages/Errorpage"));
const Wishlist = lazy(()=> import("@/pages/Wishlist"));
const Profile = lazy(()=>import("@/pages/Profile"));
const Orders = lazy(()=>import("@/pages/Orders"));
import { Cart } from "@/components/eCommerce";
import { createBrowserRouter, RouterProvider } from "react-router";
import Lazycomponent from "@/components/feedback/LazyComponent/Lazycomponent";
import ProtectedRoutes from "@/Auth/ProtectedRoutes";

// This a suspense function that takes a component as an argument and returns the component inside a suspense and the fallback is a component that holds the Loading MSG "Lazycomponent".

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const withSuspense = (Component:React.LazyExoticComponent<any>) =>{
    return(
        <Suspense fallback={<Lazycomponent/>}>
            <Component/>
        </Suspense>
    )
};


const router = createBrowserRouter([
    {
        path: "/",
        element: withSuspense(Mainlayout),
        children: [
            {
                index: true,
                element: withSuspense(Home)
            },
            {
                path: "/categories",
                element: withSuspense(Categories)
            },
            
            {
                path: "/categories/products/:prefix",
                element: withSuspense(Products),
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
                element: withSuspense(AboutUs)
            },
            {
                path: "/cart",
                element: <Cart />
            },
            // Here this Protected Routes component to protect the Routes when the user is not logged in so the user doesn't has any access to Cart or Wishlist until he / she logs in.
            {
                element:<ProtectedRoutes/>,
                children:[
                {
                    path:"/wishlist",
                    element:<Wishlist/>
                },
                {
                    path:"/profile",
                    element:<Profile/>
                },
                {
                    path:"orders",
                    element:<Orders/>
                }
                ]
            },  
            {
                path: "/login",
                element: withSuspense(Login)
            },
            {
                path: "/register",
                element: withSuspense(Register)
            },
        ]
    },
    {
        path: "*",
        element: withSuspense(Errorpage)
    }
]);


const Approuter = () => {
    return (
        <RouterProvider router={router} />
    )
};

export default Approuter;