import { m, LazyMotion } from "framer-motion";
import Colors from '../../lib/colors.js'
import { useContext, useEffect, useState } from "react";
import { WindowWidthContaxt } from "../../context.js";
  import f  from '../../lib/features.js'

const InputElement = ({
  type,
  text,
  id,
  required,
  value,
  PropsOnChange,
  min,
  max,
  step,
  name
}) => {

  const [width, setWidth] = useState("");
  const { md, sm } = useContext(WindowWidthContaxt);
  
  const handleResize = () => {
    if (sm) {
        setWidth("90%");
    } else if (md) {
        setWidth("500px");
    } else {
      setWidth("700px")
    }
  };

  useEffect(() => {
    handleResize();
  }, [md, sm,setWidth,width]);

  const defaultStyle = {
    label: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    input: {
      width: width,
      border: `1px solid ${Colors.b}`,
      borderRadius: "1px",
      padding: "10px",
      margin: "10px 0",
      boxShadow: `1px 1px 1px ${Colors.c}`,
    },
  };

  const handleChange = (e) => {
    const { value } = e.target;
    PropsOnChange(id, value);
  };

  return (
    <LazyMotion features={f}>
      <label style={defaultStyle.label} htmlFor={id}>
        <strong>{text}</strong>
        <m.input
          name={name?name:null}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 1 }}
          style={defaultStyle.input}
          required={required || false}
          placeholder={required ? "*" : null}
          type={type}
          id={id}
          max={typeof type === "number" ? max : null}
          min={typeof type === "number" ? min : null}
          step={typeof type === "number" ? step : null}
          pattern={
              type === "number" ? "^\\$\\d{1,3}(,\\d{3})*(\\.\\d+)?$" : 
              type === "tel" ? "[0-9]{10}" :
              null  
              }
          onChange={handleChange}
          value={value}
        />
     </label>

    </LazyMotion>
  );
};

export default InputElement;
