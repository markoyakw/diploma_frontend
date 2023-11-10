import StyledButton from '@/components/ui/StyledButton'
import { useAppDispatch } from '@/hooks/reduxTypedHooks'
import { addTextInputAnswer } from '@/store/testSlice'
import { ITextInputQuestion } from '@/ts/test'
import React, { useEffect } from 'react'
import classes from "../../../../styles/test.module.css"
import StyledText from '@/components/ui/StyledText'
import StyledInput from '@/components/ui/StyledInput'
import { onTextInputAnswerChange } from '@/store/getTestedSlice'
import { useValidation } from '@/hooks/useValidation'
import StyledTextArea from '@/components/ui/StyledTextArea'
import { StyledMessageComponentTypes } from '@/ts/styledCoponents'

interface AnswerContainerProps {
    question: ITextInputQuestion,
    questionId: number
}

const TextInputQuestion: React.FC<AnswerContainerProps> = ({ question, questionId }) => {

    const { addRules, validateField, validateAllFields, unsubscribeRule, validationErrors } = useValidation()
    const fieldName = "getTestedTextInputAnswer" + question._id

    useEffect(() => {
        addRules(fieldName, question.answer, [
            { type: "maxLength", value: 100, message: "Максимальна довжина поля - 100 символів" },
            { type: "required", value: true, message: "Заповніть поле" },
        ])
        return () => unsubscribeRule(fieldName)
    }, [])

    const dispatch = useAppDispatch()
    const handleTextInputAnswerChange = (value: string) => {
        validateField(fieldName, value)
        dispatch(onTextInputAnswerChange({
            answer: value,
            questionId
        }))
    }

    return (
        <div>
            <StyledText size='big'>{question.question}</StyledText>
            <StyledInput messageText={validationErrors[fieldName]} messageType={StyledMessageComponentTypes.error}
                value={question.answer} onChange={(e) => handleTextInputAnswerChange(e.target.value)}
                id={"getTestedTextInputAnswer" + questionId} label='Введіть коротку відповідь' />
        </div>
    )
}

export default TextInputQuestion