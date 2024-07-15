
 export default function TSwitch  ({name,text,callback}) {

     return(
      <label  className={name+"switch"}>
        <input type="checkbox" onClick={callback}/>
        <span className={name+"slider"}></span>
        <h2>{text}</h2>
      </label>
     )
    }