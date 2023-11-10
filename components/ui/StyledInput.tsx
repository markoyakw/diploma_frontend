import React, { InputHTMLAttributes } from 'react'
import classes from "../../styles/styledInput.module.css"
import messageClasses from "../../styles/styledMessage.module.css"
import StyledMessageComponent from './StyledMessage'
import { StyledMessageComponentTypes } from '@/ts/styledCoponents'

type StyledInputProps = {
    messageType?: StyledMessageComponentTypes | undefined,
    messageText?: string | undefined,
    label?: string,
    id: string,
    sizeClass?: "medium" | "big"
} & InputHTMLAttributes<HTMLInputElement>

const StyledInput: React.FC<StyledInputProps> = ({
    label, id, messageText, messageType, sizeClass, ...props
}) => {

    return (
        <div className={`${classes.container} ${sizeClass ? classes[sizeClass] : classes.medium}`}>
            <input {...props} placeholder=' ' id={id}
                className={`${classes.input} ${messageType && messageText ? classes.error : ""}`} />
            <label htmlFor={id} className={classes.label}>{label}</label>
            {messageType && messageText && <StyledMessageComponent className={messageClasses.input_error} text={messageText} type={messageType} />}
        </div>
    )
}

export default StyledInput