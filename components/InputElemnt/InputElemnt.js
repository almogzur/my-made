

const InputElement = ({
    type,
    text,
    id,
    labelClassName,
    required,
    inputClassName,
    stateKey,
    value,
    onChange,
}) => {
    const defaultStyle = {
        label: {},
        input: {
            width: "150px",
            height: "40px",
            borderRadius: "10px",
            border: "1px solid #404040",
            margin:"5px"
        }
    };

    const handleChange = (e) => {
        const { value } = e.target;
        onChange(id, value, stateKey);
    };

    return (
        <label
            style={defaultStyle.label}
            htmlFor={id}
            className={labelClassName || null}
        >
            {text}
            <br />
            <input
                style={defaultStyle.input}
                required={required || false}
                placeholder={required ? "*" : null}
                type={type}
                id={id}
                className={inputClassName}
                onChange={handleChange}
                value={value || ''}
            />
        </label>
    );
};

export default InputElement;
