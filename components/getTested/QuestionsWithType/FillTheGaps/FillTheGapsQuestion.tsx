import { useAppDispatch } from '@/hooks/reduxTypedHooks'
import { FillTheGapsAnswerTypes, IFillTheGapsQuestion } from '@/ts/test'
import React from 'react'
import StyledButton from '@/components/ui/StyledButton'
import { addFillTheGapsAnswer } from '@/store/testSlice'
import FillTheGapsAnswer from './FillTheGapsAnswer'
import FillTheGapsResult from './FillTheGapsResult'
import StyledText from '@/components/ui/StyledText'

interface AnswerContainerProps {
    question: IFillTheGapsQuestion,
    questionId: number
}

const FillTheGapsQuestion: React.FC<AnswerContainerProps> = ({ question, questionId }) => {

    const dispatch = useAppDispatch()

    return (
        <div>
            <StyledText size='big'>Заповніть пропуски:</StyledText>
            <FillTheGapsResult question={question} />

            {question.answers.map((answer, answerId) => <FillTheGapsAnswer answersLength={question.answers.length} answer={answer} answerId={answerId} questionId={questionId} key={answer._id} />)}

        </div>
    )
}

export default FillTheGapsQuestion