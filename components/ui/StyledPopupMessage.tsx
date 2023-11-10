import React, { useState, useEffect } from 'react';
import classes from "../../styles/styledMessage.module.css"
import { StyledMessageComponentTypes } from '@/ts/styledCoponents';
import Loader from './Loader';

type StyledPopupMessageProps = {
    type: StyledMessageComponentTypes
    text?: string,
    disappearTime?: number,
}

const StyledPopupMessage: React.FC<StyledPopupMessageProps> = ({ type, text, disappearTime }) => {

    const [isVisible, setIsVisible] = useState(false)
    useEffect(() => {
        let timerRef: NodeJS.Timer
        setIsVisible(true);
        if (disappearTime) {
            timerRef = setTimeout(() => {
                setIsVisible(false);
            }, disappearTime);
        }
        return () => clearTimeout(timerRef);
    }, []);

    return (
        <div className={`${classes.popup} ${isVisible ? classes.show : ''} ${classes["popup_" + type]}`}>
            {type === StyledMessageComponentTypes.loading
                ? <Loader />
                : <div >{text}</div>
            }
        </div>
    );
};

export default StyledPopupMessage;
