import React from 'react'
import StyledLink from '../ui/StyledLink'
import classes from "../../styles/auth.module.css"
import StyledText from '../ui/StyledText'

type ExistingAcoountMessageProps = {
  toggleShowLoginOrRegistration(): void,
  showLoginForm: boolean,
}

const ExistingAcoountMessage: React.FC<ExistingAcoountMessageProps> = ({ toggleShowLoginOrRegistration, showLoginForm }) => {

  if (showLoginForm) return (
    <div className={classes.existing_account_block}>
      <StyledText inline>Немає аккаунту? </StyledText>
      <StyledLink size="medium" onClick={toggleShowLoginOrRegistration}>
       зареєструватися
      </StyledLink>
    </div>

  )
  return (
    <div className={classes.existing_account_block}>
      <StyledText inline>Є аккаунт? </StyledText>
      <StyledLink size="medium" onClick={toggleShowLoginOrRegistration}>
         увійти
      </StyledLink>
    </div>
  )
}

export default ExistingAcoountMessage