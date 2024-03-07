export const InputFields = ({
    label,
    labelStyles,
    inputStyles,
    icon,
    isRequired,
    value,
    onChange,
    id,
    placeholder,
    row
}) => {
    return (
        <div className="mb-4">
            {label && <label
                htmlFor={id}
                className={"text-gray-700 flex items-center " + labelStyles}
            >
                {icon}
                {label} {isRequired &&<span className="text-red-500">*</span>}
            </label>}
            <input
                className={"form-input mt-1 w-full bg-gray-100 hover:bg-blue-100 focus:bg-white px-4 py-2 rounded " + inputStyles}
                value={value}
                onChange={onChange}
                id={id}
                placeholder={placeholder}
                row={row}
                
            />
        </div>
    )
}