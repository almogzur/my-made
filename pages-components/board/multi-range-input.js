import React, { useCallback, useEffect, useState, useRef } from "react";

const MultiRangeSlider = ({ min, max, PropsOnChange }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set position and width of the range to always fill the gap between the thumbs
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      // Set the left position of the range to the left thumb (minVal)
      range.current.style.left = `${minPercent}%`;

      // Set the width of the range to cover the gap between minVal and maxVal
      range.current.style.width = `${maxPercent-minPercent }%`;
    }

    
  }, [minVal, maxVal, getPercent]);

  // Get min and max values when their state changes

  return (
    <div className="rang-container">
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          setMinVal(value);
          minValRef.current = value;
          PropsOnChange({ min: minVal, max: maxVal });

        }}
        className="thumb thumb--left"
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1);
          setMaxVal(value);
          maxValRef.current = value;
          PropsOnChange({ min: minVal, max: maxVal });
        }}
        className="thumb thumb--right"
      />

      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
        <div className="slider__left-value">{maxVal + " שח לשעה"}</div>
        <div className="slider__right-value">{minVal + " שח"}</div>
      </div>
    </div>
  );
};



export default MultiRangeSlider;
