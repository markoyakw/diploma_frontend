import { IConnectOptionsAnswer, IConnectOptionsAnswerPair } from '@/ts/test'
import React from 'react'
import classes from "../../../../styles/test.module.css"
import ConnectOptionsAnswer from './ConnectOptionsAnswer'
import StyledDropDown from '@/components/ui/StyledDropDown'
import StyledButton from '@/components/ui/StyledButton'

const ConnectOptionsAnswerPair: React.FC<{
    answerPair: IConnectOptionsAnswerPair,
    questionId: number,
    answerPairId: number,
    chosenAnswers: { [key: number]: IConnectOptionsAnswer },
    avaliableForChoosingAnswers: IConnectOptionsAnswer[],
    isRight: boolean | undefined
}> = ({ answerPair, answerPairId, chosenAnswers, avaliableForChoosingAnswers, isRight }) => {

    const getAdditionalAnswerClass = () =>{
        if (isRight === true) return classes.right_answer
        if (isRight === false) return classes.wrong_answer
        else return
    }

    return (
        <div className={classes.answer_container + " " + getAdditionalAnswerClass()}>
            <div className={classes.checkbox_answer}>

                <div className={classes.get_tested_text_field}>
                    <ConnectOptionsAnswer answer={answerPair[0]} />
                </div>

                <StyledDropDown buttonText={chosenAnswers[answerPairId].answerText}>
                    {avaliableForChoosingAnswers.map((answer, answerId) => {
                        return (
                            <StyledButton key={answer._id}>
                                {answer.answerText}
                            </StyledButton>)
                    })}
                </StyledDropDown>
            </div>
        </div >
    )
}

export default ConnectOptionsAnswerPair