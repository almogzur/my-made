import {m ,LazyMotion} from "framer-motion"
import Colors from "@/lib/colors";

const loadFeatures = () =>
    import("@/lib/features.js")
        .then(res => res.default)
  
  

const InputElement = ({
    type,
    text,
    id,
    required,
    stateKey,
    value,
    onChange,
    style,
    // it type is number
    min,
    max,
    step
}) => {
    const defaultStyle = {
        label: {},
        input: {
            minWidth:"400px",
            border: `1px solid ${Colors.b}`,
            borderRadius: "6px",
            padding: "10px",
            margin: "10px 0",
            boxShadow: `2px 1px 1px ${Colors.c}`,
            ...style
            
    }
}

    const handleChange = (e) => {
        const { value } = e.target;
        onChange(id, value, stateKey);
    };

    return (
        <LazyMotion features={loadFeatures}>
        <label
            style={defaultStyle.label}
            htmlFor={id}
        
        >
            {text}
            <br />
            <m.input
               whileHover={{scale:1.1 ,  duration:1}} 
               transition={{ duration: 1 }}
                style={defaultStyle.input}
                required={required || false}
                placeholder={required ? "*" : null}
                type={type}
                id={id}
                max={type === "number" ? max : null}
                min={type === "number" ? min : null}
                step={type === "number" ? step :null}       
                pettern={type === "number" ? "^\$\d{1,3}(,\d{3})*(\.\d+)?$" :null}    
                onChange={handleChange}
                value={value || ''}
                
            />
        </label>
        </LazyMotion>
    );
};

export default InputElement;
