import { useAppDispatch } from '@/hooks/reduxTypedHooks'
import { ITrueOrFalseQuestion } from '@/ts/test'
import React from 'react'
import classes from "../../../../../styles/test.module.css"
import QuestionLayout from '../../QuestionLayout'
import { handleTrueOrFalseAnswerChange } from '@/store/testSlice'
import StyledText from '@/components/ui/StyledText'

interface AnswerContainerProps {
    question: ITrueOrFalseQuestion
    questionId: number
}

const TrueOrFalseQuestion: React.FC<AnswerContainerProps> = ({ question, questionId }) => {

    const dispatch = useAppDispatch()

    return (
        <QuestionLayout questionId={questionId} question={question} title='Правда або брехня?'>
            <div className={classes.answer_container}>
                <input className={classes.checkbox} type='checkbox' checked={question.answer} onChange={(e) => dispatch(handleTrueOrFalseAnswerChange({ questionId: questionId, isRight: e.target.checked }))} />
                <div className={classes.checkbox_answer + " " + classes.answer_text}>
                    <StyledText>Правда</StyledText>
                </div>
            </div>
            <div className={classes.answer_container}>
                <input className={classes.checkbox} type='checkbox' checked={!question.answer} onChange={(e) => dispatch(handleTrueOrFalseAnswerChange({ questionId: questionId, isRight: !e.target.checked }))} />
                <div className={classes.checkbox_answer + " " + classes.answer_text}>
                    <StyledText>Брехня</StyledText>
                </div>
            </div>
        </QuestionLayout>
    )
}

export default TrueOrFalseQuestion