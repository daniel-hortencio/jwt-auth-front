import Loader from '../Loader'

import './styles.css'

function InputGroup({
    type = "button",
    children,
    onClick,
    style,
    disabled,
    className,
    isLoading = false
}) {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            style={style}
            className={`bg-primary ${className}`}
        >
            {isLoading &&
                <span className="button-loader bg-primary">
                    <Loader />
                </span>
            }

            {children}
        </button>
    )
}

export default InputGroup