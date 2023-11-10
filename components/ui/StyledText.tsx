import React from 'react'
import classes from "../../styles/styledText.module.css"

interface StyledTextProps {
    size?: "small" | "medium" | "big",
    inline?: boolean,
    bold?: boolean,
    italic?: boolean,
    white?: boolean,
    children: React.ReactNode
}

const StyledText: React.FC<StyledTextProps> = ({ size, inline, bold, children, italic, white }) => {

    const getBoldClassname = () => {
        if (bold) return classes.bold
        else return ""
    }

    const getInlineClassname = () => {
        if (inline) return classes.inline
        else return ""
    }

    const getSizeClassName = () => {
        if (!size) return classes.medium
        else return classes[size]
    }

    const getItalicClassName = () => {
        if (!italic) return
        else return classes.italic
    }

    return (
        <div className={`${getSizeClassName()} ${getInlineClassname()} ${getBoldClassname()} ${getItalicClassName()} ${white && classes.white}`}>
            {children}
        </div>
    )
}

export default StyledText