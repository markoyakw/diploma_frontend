import React, { ChangeEvent, TextareaHTMLAttributes, useEffect, useRef, useState } from 'react'
import classes from "../../styles/styledInput.module.css"
import messageClasses from "../../styles/styledMessage.module.css"
import StyledMessageComponent from './StyledMessage'
import { StyledMessageComponentTypes } from '@/ts/styledCoponents'

type StyledInputProps = {
    messageType?: StyledMessageComponentTypes | undefined;
    messageText?: string | undefined;
    label?: string;
    id: string;
    sizeClass?: 'medium' | 'big';
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const StyledTextArea: React.FC<StyledInputProps> = ({
    label,
    id,
    messageText,
    messageType,
    sizeClass,
    ...props
}) => {

    const containerRef = useRef<HTMLDivElement | null>(null);
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null)

    useEffect(() => {
        if (containerRef && containerRef.current && textAreaRef && textAreaRef.current) {
            containerRef.current.style.height = "0px";
            const scrollHeight = textAreaRef.current.scrollHeight;
            containerRef.current.style.height = scrollHeight + "px";
        }
    }, [props.value]);

    return (
        <div ref={containerRef} className={`${classes.container}`}>
            <textarea ref={textAreaRef}
                {...props} placeholder=' ' id={id}
                className={`${classes.textArea} ${classes.input} ${messageType && messageText ? classes.error : ""}`}
            />
            <label htmlFor={id} className={classes.label}>{label}</label>
            {messageType && messageText && <StyledMessageComponent className={messageClasses.input_error} text={messageText} type={messageType} />}
        </div>
    );
};

export default StyledTextArea;