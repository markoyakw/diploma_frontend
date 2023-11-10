import { IQuestion, IsingleMultipleChoiceAnswer } from '@/ts/test'
import React, { useEffect } from 'react'
import classes from "../../../../../styles/test.module.css"
import { useValidation } from '@/hooks/useValidation'
import { useAppDispatch } from '@/hooks/reduxTypedHooks'
import { deleteSingleMultipleQuestion, handleCheckboxAnswerToggle, handleSingleMultipleChoiceAnswerTextChange } from '@/store/testSlice'
import { StyledMessageComponentTypes } from '@/ts/styledCoponents'
import StyledTextArea from '@/components/ui/StyledTextArea'
import DeleteButton from '@/components/ui/DeleteButton'

const SingleMultipleChoiceAnswer: React.FC<{ answer: IsingleMultipleChoiceAnswer, questionId: number, answerId: number, answersLength: number, _questionId: number }> = ({ answer, _questionId, questionId, answerId, answersLength }) => {

    const { addRules, validateField, validateAllFields, unsubscribeRule, validationErrors } = useValidation()
    const dispatch = useAppDispatch()
    const fieldName = `single_multiple_question_${_questionId}_answer_${answer._id}`

    const onAnswerChange = (answerText: string) => {
        validateField(fieldName, answerText)
        dispatch(handleSingleMultipleChoiceAnswerTextChange({ questionId, answerText, answerId }))
    }

    useEffect(() => {
        addRules(fieldName, answer.answerText, [
            { type: "maxLength", value: 300, message: "Максимальна довжина поля - 30 символів" },
            { type: "minLength", value: 3, message: "Мінімальна довжина поля - 3 символи" },
            { type: "required", value: true, message: "Заповніть поле" },
        ])
        return () => unsubscribeRule(fieldName)
    }, [])

    return (
        <div className={classes.answer_container}>
            <input className={classes.checkbox} type='checkbox' checked={answer.isRight} onChange={() => dispatch(handleCheckboxAnswerToggle({ questionId, answerId: answerId }))} />
            <div className={classes.checkbox_answer}>
                <StyledTextArea label='Варіант відповіді' id={`question_${questionId}_answer_${answer._id}`} messageText={validationErrors[fieldName]} messageType={StyledMessageComponentTypes.error}
                    value={answer.answerText} onChange={e => onAnswerChange(e.target.value)} />
            </div>
            <DeleteButton onClick={() => dispatch(deleteSingleMultipleQuestion({ questionId, answerId }))} disabled={answersLength <= 2} additionalClass={classes.delete_answer_button} />
        </div>
    )
}

export default SingleMultipleChoiceAnswer