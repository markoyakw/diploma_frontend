import StyledButton from '@/components/ui/StyledButton'
import { useAppDispatch } from '@/hooks/reduxTypedHooks'
import { addConnectOptionsAnswer } from '@/store/testSlice'
import { IConnectOptionsQuestion } from '@/ts/test'
import React from 'react'
import QuestionLayout from '../../QuestionLayout'
import ConnectOptionsAnswerPair from './ConnectOptionsAnswerPair'
import StyledText from '@/components/ui/StyledText'
import classes from "../../../../../styles/test.module.css"

interface AnswerContainerProps {
    question: IConnectOptionsQuestion,
    questionId: number
}

const ConnectOptionsQuestion: React.FC<AnswerContainerProps> = ({ question, questionId }) => {

    const dispatch = useAppDispatch()

    return (
        <QuestionLayout questionId={questionId} title={"Оберіть відповідність:"} question={question}>
            <StyledText>Введіть вірні пари відповідностей, при тестуванні додаток змішає їх за вас 😊</StyledText>
            {question.answers.map((answerPair, answerPairId) =>
                <ConnectOptionsAnswerPair answerPair={answerPair} questionId={questionId} answerPairId={answerPairId}
                    answersLength={question.answers.length} key={answerPair[0]._id + answerPair[1]._id} _questionId={question._id} />
            )}
            <div className={classes.new_answer_button_container}>
                <StyledButton onClick={() => dispatch(addConnectOptionsAnswer({ questionId }))}>
                    Нова пара відповідей
                </StyledButton>
            </div>
        </QuestionLayout>
    )
}

export default ConnectOptionsQuestion 