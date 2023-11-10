import { useValidation } from '@/hooks/useValidation'
import { useAppDispatch } from '@/hooks/reduxTypedHooks'
import { deleteFillTheGapsAnswer, handleFillTheGapsAnswerChange } from '@/store/testSlice'
import { FillTheGapsAnswerTypes, IFillTheGapsFillAnswer, IFillTheGapsTextAnswer } from '@/ts/test'
import React, { useEffect } from 'react'
import { StyledMessageComponentTypes } from '@/ts/styledCoponents'
import DeleteButton from '@/components/ui/DeleteButton'
import classes from "../../../../../styles/test.module.css"
import StyledTextArea from '@/components/ui/StyledTextArea'

interface FillTheGapsAnswerProps {
    answer: IFillTheGapsFillAnswer | IFillTheGapsTextAnswer,
    answerId: number,
    questionId: number,
    _questionId: number,
    isThereOnlyOneOfTypeAnswer: {
        text: boolean
        fill: boolean
    }
}

const FillTheGapsAnswer: React.FC<FillTheGapsAnswerProps> = ({ answer, questionId, answerId, _questionId, isThereOnlyOneOfTypeAnswer }) => {

    const dispatch = useAppDispatch()

    const { addRules, validateField, validateAllFields, unsubscribeRule, validationErrors } = useValidation()
    const fieldName = `fill_question_${_questionId}_answer_${answer._id}`

    useEffect(() => {
        if (answer.type === FillTheGapsAnswerTypes.text) {
            addRules(fieldName, answer.answerText, [
                { type: "maxLength", value: 1000, message: "Максимальна довжина поля - 1000 символів" },
                { type: "required", value: true, message: "Заповніть поле" },
            ])
        }
        else if (answer.type === FillTheGapsAnswerTypes.fill) {
            addRules(fieldName, answer.answerText, [
                { type: "maxLength", value: 100, message: "Максимальна довжина поля - 100 символів" },
                { type: "required", value: true, message: "Заповніть поле" },
            ])
        }
        return () => unsubscribeRule(fieldName)
    }, [])

    const onAnswerChange = (answerText: string) => {
        validateField(fieldName, answerText)
        dispatch(handleFillTheGapsAnswerChange({ questionId: questionId, answerId, answerText }))
    }

    const isDeleteButtonDisabled = () => {
        if (answer.type === "fill" && isThereOnlyOneOfTypeAnswer.fill) return true
        else if (answer.type === "text" && isThereOnlyOneOfTypeAnswer.text) return true
    }

    return (
        <div className={classes.answer_container}>
            <div className={classes.checkbox_answer}>
                < StyledTextArea value={answer.answerText} id={"fillTheGapsAnswer" + answerId}
                    messageText={validationErrors[fieldName]}
                    messageType={StyledMessageComponentTypes.error}
                    onChange={e => onAnswerChange(e.target.value)}
                    label={answer.type === FillTheGapsAnswerTypes.fill
                        ? answerId + 1 + ". " + "Поле для заповнення (введіть вірну відповідь)"
                        : answerId + 1 + ". " + "Поле з текстом"
                    }
                />
            </div>
            <DeleteButton disabled={isDeleteButtonDisabled()} onClick={() => dispatch(deleteFillTheGapsAnswer({ questionId, answerId }))} additionalClass={classes.delete_answer_button} />
        </div>
    )
}

export default FillTheGapsAnswer