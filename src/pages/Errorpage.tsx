import {Link} from "react-router-dom";


const Errorpage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-8">
      <h1 className="text-6xl font-bold">
        404
      </h1>
      <h2 className="text-5xl font-semibold">
        Page Not Found
      </h2>
      {/* Here replace props makes the stack to disappear so after the user clicks to go back to home page and then tries to click back the replace props here works and removes the error page so when the back button is clicked it takes the user to the home page instead of the error page or whatever the content of the previous page */}
      <Link to={"/"} replace={true}>
        <p className="text-sm sm:text-lg md:text-xl text-blue-500 underline cursor-pointer font-medium">
          Look like you reached a dead end, wanna go back to saftey?
        </p>
      </Link>
    </div>
  )
}

export default Errorpage;