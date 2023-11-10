import StyledTextArea from '@/components/ui/StyledTextArea'
import { useAppDispatch } from '@/hooks/reduxTypedHooks'
import { useValidation } from '@/hooks/useValidation'
import { handleConnectOptionsAnswerChange } from '@/store/testSlice'
import { StyledMessageComponentTypes } from '@/ts/styledCoponents'
import { IConnectOptionsAnswer } from '@/ts/test'
import React, { useEffect } from 'react'
import classes from "../../../../styles/test.module.css"
import StyledText from '@/components/ui/StyledText'
import StyledMessage from '@/components/ui/StyledMessage'

interface ConnectOptionsAnswerProps {
    answer: IConnectOptionsAnswer,
}

const ConnectOptionsAnswer: React.FC<ConnectOptionsAnswerProps> = ({ answer }) => {

    return (
        <div className={classes.connect_options_answer}>
            <StyledText>{answer.answerText}</StyledText>
        </div>
    )
}

export default ConnectOptionsAnswer