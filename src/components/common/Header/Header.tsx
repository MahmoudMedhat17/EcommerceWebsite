import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { useAppSelector } from "@/store/hooks";
import { Link, useNavigate } from "react-router-dom";
import { authLogout } from "@/store/auth/authSlice";
import MainHeadericons from "@/components/common/Header/MainHeadericons/MainHeadericons";
import getWishlist from "@/store/wishlist/thunk/getWishlist";
import BurgerMenu from "@/assets/svg/burgerMenu.svg?react";
import { type RootState } from "@/store";

const Header = () => {

  const [openMenu, setOpenMenu] = useState(false);
  const dispatch = useAppDispatch();
  const { user, accessToken } = useAppSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(authLogout());
    navigate("/");
  };


  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  // Here this function takes a path as an argument and then inside this function we call the navigate method from react router dom and path to it the path string so when the user clicks on categories for example then he get to categories page and the nav menu close automatically.
  const handleMenuNav = (path: string) => {
    setOpenMenu(false);
    navigate(path);
  };

  useEffect(() => {
    // Here when there's an accessToken then we dispatch the item Ids as a notification for the wishlist icon.
    if (accessToken) {
      dispatch(getWishlist("productsIds"));
    }
  }, [dispatch, accessToken]);

  return (
    <header className="pt-2">
      <div className="flex justify-between items-center">
        <Link to={"/"}>
          <span className="font-semibold text-xl">E-commerce</span>
        </Link>
        <div className="flex items-center gap-4">
          <MainHeadericons />
        </div>
      </div>
      <header className="bg-gray-900 mt-8">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
          <div className="relative flex flex-1 items-center justify-end md:justify-between">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <Link to={"/"} className="text-gray-500 transition hover:text-gray-500/75">
                  Home
                </Link>

                <Link to={"/categories"} className="text-gray-500 transition hover:text-gray-500/75">
                  Categories
                </Link>

                <Link to={"/aboutus"} className="text-gray-500 transition hover:text-gray-500/75">
                  About
                </Link>
              </ul>
            </nav>

            {
              openMenu && (
                <nav className={`md:hidden absolute left-0 top-14 bg-white w-full space-y-4 p-4 origin-top transform transition-all duration-300 ease-in-out scale-y-100 opacity-100 ${openMenu ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 h-0 overflow-hidden pointer-events-none"}`}>
                  <Link onClick={() => handleMenuNav("/")} to="/" className="block font-semibold text-lg">
                    Home
                  </Link>
                  <Link onClick={() => handleMenuNav("/categories")} to="/categories" className="block font-semibold text-lg">
                    Categories
                  </Link>
                  <Link onClick={() => handleMenuNav("/aboutus")} to="/aboutus" className="block font-semibold text-lg">
                    About
                  </Link>
                  <Link onClick={() => handleMenuNav("/profile")} to="/profile" className="block font-semibold text-lg">
                    Profile
                  </Link>
                  <Link onClick={() => handleMenuNav("/profile/orders")} to="/profile/orders" className="block font-semibold text-lg">
                    Orders
                  </Link>
                  {
                    accessToken ?
                      (
                        <button onClick={handleLogout} className="block bg-blue-500 text-white p-4 rounded-md text-lg w-full text-start cursor-pointer">
                          Logout
                        </button>
                      )
                      :
                      (
                        <button className="block bg-blue-500 text-white p-4 rounded-md text-lg w-full text-start cursor-pointer">
                          <Link to="/login">
                            Login
                          </Link>
                        </button>
                      )
                  }
                </nav>
              )
            }
            {
              // Here with accessToken we decide if the accessToken is available then show the name of the user and a dropdown menu that shows Profile, Orders and Logout pages.
              accessToken ?
                (
                  <div className="w-full md:w-fit flex justify-between items-center transition">
                    <button
                      onClick={handleOpenMenu}
                      className="block rounded-sm p-2.5 transition md:hidden"
                    >
                      <span className="sr-only">Toggle menu</span>
                      <BurgerMenu className="w-10 h-10 bg-gray-100 rounded-md cursor-pointer" />
                    </button>

                    <div className="relative group">
                      <Link to="/" className="font-medium text-white">
                        {/* Here we display the firstName of the user who Registered their profile. */}
                        {`${user?.firstName}`}
                      </Link>

                      <div className="absolute -right-4 top-10 w-fit z-99 bg-white text-black opacity-0 scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 transition-all duration-300 ease-in-out origin-top">
                        <div className="p-3">
                          <Link to={"/profile"}>
                            <p className="font-medium cursor-pointer mb-3">
                              Profile
                            </p>
                          </Link>
                          <Link to={"/profile/orders"}>
                            <p className="font-medium cursor-pointer mb-3">
                              Orders
                            </p>
                          </Link>
                          <p className="font-medium cursor-pointer" onClick={handleLogout}>
                            Logout
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
                :
                // If the accessToken is not available then show the Register and Login buttons.
                (
                  <div className="w-full md:w-fit flex justify-between items-center gap-4">
                    <button
                      onClick={handleOpenMenu}
                      className="block rounded-sm p-2.5 transition md:hidden"
                    >
                      <span className="sr-only">Toggle menu</span>
                      <BurgerMenu className="w-10 h-10 bg-gray-100 rounded-md cursor-pointer" />
                    </button>
                    <div className="sm:flex sm:gap-4">
                      <Link
                        className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                        to={"/login"}
                      >
                        Login
                      </Link>

                      <Link
                        className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block"
                        to={"/register"}
                      >
                        Register
                      </Link>
                    </div>
                  </div>
                )
            }
          </div>
        </div>
      </header>
    </header>
  )
}

export default Header;