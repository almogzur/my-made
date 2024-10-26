import Colors from "../../lib/colors";

const Style = { 
  label:{
   backgroumd:"red"
  },
  textarea:{ 
     resize: "none" ,
     fontWeight:"bold",
     borderRadius:"3px",   
     backgroumd:"green",
     color:"red",
     border:"solid"
    }

}

const TextArea = ({
  id,
  rows,
  cols,
  value,
  PropsOnChange,
  labelText,
  placeholder,
  PropsStyleLable,
  PropsStyleTextArea,
}) => {


  const handleChange = (e) => {
    const { value } = e.target;
    PropsOnChange(id, value);
  };

  return (
    <>     
     <label
        style={PropsStyleLable ? PropsStyleLable : Style.label}
        htmlFor={id}
      >
        <strong>{ labelText}</strong>
        </label>
          <textarea
            id={id}
            value={value}
            rows={rows || 4}
            cols={cols || 50}
            maxLength={500}
            autoFocus={false}
            readOnly={false}
            required={false}
            disabled={false}
            spellCheck={true}
            placeholder={placeholder ? placeholder : null}
            onChange={handleChange}
            style={PropsStyleTextArea?  PropsStyleTextArea : Style.textarea} 
         />
     

</>

  );
};

export default TextArea;
