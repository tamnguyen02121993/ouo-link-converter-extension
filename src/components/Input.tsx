import { ReactNode } from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    customClass?: string
}

const Input: React.FC<InputProps> = ({
    name,
    disabled,
    customClass,
    ...rest
}) => {
    return <input {...rest} name={name} disabled={disabled} className={`app__input ${customClass ?? ''}`} />
}

export default Input