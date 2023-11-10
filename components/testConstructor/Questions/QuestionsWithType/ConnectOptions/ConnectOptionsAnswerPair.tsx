import { IConnectOptionsAnswerPair } from '@/ts/test'
import React from 'react'
import classes from "../../../../../styles/test.module.css"
import ConnectOptionsAnswer from './ConnectOptionsAnswer'
import DeleteButton from '@/components/ui/DeleteButton'
import { useAppDispatch } from '@/hooks/reduxTypedHooks'
import { deleteConnectOptionsAnswerPair } from '@/store/testSlice'

const ConnectOptionsAnswerPair: React.FC<{ answerPair: IConnectOptionsAnswerPair, questionId: number, answerPairId: number, answersLength: number, _questionId: number }>
    = ({ answerPair, questionId, answerPairId, answersLength, _questionId }) => {

        const dispatch = useAppDispatch()

        return (
            <div className={classes.answer_container}>
                <DeleteButton onClick={() => dispatch(deleteConnectOptionsAnswerPair({ answerPairId, questionId }))} disabled={answersLength <= 2} />
                <div className={classes.checkbox_answer}>
                    <ConnectOptionsAnswer answer={answerPair[0]} questionId={questionId} answerPairId={answerPairId} answerId={0} _questionId={_questionId} />
                    <ConnectOptionsAnswer answer={answerPair[1]} questionId={questionId} answerPairId={answerPairId} answerId={1} _questionId={_questionId} />
                </div>
            </div>
        )
    }

export default ConnectOptionsAnswerPair