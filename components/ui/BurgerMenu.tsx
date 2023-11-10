import React, { useState } from 'react';
import styles from '../../styles/burgerMenu.module.css';

interface BurgerMenuProps {
    children: React.ReactNode
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`${styles.burger_menu} ${isOpen ? styles.open : ''}`}>
            <div className={styles.burger_icon} onClick={toggleMenu}>
                <div className={styles.bar1}></div>
                <div className={styles.bar2}></div>
                <div className={styles.bar3}></div>
            </div>
            <div className={styles.menu_items}>
                {children}
            </div>
        </div>
    );
};

export default BurgerMenu;