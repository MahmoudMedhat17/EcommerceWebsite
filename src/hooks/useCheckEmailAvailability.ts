import {useState} from 'react';
import axios from 'axios';


type TEmailStatus = "Idle" | "Checking" | "Available" | "Taken" | "Failed";

const useCheckEmailAvailability = () => {
    const[checkEmailAvailability,setCheckEmailAvailability] = useState<TEmailStatus>("Idle");
    const[prevEmail,setPrevEmail] = useState<string | null>(null);


    const handleCheckEmailAvailability = async (email:string) =>{
    
        // Here we set the state of the email checking as "Checking";
        setCheckEmailAvailability("Checking");

        // And email state to the email the user wants to enter.
        setPrevEmail(email);

    
        // Here with try catch block we call the the email of the user from the API and then check if this email is already in the database or not 
    try {
                
        const res = await axios.get(`http://localhost:5000/users?email=${email}`);


        // If it's in the database then it means that the email is not Available to add since it's already there, If it's not the database yet then it's available to add to the database.
        if(!res.data.length){
            setCheckEmailAvailability("Available");
        }
        // If it's not in the database yet then it's "Available" to add.
        else{
            setCheckEmailAvailability("Taken");
        }

        console.log("API response:", res.data);
        console.log("📩 checkEmailAvailability CALLED with:", email);


    } catch (error) {
        setCheckEmailAvailability("Failed");
        console.log(error);
    }
    }

    const resetCheckEmailAvailability = () =>{
        setCheckEmailAvailability('Idle');
        setPrevEmail(null);
    }

    return {checkEmailAvailability, prevEmail, handleCheckEmailAvailability, resetCheckEmailAvailability};
}

export default useCheckEmailAvailability;


 

        
        
            