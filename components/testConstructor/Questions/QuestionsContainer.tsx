import { IQuestion } from '@/ts/test'
import React from 'react'
import QuestionTypeDeterminator from './QuestionTypeDeterminator'

const QuestionsContainer: React.FC<{ questions: Array<IQuestion> }> = ({ questions }) => {

    return (
        <>
            {questions.map((question, questionId) => <QuestionTypeDeterminator key={question._id} question={question} questionId={questionId} />)}
        </>
    )
}

export default QuestionsContainer