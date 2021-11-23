import './styles.css'

function InputGroup({
    label,
    placeholder,
    id,
    name,
    value,
    onChange,
    required = false
}) {
    return (
        <div
            className="InputGroup"
        >
            <label for={name}>
                {label}
            </label>
            <input
                id={id}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                required={required}
            />
        </div>
    )
}

export default InputGroup