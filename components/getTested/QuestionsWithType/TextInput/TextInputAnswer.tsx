import { ITextInputAnswer } from '@/ts/test'
import React, { useEffect } from 'react'
import classes from "../../../../../styles/test.module.css"
import { useValidation } from '@/hooks/useValidation'
import { useAppDispatch } from '@/hooks/reduxTypedHooks'
import { deleteTextInputAnswer, handleTextInputAnswerTextChange } from '@/store/testSlice'
import { StyledMessageComponentTypes } from '@/ts/styledCoponents'
import StyledTextArea from '@/components/ui/StyledTextArea'
import DeleteButton from '@/components/ui/DeleteButton'

const TextInputAnswer: React.FC<{ answer: ITextInputAnswer, questionId: number, answerId: number, answersLength: number }> = ({ answer, questionId, answerId, answersLength }) => {

    const { addRules, validateField, validateAllFields, unsubscribeRule, validationErrors } = useValidation()
    const dispatch = useAppDispatch()
    const fieldName = `input_question_${questionId}_answer_${answer._id}`

    const onAnswerChange = (answerText: string) => {
        validateField(fieldName, answerText)
        dispatch(handleTextInputAnswerTextChange({ questionId, answerText, answerId: answerId }))
    }

    useEffect(() => {
        addRules(fieldName, answer.answerText, [
            { type: "maxLength", value: 30, message: "Максимальна довжина поля - 30 символів" },
            { type: "required", value: true, message: "Заповніть поле" },
        ])
        return () => unsubscribeRule(fieldName)
    }, [])

    return (
        <div className={classes.answer_container} key={answer._id}>
            <div className={classes.checkbox_answer}>
                <StyledTextArea label='варіант відповіді' id={`question_${questionId}_answer_${answer._id}`} messageText={validationErrors[fieldName]} messageType={StyledMessageComponentTypes.error}
                    value={answer.answerText} onChange={e => onAnswerChange(e.target.value)} />
            </div>
            <DeleteButton onClick={() => dispatch(deleteTextInputAnswer({ questionId, answerId }))} additionalClass={classes.delete_answer_button} disabled={answersLength === 1} />
        </div>
    )
}

export default TextInputAnswer