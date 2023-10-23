import { ReactNode } from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    customClass?: string
}

const Button: React.FC<ButtonProps> = ({
    name,
    disabled,
    children,
    customClass,
    ...rest
}) => {
    return <button {...rest} name={name} disabled={disabled} className={`button ${customClass}`}>{children}</button>
}

export default Button