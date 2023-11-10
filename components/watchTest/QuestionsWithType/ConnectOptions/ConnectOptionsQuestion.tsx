import { IConnectOptionsQuestion, IQuestionGrade } from '@/ts/test'
import React from 'react'
import ConnectOptionsAnswerPair from './ConnectOptionsAnswerPair'
import StyledText from '@/components/ui/StyledText'

interface AnswerContainerProps {
    question: IConnectOptionsQuestion,
    questionId: number,
    questionGrade: IQuestionGrade | undefined
}

const ConnectOptionsQuestion: React.FC<AnswerContainerProps> = ({ question, questionId, questionGrade }) => {

    return (
        <div>
            <StyledText size='big'>Оберіть відповідність</StyledText>
            {question.answers.map((answerPair, answerPairId) =>
                <ConnectOptionsAnswerPair answerPair={answerPair} questionId={questionId}
                    answerPairId={answerPairId} key={answerPair[0]._id + answerPair[1]._id}
                    chosenAnswers={question.chosenAnswers} avaliableForChoosingAnswers={question.avaliableForChoosingAnswers}
                    isRight={questionGrade && questionGrade.answerIsRightArr && questionGrade.answerIsRightArr[answerPairId]}
                />
            )}
        </div>
    )
}

export default ConnectOptionsQuestion 