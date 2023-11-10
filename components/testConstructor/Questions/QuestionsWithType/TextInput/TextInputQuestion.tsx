import StyledButton from '@/components/ui/StyledButton'
import { useAppDispatch } from '@/hooks/reduxTypedHooks'
import { addTextInputAnswer } from '@/store/testSlice'
import { ITextInputQuestion } from '@/ts/test'
import React from 'react'
import classes from "../../../../../styles/test.module.css"
import QuestionLayout from '../../QuestionLayout'
import TextInputAnswer from './TextInputAnswer'

interface AnswerContainerProps {
    question: ITextInputQuestion,
    questionId: number
}

const TextInputQuestion: React.FC<AnswerContainerProps> = ({ question, questionId }) => {

    const dispatch = useAppDispatch()

    return (
        <QuestionLayout questionId={questionId} question={question} title="Введіть коротку відповідь:">
            {question.answers.map((answer, answerId) =>
                <TextInputAnswer answer={answer} questionId={questionId} answerId={answerId} answersLength={question.answers.length} key={answer._id} _questionId={question._id} />
            )}
            <div className={classes.new_answer_button_container}>
                <StyledButton onClick={() => dispatch(addTextInputAnswer({ questionId: questionId }))}>
                    Новий варіант вірної відповіді
                </StyledButton>
            </div>
        </QuestionLayout>
    )
}

export default TextInputQuestion