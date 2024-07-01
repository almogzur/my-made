const TextArea = ({
  id,
  rows,
  cols,
  value,
  onChange
}) => {
  const handleChange = (e) => {
    const { value } = e.target;
    onChange(id, value);
  };

  return (
    <div>
      <label htmlFor={id}>{id}</label>
      <textarea
        id={id}
        value={value || ''}
        onChange={handleChange}
        rows={rows || 4}
        cols={cols || 50}
        maxLength={500}
        autoFocus={false}
        readOnly={false}
        required={false}
        disabled={false}
        wrap="soft"
        spellCheck={true}
        style={{
          resize: 'both',
          width: '100%',
          height: '100px',
        }}
      />
    </div>
  );
};

export default TextArea;
