import StyledText from '@/components/ui/StyledText'
import React from 'react'
import classes from "../../../styles/auth.module.css"

interface GreetingSlideProps {
    items: {
        header: string,
        textParagraphs: Array<string>,
    }
}

const GreetingSlide: React.FC<GreetingSlideProps> = ({ items: { textParagraphs, header } }) => {
    return (
        <div className={classes.greeting_slide}>
            <StyledText size='big' bold>{header}</StyledText>
            {textParagraphs.map((text) =>
                <React.Fragment key = {text}>
                    <div className='horisontal_line'></div>
                    <StyledText>{text}</StyledText>
                </React.Fragment>
            )}
        </div>
    )
}

export default GreetingSlide