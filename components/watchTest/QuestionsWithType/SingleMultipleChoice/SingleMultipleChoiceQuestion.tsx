import { IQuestionGrade, IsingleMultipleChoiceQuestion } from '@/ts/test'
import React from 'react'
import StyledText from '@/components/ui/StyledText'
import SingleMultipleChoiceAnswer from './SingleMultipleChoiceAnswer'

interface AnswerContainerProps {
    question: IsingleMultipleChoiceQuestion,
    questionGrade: IQuestionGrade | undefined,
    questionId: number,
}

const SingleMultipleChoiceQuestion: React.FC<AnswerContainerProps> = ({ question, questionId, questionGrade }) => {
    return (
        <>
            <StyledText size='big'>{questionId + 1}) {question.question}</StyledText>
            <StyledText>Оберіть одну або декілька вірних відповідей:</StyledText>
            {
                question.answers.map((answer, answerId) =>
                    <SingleMultipleChoiceAnswer answerIsRight={questionGrade && questionGrade.answerIsRightArr && questionGrade.answerIsRightArr[answerId]}
                        answer={answer} key={answer._id} />
                )
            }
        </ >
    )
}

export default SingleMultipleChoiceQuestion