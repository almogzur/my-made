import Colors from "@/lib/colors";
import Features from "@/lib/features"

import {m,LazyMotion} from "framer-motion"


const TextArea = ({
  id,
  rows,
  cols,
  value,
  onChange,
  className,
  resize,
  text,
  style,
  placeholder
}) => {
 
                  
 
  const handleChange = (e) => {

    const { value } = e.target;

    onChange(id, value);
  };



  return (
  <>
      <label style={{minWidth:"400px",textAlign:"start"}} htmlFor={id}>{text}</label>
      <LazyMotion features={Features}>
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
            placeholder={placeholder?placeholder:null}
            onChange={handleChange}
           style={{
                width: '100%',
                maxWidth: '400px',
                border: `1px solid ${Colors.b}`,
                borderRadius: "6px",
                padding: "10px",
                margin: "10px 0",
                boxShadow: `2px 1px 1px ${Colors.c}`,
                resize:"none",
                ...style
            
        }}
        transition={{ duration: 1 }}
        whileHover={{scale:  1.1 }}    
      />
      </LazyMotion>
      </>  
  );
};

export default TextArea;
