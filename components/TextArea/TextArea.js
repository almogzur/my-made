const TextArea = ({
  id,
  rows,
  cols,
  value,
  onChange,
  className,
  resize,

}) => {
  


  const handleChange = (e) => {

    const { value } = e.target;
    
    onChange(id, value);
  };



  return (
  <>
      <label htmlFor={id}>{id}</label>
      <textarea
        id={id}
        value={value}
        className={className}
        rows={rows || 4}
        cols={cols || 50}
        maxLength={500}
        autoFocus={false}
        readOnly={false}
        required={false}
        disabled={false}
        wrap="soft"
        spellCheck={true}
        onChange={handleChange}
        style={{
          resize: resize? resize : 'both',
          borderRadius:"5px",
          height: '100px',
          resize:"none"
        }}
      />
      </>  
  );
};

export default TextArea;
