import StyledButton from '@/components/ui/StyledButton'
import { useAppDispatch } from '@/hooks/reduxTypedHooks'
import { addCheckboxAnswer } from '@/store/testSlice'
import { IsingleMultipleChoiceQuestion } from '@/ts/test'
import React from 'react'
import classes from "../../../../styles/test.module.css"
import StyledText from '@/components/ui/StyledText'
import SingleMultipleChoiceAnswer from './SingleMultipleChoiceAnswer'

interface AnswerContainerProps {
    question: IsingleMultipleChoiceQuestion,
    questionId: number
}

const SingleMultipleChoiceQuestion: React.FC<AnswerContainerProps> = ({ question, questionId }) => {

    return (
        <div>
            <StyledText size='big'>{question.question}</StyledText>
            <StyledText>Оберіть одну або декілька вірних відповідей:</StyledText>
            {
                question.answers.map((answer, answerId) =>
                    <SingleMultipleChoiceAnswer answer={answer} questionId={questionId} answerId={answerId} key={answer._id} answersLength={question.answers.length} />
                )
            }
        </div >
    )
}

export default SingleMultipleChoiceQuestion