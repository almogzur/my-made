import { useContext, useState } from "react";
import { StateContext } from "../../context";

export default function TSwitch({
  name,
  text,
  PropsOnChange,
  STATE_KEY,
}) {
  const [state, setState] = useContext(StateContext);
  const [isChecked, setIsChecked] = useState(false);



  const switchWrapperStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  };

  const switchStyle = {
    position: "relative",
    display: "inline-block",
    width: "50px",
    height: "24px",
    visibility: "visible",
  };

  const sliderStyle = {
    position: "absolute",
    cursor: "pointer",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: isChecked ? "var(--d)" : "var(--c)",
    transition: ".2s",
    borderRadius: "10px",
  };

  const sliderBeforeStyle = {
    position: "absolute",
    content: '""',
    height: "16px",
    width: "16px",
    left: isChecked ? "30px" : "4px",
    bottom: "4px",
    backgroundColor: "white",
    transition: ".8s",
    borderRadius: "10px",
  };

  return (
    <div style={switchWrapperStyle}>
      <label style={switchStyle}>
        <input type="checkbox"  />
        <span style={sliderStyle}>
          <span style={sliderBeforeStyle}></span>
        </span>
        <h2>{text}</h2>
      </label>
    </div>
  );
}
