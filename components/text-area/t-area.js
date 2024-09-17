import Colors from "../../lib/colors";


const TextArea = ({
  id,
  rows,
  cols,
  value,
  PropsOnChange,
  labelText,
  placeholder,
  StyleLable,
  StyleTextArea,
}) => {


  const handleChange = (e) => {
    const { value } = e.target;
    PropsOnChange(id, value);
  };

  return (
      <label
        style={StyleLable}
        htmlFor={id}
      >
        <strong>{ labelText}</strong>

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
            style={StyleTextArea}
        
       
          />
      </label>


  );
};

export default TextArea;
