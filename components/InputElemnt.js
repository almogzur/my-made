
const InputElemnt = ({type,text,id,classN}) => {

    return <>
      <label htmlFor={id} className={classN}>
       {text}
       <br/>
       <input type={type} id={id}/>
      </label>
      
 
    </>
   }
   export default InputElemnt
   