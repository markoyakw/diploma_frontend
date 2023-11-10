import React, { ButtonHTMLAttributes } from 'react'
import classes from "../../../styles/auth.module.css"

type GreetingSliderNavigationButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    active?: boolean | undefined
}

const GreetingSliderNavigationButton: React.FC<GreetingSliderNavigationButtonProps> = ({ active, ...props }) => {

    const getActiveStyles = () => {
        if (active) return classes.active
        else return ""
    }

    return (
        <button {...props} className={`${classes.greeting_slider_navigation_button} ${getActiveStyles()}`}>
        </button>
    )
}

export default GreetingSliderNavigationButton