import StyledTextArea from '@/components/ui/StyledTextArea'
import { useAppDispatch } from '@/hooks/reduxTypedHooks'
import { useValidation } from '@/hooks/useValidation'
import { handleConnectOptionsAnswerChange } from '@/store/testSlice'
import { StyledMessageComponentTypes } from '@/ts/styledCoponents'
import { IConnectOptionsAnswer } from '@/ts/test'
import React, { useEffect } from 'react'
import classes from "../../../../../styles/test.module.css"

interface ConnectOptionsAnswerProps {
    answer: IConnectOptionsAnswer,
    questionId: number,
    answerPairId: number,
    answerId: number,
    _questionId: number
}

const ConnectOptionsAnswer: React.FC<ConnectOptionsAnswerProps> = ({ answer, questionId, answerPairId, answerId, _questionId }) => {

    const { addRules, validateField, validateAllFields, validationErrors, unsubscribeRule } = useValidation()
    const dispatch = useAppDispatch()

    const fieldName = `connect_question_${_questionId}_answer_${answerPairId}_${answer._id}`

    useEffect(() => {
        addRules(fieldName, answer.answerText, [
            { type: "maxLength", value: 200, message: "Максимальна довжина поля - 200 символів" },
            { type: "minLength", value: 3, message: "Мінімальна довжина поля - 3 символи" },
            { type: "required", value: true, message: "Заповніть поле" },
        ])
        return () => unsubscribeRule(fieldName)
    }, [])

    const onAnswerChange = (answerText: string) => {
        validateField(fieldName, answerText)
        dispatch(handleConnectOptionsAnswerChange({ questionId, answerText, answerPairId, answerId }))
    }


    return (
        <div className={classes.connect_options_answer}>
            <StyledTextArea label={`Поле відповідності ${answerId + 1}`} id={`question_${questionId}_answer_${answer._id}`} messageText={validationErrors[fieldName]} messageType={StyledMessageComponentTypes.error}
                value={answer.answerText} onChange={e => onAnswerChange(e.target.value)} />
        </div>
    )
}

export default ConnectOptionsAnswer