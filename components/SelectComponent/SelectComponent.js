import { useContext, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports with loading component
const DynamicSelect = dynamic(() => import('rc-select'), {
  ssr: false,
  loading: () => <div>Loading Select...</div>,
});

const DynamicOption = dynamic(() => import('rc-select').then(mod => mod.Option), {
  ssr: false,
  loading: () => <div>Loading Option...</div>,
});

const SelectElemnt = ({
  id,
  hedlineText,
  SelectOptionsArray,
  className,
  value,       // prop to handle selected values
  onChange,    // prop to handle changes
}) => {
  return (
    <label htmlFor={id} 
      style={{ display: "flex", flexDirection: "column" }}
    >
      {hedlineText}
      <DynamicSelect
        animation={"slide-up"}
        mode='multiple'
        multiple
        className={className}
        value={value}
        onChange={onChange}
      >
        {SelectOptionsArray.map((option, i) => (
          <DynamicOption value={option} key={i}>{option}</DynamicOption>
        ))}
      </DynamicSelect>
    </label>
  );
};

export default SelectElemnt;
