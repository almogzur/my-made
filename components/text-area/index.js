import Colors from "../../lib/colors";
import Features from "../../lib/features";

import { m, LazyMotion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { WindowWidthContaxt } from '../../context'
const TextArea = ({
  id,
  rows,
  cols,
  value,
  onChange,
  resize,
  text,
  placeholder,
}) => {
  const [width, setWidth] = useState("");
  const {md,sm} =useContext(WindowWidthContaxt)

  const handleResize = () => {
    if (sm) {
        setWidth("90%");
    } else if (md) {
        setWidth("500px");
    } else {
      setWidth("700px")
    }
  };

  useEffect(()=>{
      handleResize()
  },[width,setWidth,md,sm])

  const defaultStyle = {
    width: width,
    border: `1px solid ${Colors.b}`,
    borderRadius: "3px",
    padding: "10px ",
    margin: "10px 0",
    boxShadow: `2px 1px 1px ${Colors.c}`,
    resize: resize? resize: "none",
 
    
  };

  const handleChange = (e) => {
    const { value } = e.target;
    onChange(id, value);
  };

  return (
    <LazyMotion features={Features}>
      <label
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
       

        }}
        htmlFor={id}
      >
        <strong>{text}</strong>

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
            style={defaultStyle}
            transition={{ duration: 1 }}
            whileHover={{ scale: 1.1 }}
          />
        </label>
        </LazyMotion>

  );
};

export default TextArea;
