import React, { ButtonHTMLAttributes } from 'react'
import classes from "../../styles/styledButton.module.css"

type StyledButtonProps = {
    children: React.ReactNode,
    symbol?: "arrow_down" | "arrow_right" | "arrow_up" | "plus" | "trash" | "edit" | "check" | "stop" | "copy",
    type?: "button" | "submit",
    size?: "big" | "small",
    color?: "blue" | "orange",
} & ButtonHTMLAttributes<HTMLButtonElement>

const StyledButton: React.FC<StyledButtonProps> = ({ children, symbol, type, size, color, ...props }) => {

    const className = `${classes.container} ${props.disabled ? classes.disabled : ""} ${size ? classes[size] : ""} ${color ? classes[color] : ""}`

    const GetSymbol = () => {
        switch (symbol) {
            case "plus":
                return <span style={{ fontSize: "32px", marginRight: "-2px" }}>+</span>
            case "arrow_right":
                return <>⮞</>
            case "arrow_down":
                return <>⮟</>
            case "arrow_up":
                return <>⮝</>
            case "trash":
                return <>🗑️</>
            case "edit":
                return <>✏️</>
            case "copy":
                return <>📝</>
            case "check":
                return <>✔️</>
            case "stop":
                return <>🛑</>
            default:
                return <></>
        }
    }
    return (
        <div className={className}>
            <button {...props} className={classes.button} type={type || "button"}>
                <div className={classes.text}>{children}</div>
                <div className={classes.symbol}>{GetSymbol()}</div>
            </button>
        </div>
    )
}

export default StyledButton