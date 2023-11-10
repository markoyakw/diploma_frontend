import StyledButton from '@/components/ui/StyledButton'
import { useAppDispatch } from '@/hooks/reduxTypedHooks'
import { addConnectOptionsAnswer } from '@/store/testSlice'
import { IConnectOptionsAnswer, IConnectOptionsQuestion } from '@/ts/test'
import React, { useEffect, useState } from 'react'
import ConnectOptionsAnswerPair from './ConnectOptionsAnswerPair'
import StyledText from '@/components/ui/StyledText'
import classes from "../../../../styles/test.module.css"
import ConnectOptionsAnswer from './ConnectOptionsAnswer'
import { onConnectOptionsInitialize } from '@/store/getTestedSlice'

interface AnswerContainerProps {
    question: IConnectOptionsQuestion,
    questionId: number
}

const ConnectOptionsQuestion: React.FC<AnswerContainerProps> = ({ question, questionId }) => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(onConnectOptionsInitialize({ questionId }))
    }, [])

    return (
        <div>
            <StyledText size='big'>Оберіть відповідність</StyledText>
            {question.answers.map((answerPair, answerPairId) =>
                <ConnectOptionsAnswerPair answerPair={answerPair} questionId={questionId}
                    answerPairId={answerPairId} key={answerPair[0]._id + answerPair[1]._id}
                    chosenAnswers={question.chosenAnswers} avaliableForChoosingAnswers={question.avaliableForChoosingAnswers}
                />
            )}
        </div>
    )
}

export default ConnectOptionsQuestion 