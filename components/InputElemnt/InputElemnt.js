import { useContext } from 'react';
import { UserContext } from 'Context/Context';

const InputElemnt = ({
    type,
    text,
    id,
    labelClassName,
    required,
    inputClassName,
    contextType,
}) => {
    const [User, setUser] = useContext(UserContext);

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

        setUser((prev) => {
            const newState = { ...prev };
            switch (contextType) {
                case 'Vendor':
                    newState.isVendor[id] = value;
                    break;
                case 'Customer':
                    newState.isCustomer[id] = value;
                    break;
                default:
                    newState[id] = value;
                    break;
            }
            return newState;
        });
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
                value={contextType === 'Vendor' ? User.isVendor[id] : contextType === 'Customer' ? User.isCustomer[id] : User[id] || ''}
            />
        </label>
    );
};

export default InputElemnt;
