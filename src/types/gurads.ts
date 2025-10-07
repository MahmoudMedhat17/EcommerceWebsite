const isString = (payload:unknown) : payload is string =>{
    return typeof payload === "string";
};


export default isString;