import React, { useEffect, useState } from 'react';
import classes from "../../../styles/auth.module.css"
import GreetingSlide from './GreetingSlide';
import GreetingSliderNavigationButton from './GreetingSliderNavigationButton';

interface SliderProps {
    items: Array<{ header: string, textParagraphs: Array<string> }>;
}

const GreetingSlider: React.FC<SliderProps> = ({ items }) => {

    const [currentIndex, setCurrentIndex] = useState<number>(0);
    let intervalRef: NodeJS.Timer | null = null

    const startSlideChangeInterval = () => {
        intervalRef = setInterval(() => {
            nextSlide()
        }, 7000)
    }

    const nextSlide = () => {
        setCurrentIndex((currentIndex + 1) % items.length)
    };

    const setCurrentSlide = (index: number) => {
        if (intervalRef) {
            clearInterval(intervalRef)
            startSlideChangeInterval()
        }
        setCurrentIndex(index)
    }

    useEffect(() => {
        startSlideChangeInterval()
        return () => {
            if (intervalRef) {
                clearInterval(intervalRef)
            }
        }
    }, [currentIndex])

    return (
        <>
            <GreetingSlide items={items[currentIndex]} />
            <div className={classes.greeting_slider_navigation_menu}>
                {items.map((item, index) => {
                    if (index === currentIndex) return <GreetingSliderNavigationButton active onClick={() => setCurrentSlide(index)} key={item.header}/>
                    return <GreetingSliderNavigationButton onClick={() => setCurrentSlide(index)} key={item.header}/>
                })}
            </div>
        </>
    );
};

export default GreetingSlider;
