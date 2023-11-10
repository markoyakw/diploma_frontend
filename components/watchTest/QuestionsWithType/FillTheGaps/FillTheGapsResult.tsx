import StyledText from '@/components/ui/StyledText'
import { FillTheGapsAnswerTypes, IFillTheGapsFillAnswer, IFillTheGapsQuestion, IFillTheGapsTextAnswer, IQuestionGrade } from '@/ts/test'
import React from 'react'
import classes from "../../../../styles/test.module.css"

interface FillTheGapsTextResultProps {
    question: IFillTheGapsQuestion
    questionGrade: IQuestionGrade | undefined
}

const FillTheGapsResult: React.FC<FillTheGapsTextResultProps> = ({ question, questionGrade }) => {

    const getFillAnswerAdditionalClass = (answerNumber: number) => {
        if (questionGrade && questionGrade.answerIsRightArr) {
            if (questionGrade?.answerIsRightArr[answerNumber] === true) return classes.right_answer
            else return classes.wrong_answer
        }
    }

    const separateFirstWord = (question: string) => {
        const words = question.split(' ');
        const firstWord = words.shift();
        const restOfText = words.join(' ');
        return { firstWord, restOfText }
    }

    const getNotBreakingLineAnswerAndNumber = (answer: IFillTheGapsFillAnswer | IFillTheGapsTextAnswer, answerNumber: number) => {
        const { firstWord, restOfText } = separateFirstWord(answer.answerText)
        if (answer.answerText.trim() === "") return
        if (answer.type === FillTheGapsAnswerTypes.text)
            return (
                <StyledText inline key={answer._id}>
                    <span className={classes.fill_the_gap_result_answer}>
                        <span className={classes.fill_the_gaps_answer_first_word}>
                            <span className={classes.fill_the_gaps_answer_number}>
                                {answerNumber + 1}.
                            </span>
                            {firstWord}
                        </span>
                        {restOfText ? <>&nbsp;</> : <></>}
                        {restOfText}
                    </span>
                </StyledText>
            )
        else return (
            <StyledText inline key={answer._id}>
                <span className={classes.fill_the_gap_result_answer}>
                    <span className={classes.fill_the_gaps_answer_first_word}>
                        <span className={classes.fill_the_gaps_answer_number}>
                            {answerNumber + 1}.
                        </span>
                        <span className={classes.fill_the_gaps_fill_answer_left + " " + getFillAnswerAdditionalClass(answerNumber)}>
                            {firstWord}
                        </span>
                    </span>
                    <span className={classes.fill_the_gaps_fill_answer_right + " " + getFillAnswerAdditionalClass(answerNumber)}>
                        {restOfText ? <>&nbsp;</> : <></>}
                        {restOfText}
                    </span>
                </span>
            </StyledText>
        )
    }

    return (
        <div className={classes.fill_the_gaps_result}>
            {question.answers.map((answer, answerNumber) => getNotBreakingLineAnswerAndNumber(answer, answerNumber))}
            <span>&nbsp;</span>
        </div>

    )
}

export default FillTheGapsResult