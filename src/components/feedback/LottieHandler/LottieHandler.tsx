import Lottie from "lottie-react";
import errorAnimation from "@/assets/lottieFiles/error.json";
import emptyAnimation from "@/assets/lottieFiles/empty.json";
import loadingAnimtaion from "@/assets/lottieFiles/loading.json";
import notFoundAnimation from "@/assets/lottieFiles/notFound.json";
import successAnimation from "@/assets/lottieFiles/success.json";


const lottieAnimations = {
  errorAnimation,
  emptyAnimation,
  loadingAnimtaion,
  notFoundAnimation,
  successAnimation
};

// Here we set lottieTypes with the names or keys of the lottieAnimations instead of writing them manually so this type becomes => "errorAnimation" | "emptyAnimation" | "loadingAnimtaion" | "notFoundAnimation"
type lottieTypes = keyof typeof lottieAnimations;

// Then ues this lottieTypes here in this interface directly.
interface ILottieProps{
  type:lottieTypes;
  message?:string;
};

const LottieHandler = ({type, message}:ILottieProps) => {

  const lottieComponent = lottieAnimations[type];
  

  return (
    <>
      <Lottie animationData={lottieComponent} style={{width:"300px"}}/>
      <h3 className={`text-2xl font-semibold`}>{message}</h3>
    </>
  )
}

export default LottieHandler;