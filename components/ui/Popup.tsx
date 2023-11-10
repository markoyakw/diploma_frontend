import React, { useEffect } from 'react';
import classes from "../../styles/popup.module.css"

interface PopupProps {
    isOpen: boolean;
    closePopup: () => void;
    children: React.ReactNode
}

const Popup: React.FC<PopupProps> = ({ isOpen, children, closePopup }) => {
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            closePopup();
        }
    };
    
    useEffect(() => {
        const handleEscKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                closePopup();
            }
        };

        window.addEventListener('keydown', handleEscKey);
        return () => {
            window.removeEventListener('keydown', handleEscKey);
        };
    }, [isOpen, closePopup]);

    return isOpen ? (
        <div className={classes.popup_container}>
            <div className={classes.overlay} onClick={handleOverlayClick}></div>
            <div className={classes.popup_menu}>
                <div className={classes.menu}>
                    {children}
                </div>
            </div>
        </div>
    ) : null;
};

export default Popup;