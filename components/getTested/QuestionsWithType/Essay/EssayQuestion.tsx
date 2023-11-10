import StyledInput from '@/components/ui/StyledInput'
import StyledText from '@/components/ui/StyledText'
import StyledTextArea from '@/components/ui/StyledTextArea'
import { useValidation } from '@/hooks/useValidation'
import { onEssayAnswerChange } from '@/store/getTestedSlice'
import { StyledMessageComponentTypes } from '@/ts/styledCoponents'
import { IEssayQuestion } from '@/ts/test'
import React, { useEffect, useState } from 'react'
import classes from "../../../../styles/test.module.css"
import { useAppDispatch } from '@/hooks/reduxTypedHooks'

interface AnswerContainerProps {
    question: IEssayQuestion,
    questionId: number
}

const EssayQuestion: React.FC<AnswerContainerProps> = ({ question, questionId }) => {

    const { addRules, validateField, validateAllFields, unsubscribeRule, validationErrors } = useValidation()
    const fieldName = "getTestedTextEssayQuestion" + question._id
    const dispatch = useAppDispatch()

    useEffect(() => {
        addRules(fieldName, question.answer, [
            { type: "maxLength", value: 3000, message: "Максимальна довжина поля - 3000 символів" },
            { type: "minLength", value: 30, message: "Мінімальна довжина поля - 30 символів" },
            { type: "required", value: true, message: "Заповніть поле" },
        ])
        return () => unsubscribeRule(fieldName)
    }, [])

    const handleEssayAnswerChange = (answerText: string) => {
        validateField(fieldName, answerText)
        dispatch(onEssayAnswerChange({ answerText, questionId }))
    }

    return (
        <div>
            <StyledText>Напишіть есе на тему:</StyledText>
            <StyledText size='big'>{question.question}</StyledText>
            <StyledTextArea value={question.answer}
                id={fieldName} onChange={(e) => handleEssayAnswerChange(e.target.value)} label="Введіть текст"
                messageText={validationErrors[fieldName]} messageType={StyledMessageComponentTypes.error} />
        </div>
    )
}

export default EssayQuestion