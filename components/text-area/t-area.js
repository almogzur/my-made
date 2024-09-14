import Colors from "../../lib/colors";
import f from "../../lib/features";
import { m, LazyMotion } from "framer-motion";

const TextArea = ({
  id,
  rows,
  cols,
  value,
  PropsOnChange,
  resize,
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
    <LazyMotion features={f}>
      <label
        style={StyleLable}
        htmlFor={id}
      >
        <strong>{ labelText}</strong>

          <m.textarea
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
            transition={{ duration: 1 }}
            whileHover={{ scale: 1.1 }}
            resize={resize?resize:null}
          />
      </label>
        </LazyMotion>

  );
};

export default TextArea;
