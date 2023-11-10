import { IEssayQuestion } from '@/ts/test'
import React from 'react'
import QuestionLayout from '../../QuestionLayout'

interface AnswerContainerProps {
    question: IEssayQuestion,
    questionId: number
}

const EssayQuestion: React.FC<AnswerContainerProps> = ({ question, questionId }) => {

    return (
        <div>
            <QuestionLayout question={question} title={"Напишіть есе на тему:"} questionId={questionId}>
                
            </QuestionLayout>
        </div>
    )
}

export default EssayQuestion