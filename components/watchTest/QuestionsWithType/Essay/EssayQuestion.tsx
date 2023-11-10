import StyledText from '@/components/ui/StyledText'
import { IEssayQuestion } from '@/ts/test'
import React from 'react'
import classes from "../../../../styles/test.module.css"

interface AnswerContainerProps {
    question: IEssayQuestion,
    questionId: number
}

const EssayQuestion: React.FC<AnswerContainerProps> = ({ question, questionId }) => {

    return (
        <div>
            <StyledText size='big'>{questionId}) Напишіть есе на тему:</StyledText>
            <StyledText size='big'>{question.question}</StyledText>
            <div className={classes.answer_container}>
                <pre className={classes.preformated_text}>
                    <StyledText>
                        {question.answer}
                    </StyledText>
                </pre>
            </div>
        </div>
    )
}

export default EssayQuestion