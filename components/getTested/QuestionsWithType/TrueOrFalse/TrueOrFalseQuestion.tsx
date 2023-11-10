import { useAppDispatch } from '@/hooks/reduxTypedHooks'
import { ITrueOrFalseQuestion } from '@/ts/test'
import React from 'react'
import classes from "../../../../styles/test.module.css"
import StyledText from '@/components/ui/StyledText'
import { onTrueOrFalseAnswerToggle } from '@/store/getTestedSlice'

interface AnswerContainerProps {
    question: ITrueOrFalseQuestion
    questionId: number
}

const TrueOrFalseQuestion: React.FC<AnswerContainerProps> = ({ question, questionId }) => {

    const dispatch = useAppDispatch()

    return (
        <div>
            <StyledText size='big'>{question.question}</StyledText>
            <StyledText>Правда або брехня?</StyledText>
            <div className={classes.answer_container}>
                <input className={classes.checkbox} type='checkbox' checked={question.answer} onChange={(e) => dispatch(onTrueOrFalseAnswerToggle({ questionId }))} />
                <div className={classes.checkbox_answer + " " + classes.answer_text}>
                    <StyledText>Правда</StyledText>
                </div>
            </div>
            <div className={classes.answer_container}>
                <input className={classes.checkbox} type='checkbox' checked={!question.answer} onChange={(e) => dispatch(onTrueOrFalseAnswerToggle({ questionId }))} />
                <div className={classes.checkbox_answer + " " + classes.answer_text}>
                    <StyledText>Брехня</StyledText>
                </div>
            </div>
        </div>
    )
}

export default TrueOrFalseQuestion