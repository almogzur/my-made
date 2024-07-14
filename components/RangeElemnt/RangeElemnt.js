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
    
    return (
    
            <label 
            style={defusltStyle}
            
            htmlFor={id}>{label}
            <input 
                type="range" 
                id={id} 
                min={minValue} 
                max={maxValue} 
                onChange={onChange} 
            />
            <strong>{minValue}</strong>
        </label>
    );
}

export default RangeElemnt;
