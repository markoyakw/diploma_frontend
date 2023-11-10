import { IsingleMultipleChoiceAnswer } from '@/ts/test'
import React from 'react'
import classes from "../../../../styles/test.module.css"
import StyledText from '@/components/ui/StyledText'

const SingleMultipleChoiceAnswer: React.FC<{
    answer: IsingleMultipleChoiceAnswer,
    answerIsRight: boolean | undefined
}> = ({ answer, answerIsRight }) => {

    const getIsRightClasses = () => {
        if (answerIsRight === true) return classes["right_answer"]
        else if (answerIsRight === false) return classes["wrong_answer"]
        else return
    }

    return (
        <div className={classes.answer_container + " " + getIsRightClasses()}>
            <input className={classes.checkbox} type='checkbox' checked={answer.isRight} readOnly />
            <div className={classes.checkbox_answer}>
                <div className={classes.get_tested_text_field}>
                    <StyledText>{answer.answerText}</StyledText>
                </div>
            </div>
        </div>
    )
}

export default SingleMultipleChoiceAnswer