import {useState} from 'react';
import axios from 'axios';

type TEmailStatus = "Idle" | "Checking" | "Available" | "NotAvailable" | "Failed";

const useCheckEmailAvailability = () => {
    const[checkEmailAvailability,setCheckEmailAvailability] = useState<TEmailStatus>("Idle");
    const[prevEmail,setPrevEmail] = useState<string | null>();


    const handleCheckEmailAvailability = async (email:string) =>{
    // Here with try catch block we call the the email of the user from the API and then check if this email is already in the database or not 
    try {
        // Here we set the state of the email checking as "Checking";
        setCheckEmailAvailability("Checking");
        // And email state to the email the user wants to enter.
        setPrevEmail(email);

        
        const res = await axios.get(`/users?email=${email}`);

        // If it's in the database then it means that the email is not Available to add since it's already there, If it's not the database yet then it's available to add to the database.
        if(!res.data){
            setCheckEmailAvailability("Available");
        }
        // If it's not in the database yet then it's "Available" to add.
        else{
            setCheckEmailAvailability("NotAvailable");
        }
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


 

        
        
            