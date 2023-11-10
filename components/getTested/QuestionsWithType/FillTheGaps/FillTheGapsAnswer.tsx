import { useValidation } from '@/hooks/useValidation'
import { useAppDispatch } from '@/hooks/reduxTypedHooks'
import { deleteFillTheGapsAnswer, handleFillTheGapsAnswerChange } from '@/store/testSlice'
import { FillTheGapsAnswerTypes, IFillTheGapsFillAnswer, IFillTheGapsTextAnswer } from '@/ts/test'
import React, { useEffect } from 'react'
import { StyledMessageComponentTypes } from '@/ts/styledCoponents'
import DeleteButton from '@/components/ui/DeleteButton'
import classes from "../../../../styles/test.module.css"
import StyledTextArea from '@/components/ui/StyledTextArea'
import StyledText from '@/components/ui/StyledText'
import { onFillTheGapsAnswerChange } from '@/store/getTestedSlice'

interface FillTheGapsAnswerProps {
    answer: IFillTheGapsFillAnswer | IFillTheGapsTextAnswer,
    answerId: number,
    questionId: number,
    answersLength: number
}

const FillTheGapsAnswer: React.FC<FillTheGapsAnswerProps> = ({ answer, questionId, answerId, answersLength }) => {

    const dispatch = useAppDispatch()

    const { addRules, validateField, validateAllFields, unsubscribeRule, validationErrors } = useValidation()
    const fieldName = `fill_question_${questionId}_answer_${answer._id}`

    useEffect(() => {
        if (answer.type === FillTheGapsAnswerTypes.fill) {
            addRules(fieldName, answer.answerText, [
                { type: "maxLength", value: 100, message: "Максимальна довжина поля - 100 символів" },
                { type: "required", value: true, message: "Заповніть поле" },
            ])
        }
        return () => unsubscribeRule(fieldName)
    }, [])

    const onAnswerChange = (answerText: string) => {
        validateField(fieldName, answerText)
        dispatch(onFillTheGapsAnswerChange({ questionId: questionId, answerId, answerText }))
    }

    return (
        <div className={classes.answer_container}>
            <div className={classes.checkbox_answer}>
                {answer.type === "fill"
                    ? < StyledTextArea value={answer.answerText} id={"fillTheGapsAnswer" + answerId}
                        messageText={validationErrors[fieldName]}
                        messageType={StyledMessageComponentTypes.error}
                        onChange={e => onAnswerChange(e.target.value)}
                        label={answerId + 1 + ". " + "Заповніть пропуск"}
                    />
                    : <div className={classes.get_tested_text_field}>
                        <StyledText>{answerId + ". " + answer.answerText}</StyledText>
                    </div>

                }
            </div>
        </div>
    )
}

export default FillTheGapsAnswer