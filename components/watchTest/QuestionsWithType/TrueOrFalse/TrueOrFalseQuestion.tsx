import { useAppDispatch } from '@/hooks/reduxTypedHooks'
import { IQuestionGrade, ITrueOrFalseQuestion } from '@/ts/test'
import React from 'react'
import classes from "../../../../styles/test.module.css"
import StyledText from '@/components/ui/StyledText'

interface AnswerContainerProps {
    question: ITrueOrFalseQuestion
    questionId: number,
    questionGrade: IQuestionGrade | undefined
}

const TrueOrFalseQuestion: React.FC<AnswerContainerProps> = ({ question, questionId, questionGrade }) => {

    const getClasses = () => {
        return `${classes.answer_container} ${questionGrade?.questionIsRight? classes.right_answer: classes.wrong_answer}`
    } 

    return (
        <div>
            <StyledText size='big'>{questionId}) {question.question}</StyledText>
            <div className={getClasses()}>
                <input className={classes.checkbox} type='checkbox' checked={question.answer} readOnly />
                <div className={classes.checkbox_answer + " " + classes.answer_text}>
                    <StyledText >Правда</StyledText>
                </div>
            </div>
            <div className={getClasses()}>
                <input className={classes.checkbox} type='checkbox' checked={!question.answer} readOnly />
                <div className={classes.checkbox_answer + " " + classes.answer_text}>
                    <StyledText >Брехня</StyledText>
                </div>
            </div>
        </div>
    )
}

export default TrueOrFalseQuestion