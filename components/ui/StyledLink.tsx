import React, { ButtonHTMLAttributes } from 'react'
import classes from "../../styles/styledText.module.css"

type StyledLinkProps = {
    children: React.ReactNode,
    size?: "small" | "medium" | "big",
    bold?: boolean,
    color?: "white",
    active?: boolean,
    additionalClassName?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

const StyledLink: React.FC<StyledLinkProps> = ({ children, size, bold, color, active, additionalClassName, ...props }) => {

    const getSizeClassName = () => {
        if (!size) return classes.medium
        else return classes[size]
    }

    return (
        <span {...props} className={`${classes.link} ${getSizeClassName()} ${additionalClassName && classes[additionalClassName]}} 
         ${bold && classes.bold} ${color && classes[color]} ${active && classes.active} `}>
            {children}
        </span>
    )
}

export default StyledLink