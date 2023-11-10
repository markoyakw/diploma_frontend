import { deleteQuestion, handleQuestionTextChange } from '@/store/testSlice'
import { IQuestion } from '@/ts/test'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import classes from "../../../styles/test.module.css"
import { useValidation } from '@/hooks/useValidation'
import { StyledMessageComponentTypes } from '@/ts/styledCoponents'
import StyledText from '@/components/ui/StyledText'
import StyledTextArea from '@/components/ui/StyledTextArea'
import DeleteButton from '@/components/ui/DeleteButton'
import { useAppSelector } from '@/hooks/reduxTypedHooks'

interface QuestionLayoutProps {
    question: IQuestion
    children?: React.ReactNode,
    title: string,
    questionId: number,
}

const QuestionLayout: React.FC<QuestionLayoutProps>
    = ({ question, children, title, questionId }) => {

        const questionsLength = useAppSelector(state => state.test.questions.length)
        const { addRules, validateField, unsubscribeRule, validationErrors } = useValidation()
        const dispatch = useDispatch()
        const fieldName = `question_${question._id}`

        const onQuestionChange = (questionText: string) => {
            if (question) {
                validateField(fieldName, questionText)
                dispatch(handleQuestionTextChange({ changingQuestionId: questionId, question: questionText }))
            }
        }

        useEffect(() => {
            if ("question" in question) {
                addRules(fieldName, question.question, [
                    { type: "maxLength", value: 300, message: "Максимальна довжина поля - 300 символів" },
                    { type: "minLength", value: 3, message: "Мінімальна довжина поля - 3 символи" },
                    { type: "required", value: true, message: "Заповніть поле" },
                ])
            }
            return () => unsubscribeRule(fieldName)
        }, [])

        return (
            <div className={`${classes.question_block} ${classes.block}`}>
                <div className={classes.title_row}>
                    <div className={classes.title_block}>
                        <StyledText size={"big"}>{questionId + 1}) {title}</StyledText>
                    </div>
                    <DeleteButton onClick={() => dispatch(deleteQuestion(questionId))} disabled={questionsLength === 1} />
                </div>
                {"question" in question
                    ? <StyledTextArea id={`question_${question._id}`} value={question.question} label="Питання"
                        messageText={validationErrors[fieldName]} messageType={StyledMessageComponentTypes.error}
                        onChange={e => onQuestionChange(e.target.value)} />
                    : <></>
                }
                {children}
            </div>
        )
    }

export default QuestionLayout