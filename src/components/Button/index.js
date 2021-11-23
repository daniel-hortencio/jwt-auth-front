import './styles.css'

function InputGroup({
    type = "button",
    children,
    onClick,
    style,
    disabled,
    className
}) {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            style={style}
            className={`bg-primary ${className}`}
        >
            {children}
        </button>
    )
}

export default InputGroup