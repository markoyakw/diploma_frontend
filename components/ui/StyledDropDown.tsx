import { useEffect, useRef, useState } from 'react'
import StyledButton from './StyledButton'
import classes from "../../styles/styledDropDown.module.css"

type StyledDropDownProps = {
    children: React.ReactNode,
    buttonText: string | React.ReactNode,
    big?: boolean
}

const StyledDropDown: React.FC<StyledDropDownProps> = ({ children, big, buttonText }) => {

    const dropDownRef = useRef<HTMLDivElement>(null)
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const handleClickOutside = (e: MouseEvent) => {
        if (dropDownRef.current && dropDownRef.current.contains(e.target as Node)) return
        setIsOpen(false)
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <div ref={dropDownRef}>
            <StyledButton size={big ? "big" : "small"} symbol={isOpen ? "arrow_up" : "arrow_down"} onClick={() => setIsOpen(isOpen => !isOpen)} >
                {buttonText}
            </StyledButton>
            <div className={classes.dropdown_content}>
                {isOpen && children}
            </div>
        </div>
    )
}

export default StyledDropDown