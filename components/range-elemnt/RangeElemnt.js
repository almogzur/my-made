// RangeInput.js
import React from 'react';

const RangeElemnt = ({ 
     minValue, 
     maxValue, 
     label ,
     id,
     onChange,
     propsStyle
  }) => {

    const defusltStyle = {
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
    }

    const handleChange = (e) => {
        const { value } = e.target;
        onChange(id, value, STATE_KEY);
      };
    
    
    return (
    
            <label 
            style={defusltStyle}
            
            htmlFor={id}>{label}
            <input 
                type="range" 
                id={id} 
                min={minValue} 
                max={maxValue} 
                onChange={handleChange} 
            />
            <strong>{minValue}</strong>
        </label>
    );
}

export default RangeElemnt;
