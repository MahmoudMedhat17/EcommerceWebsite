import {LottieHandler} from "@/components/feedback/index";

const Lazycomponent = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <LottieHandler type="loadingAnimtaion" message="Loading"/>
    </div>
  )
}

export default Lazycomponent;