import type { UseFormRegister, FieldValues, Path } from "react-hook-form";

interface IformInputs<T extends FieldValues> {
    label: string;
    type: string;
    placeHolder: string;
    name:Path<T>;
    register:UseFormRegister<T>;
    error?:string;
    onBlur?:(e:React.FocusEvent<HTMLInputElement>)=>void;
};


const Forminput = <T extends FieldValues>({ label, type, placeHolder, name, register, error, onBlur }: IformInputs<T>) => {


    // This function is for avoiding overriding the onBlur coming from register by handling onBlur from the props if exists and onBlur coming from register as well, and if the onBlur props doesn't exist then we apply the default omBlur from the register.
    const handleOnBlur = (e:React.FocusEvent<HTMLInputElement>)=>{
        if(onBlur){
            onBlur(e);
            register(name).onBlur(e);
        }
        else{
            register(name).onBlur(e)
        }
    };


    // This function is for avoiding overriding the onBlur function coming with the register from React hook form.
        // We check if onBlur is Available then pass the onBlur coming from the props and the onBlur coming from register to avoid overriding the onBlue from register.
       
        // If not then apply the default onBlur coming from the register.

    return (
        <div className="flex flex-col space-y-2 mb-2">
            <label htmlFor={`${name}`} className="font-semibold">{label}</label>
            <input type={`${type}`} placeholder={`${placeHolder}`} className={`py-1 sm:py-2 placeholder:px-1 px-1 border rounded-md ${error ? "border-red-500 focus:border-red-500" : "border-gray-400 focus:border-blue-500"}`} {...register(name)} onBlur={handleOnBlur}/>
            {error && <p className="text-red-500">{error}</p>}
            {/* Need to apply Check, Success, Error mesgs for Email Input. */}
        </div>
    )
}

export default Forminput;