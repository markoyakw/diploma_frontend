import StyledButton from '@/components/ui/StyledButton'
import { useAppDispatch } from '@/hooks/reduxTypedHooks'
import { addCheckboxAnswer } from '@/store/testSlice'
import { IsingleMultipleChoiceQuestion } from '@/ts/test'
import React from 'react'
import SingleMultipleChoiceAnswer from './SingleMultipleChoiceAnswer'
import classes from "../../../../../styles/test.module.css"
import QuestionLayout from '../../QuestionLayout'

interface AnswerContainerProps {
    question: IsingleMultipleChoiceQuestion,
    questionId: number
}

const SingleMultipleChoiceQuestion: React.FC<AnswerContainerProps> = ({ question, questionId }) => {

    const dispatch = useAppDispatch()

    return (
        <QuestionLayout questionId={questionId} question={question} title={"Оберіть одну або декілька вірних відповідей:"} >
            {question.answers.map((answer, answerId) =>
                <SingleMultipleChoiceAnswer answer={answer} questionId={questionId} answerId={answerId} key={answer._id} answersLength={question.answers.length} _questionId={question._id} />
            )}
            <div className={classes.new_answer_button_container}>
                <StyledButton onClick={() => dispatch(addCheckboxAnswer({ questionId }))}>
                    Новий варіант відповіді
                </StyledButton>
            </div>
        </QuestionLayout>
    )
}

export default SingleMultipleChoiceQuestion