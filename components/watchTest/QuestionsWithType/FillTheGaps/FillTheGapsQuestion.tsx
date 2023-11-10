import {IFillTheGapsQuestion, IQuestionGrade } from '@/ts/test'
import React from 'react'
import FillTheGapsResult from './FillTheGapsResult'
import StyledText from '@/components/ui/StyledText'

interface AnswerContainerProps {
    question: IFillTheGapsQuestion,
    questionId: number,
    questionGrade: IQuestionGrade| undefined
}

const FillTheGapsQuestion: React.FC<AnswerContainerProps> = ({ question, questionId, questionGrade }) => {

    return (
        <div>
            <StyledText size='big'>{questionId}) Заповніть пропуски:</StyledText>
            <FillTheGapsResult question={question} questionGrade={questionGrade}/>
        </div>
    )
}

export default FillTheGapsQuestion