import type { UseFormRegister, FieldValues, Path } from "react-hook-form";

interface IformInputs<T extends FieldValues> {
    label: string;
    type: string;
    placeHolder: string;
    name:Path<T>;
    register:UseFormRegister<T>;
};


const Forminput = <T extends FieldValues>({ label, type, placeHolder, name, register }: IformInputs<T>) => {
    return (
        <div className="flex flex-col space-y-2 mb-4">
            <label htmlFor={`${name}`} className="font-semibold">{label}</label>
            <input type={`${type}`} placeholder={`${placeHolder}`} className="py-1 sm:py-2" {...register(name)}/>
        </div>
    )
}

export default Forminput;