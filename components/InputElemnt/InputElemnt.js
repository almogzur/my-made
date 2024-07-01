

const InputElement = ({
    type,
    text,
    id,
    labelClassName,
    required,
    inputClassName,
    contextType,
    value,
    onChange,
}) => {
    const defaultStyle = {
        label: {},
        input: {
            width: "300px",
            height: "70px",
            borderRadius: "15px",
            border: "1px solid #404040",
        }
    };

    const handleChange = (e) => {
        const { value } = e.target;
        onChange(id, value, contextType);
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
