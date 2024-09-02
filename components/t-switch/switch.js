import { useEffect, useState, useContext } from 'react';


const switchWrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const switchStyle = {
  position: 'relative',
  display: 'inline-block',
  width: '50px',
  height: '24px',
  visibility: 'visible',
};

const sliderStyle = (cssIsChecked) => ({
  position: 'absolute',
  cursor: 'pointer',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  backgroundColor: cssIsChecked ? 'var(--d)' : 'var(--c)',
  transition: '.4s',
  borderRadius: '10px',
});

const sliderBeforeStyle = (cssIsChecked) => ({
  position: 'absolute',
  content: '""',
  height: '16px',
  width: '16px',
  left: cssIsChecked ? '26px' : '4px',
  bottom: '4px',
  backgroundColor: 'white',
  transition: '.8s',
  borderRadius: '10px',
});


 const ToggleSwitch = ({textOn,textOff, PropsOnChange,id ,value})=>
   {
   const [cssIsChecked, setCssIsChecked] = useState( false  );
   

   const handleChange = (e) => {
       setCssIsChecked(!cssIsChecked);
       console.log(cssIsChecked,"befor its passed to state");
       PropsOnChange(id, e.target.value);
  };

  return (
    <div style={switchWrapperStyle}>
       <h5 style={{margin:"5px"}}>{cssIsChecked ? textOn : textOff}</h5>
      <label style={switchStyle}>
        <input
          id={id}
          type="checkbox"
          onChange={handleChange}
          style={{ display: 'none' }}
          value={value}
        />
        <span style={sliderStyle(cssIsChecked)}>
          <span style={sliderBeforeStyle(cssIsChecked)}></span>
        </span>
      </label>
    </div>
  );
}
export default ToggleSwitch