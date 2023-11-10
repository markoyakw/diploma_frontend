import { useAppDispatch } from '@/hooks/reduxTypedHooks'
import { FillTheGapsAnswerTypes, IFillTheGapsQuestion } from '@/ts/test'
import React from 'react'
import QuestionLayout from '../../QuestionLayout'
import StyledButton from '@/components/ui/StyledButton'
import { addFillTheGapsAnswer } from '@/store/testSlice'
import FillTheGapsAnswer from './FillTheGapsAnswer'
import FillTheGapsResult from './FillTheGapsResult'
import classes from "../../../../../styles/test.module.css"

interface AnswerContainerProps {
    question: IFillTheGapsQuestion,
    questionId: number
}

const FillTheGapsQuestion: React.FC<AnswerContainerProps> = ({ question, questionId }) => {

    const dispatch = useAppDispatch()
    const isThereOnlyOneOfTypeAnswer = () => {
        const fillArray = question.answers.filter(answer => answer.type === "fill");
        const textArray = question.answers.filter(answer => answer.type === "text");
        return {
            fill: fillArray.length === 1,
            text: textArray.length === 1
        };
    }

    return (
        <QuestionLayout questionId={questionId} title={"Заповніть пропуски:"} question={question}>
            <br />
            <FillTheGapsResult question={question} />

            {question.answers.map((answer, answerId) =>
                <FillTheGapsAnswer answer={answer} answerId={answerId}
                    questionId={questionId} key={answer._id} _questionId={question._id} isThereOnlyOneOfTypeAnswer={isThereOnlyOneOfTypeAnswer()} />)}
            <br />

            <div className={classes.new_answer_button_container}>
                <div className={classes.horisontaly_divided_buttons_container}>
                    <StyledButton onClick={() => dispatch(addFillTheGapsAnswer({ questionId, type: FillTheGapsAnswerTypes.text }))}>
                        Додати поле з текстом
                    </StyledButton>
                    <StyledButton onClick={() => dispatch(addFillTheGapsAnswer({ questionId, type: FillTheGapsAnswerTypes.fill }))}>
                        Додати поле з для заповнення
                    </StyledButton>
                </div>
            </div>
        </QuestionLayout>
    )
}

export default FillTheGapsQuestion