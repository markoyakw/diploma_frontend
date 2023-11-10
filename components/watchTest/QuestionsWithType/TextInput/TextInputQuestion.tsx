import { IQuestionGrade, ITextInputQuestion } from '@/ts/test'
import React from 'react'
import classes from "../../../../styles/test.module.css"
import StyledText from '@/components/ui/StyledText'

interface AnswerContainerProps {
    question: ITextInputQuestion,
    questionId: number,
    questionGrade: IQuestionGrade | undefined
}

const TextInputQuestion: React.FC<AnswerContainerProps> = ({ question, questionId, questionGrade }) => {

    return (
        <>
            <StyledText size='big'>{questionId}) {question.question}</StyledText>
            <StyledText size='big'>
                <span className={questionGrade?.questionIsRight ? classes.right_answer_textinput : classes.wrong_answer_textinput}>{question.answer}</span>
            </StyledText>
            <StyledText>Вірні варіанти:</StyledText>
            {question.answers.map(answer => <StyledText key={answer._id}>• {answer.answerText}</StyledText>)}
        </>
    )
}

export default TextInputQuestion