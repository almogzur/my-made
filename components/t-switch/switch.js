
  ///
  ///   Style In Css File
  ///

 export default function TSwitch  ({
      name,
      text,
      callback
     }) {

     return(
       <div className="switch-wrapper">
        <label  className={"switch"}>
         <input type="checkbox" onClick={callback}/>
           <span className={"slider"}></span>
           <h2>{text}</h2>
         </label>
       </div>
     )
    }