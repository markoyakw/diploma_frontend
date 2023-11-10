import { IConnectOptionsAnswer, IConnectOptionsAnswerPair } from '@/ts/test'
import React, { useEffect } from 'react'
import classes from "../../../../styles/test.module.css"
import ConnectOptionsAnswer from './ConnectOptionsAnswer'
import DeleteButton from '@/components/ui/DeleteButton'
import { useAppDispatch } from '@/hooks/reduxTypedHooks'
import StyledDropDown from '@/components/ui/StyledDropDown'
import StyledButton from '@/components/ui/StyledButton'
import { onAnswerPairChoice, deleteConnectOptionsChoice } from '@/store/getTestedSlice'
import { useValidation } from '@/hooks/useValidation'
import StyledMessage from '@/components/ui/StyledMessage'
import { StyledMessageComponentTypes } from '@/ts/styledCoponents'

const ConnectOptionsAnswerPair: React.FC<{
    answerPair: IConnectOptionsAnswerPair,
    questionId: number,
    answerPairId: number,
    chosenAnswers: { [key: number]: IConnectOptionsAnswer },
    avaliableForChoosingAnswers: IConnectOptionsAnswer[]
}> = ({ answerPair, questionId, answerPairId, chosenAnswers, avaliableForChoosingAnswers }) => {

    const dispatch = useAppDispatch()

    const onConnectOptionChoice = (newAnswerPairId: number) => {
        dispatch(onAnswerPairChoice({ questionId, targetAnswerPairId: answerPairId, newAnswerPairId }))
    }

    const onDeleteConnectOptionsChoice = () => {
        dispatch(deleteConnectOptionsChoice({ questionId, targetAnswerPairId: answerPairId }))
    }

    const fieldName = "connectOptionsAnswer" + answerPair[1]._id
    const { addRules, unsubscribeRule, validationErrors } = useValidation()

    useEffect(() => {

        addRules(fieldName, chosenAnswers[answerPairId], [
            { type: "required", value: true, message: "Оберіть відповідь" },
        ])
        return () => unsubscribeRule(fieldName)
    }, [chosenAnswers])

    return (
        <div className={classes.answer_container}>
            <div className={classes.checkbox_answer}>

                <div className={classes.get_tested_text_field}>
                    <ConnectOptionsAnswer answer={answerPair[0]} />
                </div>

                <StyledDropDown buttonText={chosenAnswers[answerPairId]?.answerText ? chosenAnswers[answerPairId].answerText : "Оберіть вірну відповідність"}>
                    {avaliableForChoosingAnswers.map((answer, answerId) => {
                        return (
                            <StyledButton onClick={() => onConnectOptionChoice(answerId)} key={answer._id}>
                                {answer.answerText}
                            </StyledButton>)
                    })}
                    {chosenAnswers[answerPairId]
                        ? <><StyledButton color='orange' onClick={() => onDeleteConnectOptionsChoice()}>Очистити відповідь</StyledButton></>
                        : <></>}
                </StyledDropDown>
                {validationErrors[fieldName] && (
                    <StyledMessage text={validationErrors[fieldName] as string} type={StyledMessageComponentTypes.error} />
                )}
            </div>
        </div >
    )
}

export default ConnectOptionsAnswerPair