import React, { useState } from "react";

const PriceRange = () => {
  const [price, setPrice] = useState(1); // Default price

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  return (
    <div style={{
         display:'flex',
         flexDirection:'row',
         justifyContent:'space-between',

      }}>
      {/* Price displayed on the left */}
      <span
        style={{
          color: "#769FCD",
        }}
      >
         {price} ש״ח
      </span>
      
      {/* Range input */}
      <input
        type="range"
        id="price"
        name="price"
        min="0"
        max="100"
        value={price}
        onChange={handlePriceChange}
        style={{
          width: "85%",
          background: "linear-gradient(to right, #F7FBFC, #D6E6F2, #B9D7EA, #769FCD)", // Gradient of your colors
          borderRadius: "5px",
          outline: "none",
          appearance: "none",
        }}
      />
      
      <style>
        {`
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px; /* Bigger pointer */
            height: 20px; /* Bigger pointer */
            border-radius: 50%;
            background: #769FCD; /* Pointer color */
            cursor: pointer;
          }

          input[type="range"]::-moz-range-thumb {
            width: 20px; /* Bigger pointer */
            height: 20px; /* Bigger pointer */
            border-radius: 50%;
            background: #769FCD; /* Pointer color */
            cursor: pointer;
          }

          input[type="range"]::-ms-thumb {
            width: 20px; /* Bigger pointer */
            height: 20px; /* Bigger pointer */
            border-radius: 50%;
            background: #769FCD; /* Pointer color */
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
};

export default PriceRange;
