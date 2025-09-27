import { Link } from "react-router-dom";
import MainHeadericons from "@/components/common/Header/MainHeadericons/MainHeadericons";

const Header = () => {
  return (
    <header className="pt-2">
      <div className="flex justify-between items-center">
        <Link to={"/"}>
          <span className="font-semibold text-xl">E-commerce</span>
        </Link>
        <div className="flex items-center gap-4">
        <MainHeadericons/>
        </div>
      </div>
      <header className="bg-gray-900 mt-8">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-1 items-center justify-end md:justify-between">
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

            <div className="flex items-center gap-4">
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

              <button
                className="block rounded-sm bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
              >
                <span className="sr-only">Toggle menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
    </header>
  )
}

export default Header;