import React from 'react'
import StyledText from '../ui/StyledText'

const GreetingMessage = () => {
    return (
        <>
            <StyledText size='big' bold>З поверненням! 😊</StyledText>
            <StyledText size='medium'>Авторизуйтесь або створіть акаунт для користування додатком</StyledText>
        </>
    )
}

export default GreetingMessage