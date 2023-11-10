import { IQuestion, QuestionTypes } from '@/ts/test'
import React from 'react'
import SingleMultipleChoiceQuestion from './QuestionsWithType/SingleMultipleChoice/SingleMultipleChoiceQuestion'
import TextInputQuestion from './QuestionsWithType/TextInput/TextInputQuestion'
import TrueOrFalseQuestion from './QuestionsWithType/TrueOrFalse/TrueOrFalseQuestion'
import EssayQuestion from './QuestionsWithType/Essay/EssayQuestion'
import FillTheGapsQuestion from './QuestionsWithType/FillTheGaps/FillTheGapsQuestion'
import ConnectOptionsQuestion from './QuestionsWithType/ConnectOptions/ConnectOptionsQuestion'

const QuestionTypeDeterminator: React.FC<{ question: IQuestion, questionId: number }> = ({ question, questionId }) => {

    const getCorrectTypeAnswerContainer = () => {
        let correctComponent
        switch (question.type) {
            case QuestionTypes.singleMultipleChoice:
                correctComponent = <SingleMultipleChoiceQuestion questionId={questionId} question={question} />
                break
            case QuestionTypes.textInput:
                correctComponent = <TextInputQuestion questionId={questionId} question={question} />
                break
            case QuestionTypes.essay:
                correctComponent = <EssayQuestion questionId={questionId} question={question} />
                break
            case QuestionTypes.trueOrFalse:
                correctComponent = <TrueOrFalseQuestion questionId={questionId} question={question} />
                break
            case QuestionTypes.fillTheGaps:
                correctComponent = <FillTheGapsQuestion questionId={questionId} question={question} />
                break
            case QuestionTypes.connectOptions:
                correctComponent = <ConnectOptionsQuestion questionId={questionId} question={question} />
                break
            default: correctComponent = <></>
                break
        }
        return correctComponent
    }

    return (
        <>
            {getCorrectTypeAnswerContainer()}
        </>
    )
}

export default QuestionTypeDeterminator