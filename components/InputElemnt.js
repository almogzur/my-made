
const InputElemnt = ({type,text,id,inputClassName,labeClassName,required}) => {




    return <label 
             htmlFor={id} 
            className={labeClassName}
            >
            {text}
            <br/>
             <input 
              required={required? true : false}
              placeholder={required? "*" : null}
              type={type}
              id={id}
              className={inputClassName}
               />
           </label>
      
 
    
   }
   export default InputElemnt
   