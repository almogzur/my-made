import { useContext } from "react";
import { VendorContaxt, CostumrContaxt, UserContaxt } from "contaxt/contaxt";

const InputElemnt = ({
    type,
    text,
    id,
    labelClassName,
    required,
    inputClassName,
    contextType
}) => {
    const [Vendor, setVendor] = useContext(VendorContaxt);
    const [Customer, setCustomer] = useContext(CostumrContaxt);
    const [User, setUser] = useContext(UserContaxt);

    const handleChange = (e) => {
        
        const { value, id } = e.target;

        // Determine which context to update based on contextType
        switch (contextType) {
            case 'Vendor':
                setVendor((prev) => ({ ...prev, [id]: value }));
                break;
            case 'Customer':
                setCustomer((prev) => ({ ...prev, [id]: value }));
                break;
            case 'User':
                setUser((prev) => ({ ...prev, [id]: value }));
                break;
            default:
                console.warn(`Unknown contextType: ${contextType}`);
        }
    };;

    return (
        <label 
            htmlFor={id} 
            className={labelClassName ? labelClassName : null}
        >
            {text}
            <br />
            <input 
                required={required ? true : false}
                placeholder={required ? "*" : null}
                type={type}
                id={id}
                className={inputClassName}
                onChange={handleChange}
            />
        </label>
    );
};

export default InputElemnt;
