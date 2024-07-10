import {m ,LazyMotion} from "framer-motion"
import Colors from "@/lib/colors";
import { features } from "process";

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
    style
}) => {
    const defaultStyle = {
        label: {},
        input: {
            width: '100%',
            maxWidth: '400px',
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
        
                onChange={handleChange}
                value={value || ''}
            />
        </label>
        </LazyMotion>
    );
};

export default InputElement;
