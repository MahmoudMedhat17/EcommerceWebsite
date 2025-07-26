import {Link, useRouteError, isRouteErrorResponse} from "react-router-dom";



const Errorpage = () => {

  const error = useRouteError();
  const isError = isRouteErrorResponse(error);
  
  const status = isError ? error.status : 404;
  const statusText = isError ? error.statusText : "Page is not found!";
  const linkText = isError ? "Wanna go back to safety?" : "Go back to safety";
  
  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-8">
      <h1 className="text-6xl font-bold">
        {status}
      </h1>
      <h2 className="text-5xl font-semibold">
        {statusText}
      </h2>
      {/* Here replace props makes the stack to disappear so after the user clicks to go back to home page and then tries to click back the replace props here works and removes the error page so when the back button is clicked it takes the user to the home page instead of the error page or whatever the content of the previous page */}
      <Link to={"/"} replace={true}>
        <p className="text-sm sm:text-lg md:text-xl text-blue-500 underline cursor-pointer font-medium">
          {linkText}
        </p>
      </Link>
    </div>
  )
}

export default Errorpage;