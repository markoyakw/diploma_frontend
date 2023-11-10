import { IQuestion, IQuestionGrade, QuestionTypes } from '@/ts/test'
import React from 'react'
import SingleMultipleChoiceQuestion from './QuestionsWithType/SingleMultipleChoice/SingleMultipleChoiceQuestion'
import classes from "../../styles/test.module.css"
import TextInputQuestion from './QuestionsWithType/TextInput/TextInputQuestion'
import EssayQuestion from './QuestionsWithType/Essay/EssayQuestion'
import TrueOrFalseQuestion from './QuestionsWithType/TrueOrFalse/TrueOrFalseQuestion'
import FillTheGapsQuestion from './QuestionsWithType/FillTheGaps/FillTheGapsQuestion'
import ConnectOptionsQuestion from './QuestionsWithType/ConnectOptions/ConnectOptionsQuestion'

interface WatchQuestionProps {
    question: IQuestion,
    questionId: number,
    questionGrade: IQuestionGrade | undefined,
}

const WatchQuestion: React.FC<WatchQuestionProps> = ({ question, questionId, questionGrade }) => {

    const getIsRightClasses = () => {
        if (!questionGrade) return
        if (questionGrade.questionIsRight === true) return classes["correct_question"]
        if (questionGrade.questionIsRight === false) return classes["wrong_question"]
    }

    const getCorrectTypeAnswerContainer = () => {
        let correctComponent
        switch (question.type) {
            case QuestionTypes.singleMultipleChoice:
                correctComponent = <SingleMultipleChoiceQuestion questionGrade={questionGrade} questionId={questionId} question={question} />
                break
            case QuestionTypes.textInput:
                correctComponent = <TextInputQuestion questionId={questionId} question={question} questionGrade={questionGrade} />
                break
            case QuestionTypes.essay:
                correctComponent = <EssayQuestion questionId={questionId} question={question} />
                break
            case QuestionTypes.trueOrFalse:
                correctComponent = <TrueOrFalseQuestion questionId={questionId} question={question} questionGrade={questionGrade} />
                break
            case QuestionTypes.fillTheGaps:
                correctComponent = <FillTheGapsQuestion questionId={questionId} question={question} questionGrade={questionGrade} />
                break
            case QuestionTypes.connectOptions:
                correctComponent = <ConnectOptionsQuestion questionId={questionId} question={question} questionGrade={questionGrade} />
                break
            default: correctComponent = <></>
                break
        }
        return correctComponent
    }

    return (
        <div className={classes.block + " " + getIsRightClasses()}>
            {getCorrectTypeAnswerContainer()}
        </div>
    )
}

export default WatchQuestion