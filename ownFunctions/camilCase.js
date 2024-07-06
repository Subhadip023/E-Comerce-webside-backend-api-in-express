const  camelCase=(string)=>{
    string=string.toLowerCase()
    return(string[0].toUpperCase()+string.substring(1,(string.lengt)))
}

export default camelCase;