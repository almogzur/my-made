import { m, LazyMotion } from "framer-motion";
import Colors from "@/lib/colors";
import { useContext, useEffect, useState } from "react";
import { WindowWidthContaxt } from "@Context/Context";

const loadFeatures = () =>
  import("@/lib/features.js").then((res) => res.default);

const InputElement = ({
  type,
  text,
  id,
  required,
  STATE_KEY,
  value,
  onChange,
  style,
  min,
  max,
  step,
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
      borderRadius: "6px",
      padding: "10px",
      margin: "10px 0",
      boxShadow: `2px 1px 1px ${Colors.c}`,
    },
  };

  const handleChange = (e) => {
    const { value } = e.target;
    onChange(id, value, STATE_KEY);
  };

  return (
    <LazyMotion features={loadFeatures}>
      <label style={defaultStyle.label} htmlFor={id}>
        <strong>{text}</strong>
        <m.input
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 1 }}
          style={defaultStyle.input}
          required={required || false}
          placeholder={required ? "*" : null}
          type={type}
          id={id}
          max={type === "number" ? max : null}
          min={type === "number" ? min : null}
          step={type === "number" ? step : null}
          pattern={type === "number" ? "^\\$\\d{1,3}(,\\d{3})*(\\.\\d+)?$" : null}
          onChange={handleChange}
          value={value || ""}
        />
     </label>

    </LazyMotion>
  );
};

export default InputElement;
