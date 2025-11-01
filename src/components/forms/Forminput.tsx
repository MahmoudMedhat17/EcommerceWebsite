import type { UseFormRegister, FieldValues, Path } from "react-hook-form";

interface IformInputs<T extends FieldValues> {
    label: string;
    type: string;
    placeHolder: string;
    name:Path<T>;
    register:UseFormRegister<T>;
    onBlur?:(e:React.FocusEvent<HTMLInputElement>)=>void;
    error?:string;
    checkEmail?:string;
    success?:string;
};


const Forminput = <T extends FieldValues>({ label, type, placeHolder, name, register, error, onBlur, checkEmail, success }: IformInputs<T>) => {


    // This function is for avoiding overriding the onBlur coming from register by handling onBlur from the props if exists and onBlur coming from register as well, and if the onBlur props doesn't exist then we apply the default omBlur from the register.
    const handleOnBlur = (e:React.FocusEvent<HTMLInputElement>)=>{
        // We check if onBlur is Available then pass the onBlur coming from the props and the onBlur coming from register to avoid overriding the onBlue from register.
        if(onBlur){
            // Need to fix auto refresh when submitting the form.
            onBlur(e);
            register(name).onBlur(e);
        }
        // If not then apply the default onBlur coming from the register.
        else{
            register(name).onBlur(e);
        }
    };

    
    return (
        <div className="flex flex-col space-y-2 mb-2">
            <label htmlFor={`${name}`} className="font-semibold">{label}</label>
            <input type={`${type}`} placeholder={`${placeHolder}`} className={`py-1 sm:py-2 placeholder:px-1 px-1 border rounded-md ${checkEmail && "border-gray-500 focus:border-gray-500" } ${success ? "border-green-500 focus:border-green-500" : "border-gray-500 focus:border-gray-500"} ${error ? "border-red-500 focus:border-red-500" : "border-gray-5000 focus:border-gray-500"}`} {...register(name)} onBlur={handleOnBlur}/>
            {error && <p className="text-red-500">{error}</p>}
            {success && !error && <p className="text-green-500">{success}</p>}
            {checkEmail && !error && !success && <p className="text-gray-500">{checkEmail}</p>}
        </div>
    )
}

export default Forminput;