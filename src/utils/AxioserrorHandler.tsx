import axios from "axios";

const AxioserrorHandler = (error:unknown) =>{
        if(axios.isAxiosError(error)){
            const errorMessage = error.response?.data.message || error.message;
            return errorMessage;
        }
        // If it's not coming from axios then we write the error msg
        else{
            const errorMessage = "Unexpected Error!";
            return errorMessage;
        };
};


export default AxioserrorHandler;