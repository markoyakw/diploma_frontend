import { IsingleMultipleChoiceAnswer } from '@/ts/test'
import React from 'react'
import classes from "../../../../styles/test.module.css"
import { useAppDispatch } from '@/hooks/reduxTypedHooks'
import StyledText from '@/components/ui/StyledText'
import { onSingleMultipleChoiceAnswerCheckboxToggle } from '@/store/getTestedSlice'

const SingleMultipleChoiceAnswer: React.FC<{ answer: IsingleMultipleChoiceAnswer, questionId: number, answerId: number, answersLength: number }> = ({ answer, questionId, answerId, answersLength }) => {

    const dispatch = useAppDispatch()

    return (
        <div className={classes.answer_container}>
            <input className={classes.checkbox} type='checkbox' checked={answer.isRight} onChange={() => dispatch(onSingleMultipleChoiceAnswerCheckboxToggle({ questionId, answerId }))} />
            <div className={classes.checkbox_answer}>
                <div className={classes.get_tested_text_field}>
                    <StyledText>{answer.answerText}</StyledText>
                </div>
            </div>
        </div>
    )
}

export default SingleMultipleChoiceAnswer