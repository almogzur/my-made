import { useEffect, useState, useContext } from 'react';
import { StateContext } from '../../context';

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

const sliderStyle = (isChecked) => ({
  position: 'absolute',
  cursor: 'pointer',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  backgroundColor: isChecked ? 'var(--d)' : 'var(--c)',
  transition: '.4s',
  borderRadius: '10px',
});

const sliderBeforeStyle = (isChecked) => ({
  position: 'absolute',
  content: '""',
  height: '16px',
  width: '16px',
  left: isChecked ? '26px' : '4px',
  bottom: '4px',
  backgroundColor: 'white',
  transition: '.8s',
  borderRadius: '10px',
});

export default function ToggleSwitch({ text, PropsOnChange, id }) {
  const [state,setStat] = useContext(StateContext);
  const [isChecked, setIsChecked] = useState(false);



  const handleChange = (e) => {
    setIsChecked(!isChecked);

    if (PropsOnChange) PropsOnChange(id, isChecked);
  };

  return (
    <div style={switchWrapperStyle}>
      <h4>{isChecked ? 'זמין' : 'לא זמין'}</h4>
      <label style={switchStyle}>
        <input
          id={id}
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          style={{ display: 'none' }}
        />
        <span style={sliderStyle(isChecked)}>
          <span style={sliderBeforeStyle(isChecked)}></span>
        </span>
      </label>
    </div>
  );
}
