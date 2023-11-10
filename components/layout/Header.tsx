import classes from "../../styles/layout.module.css"
import React from 'react'
import BurgerMenu from "../ui/BurgerMenu"

type HeaderProps = {
    children: React.ReactNode
}

const Header: React.FC<HeaderProps> = ({ children }) => {
    return (
        <div className={classes.header}>
            <div className={classes.header_content_mobile}>
                <BurgerMenu>
                    {children}
                </BurgerMenu>
            </div>
            <div className={classes.header_content_normal}>
                {children}
            </div>
        </div>
    )
}

export default Header