// RangeInput.js
import React from 'react';

const RangeInput = ({ 
     minValue, 
     maxValue, 
     price ,
     id,
     user,
     onChange,
     className 
  }) => {
    
    return (
        <div className={className}>
            <label htmlFor={id}>Value for {price}:</label>
            <input 
                type="range" 
                id={id} 
                min={minValue} 
                max={maxValue} 
                onChange={onChange} 
                aria-label={`range input for ${user}`}
            />
            <span id={`${id}-value`}>{minValue}</span>
        </div>
    );
}

export default RangeInput;
