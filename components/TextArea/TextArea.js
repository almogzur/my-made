import { useContext, useEffect } from 'react';
import { UserContext } from '@Context/Context'; // Adjust the path if necessary

const TextArea = ({
  id,
  rows,
  cols,
}) => {
  const [User, setUser] = useContext(UserContext);

  useEffect(()=>{
   console.log(User.about)
  })

  const handleChange = (e) => {
    const { value } = e.target;

    setUser((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div>
      <label htmlFor={id}>{id}</label>
      <textarea
        id={id}
        value={User[id] || ''}
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
