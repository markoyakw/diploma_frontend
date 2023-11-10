import StyledButton from '@/components/ui/StyledButton'
import { useAppDispatch } from '@/hooks/reduxTypedHooks'
import { addQuestion } from '@/store/testSlice'
import { QuestionTypes } from '@/ts/test'
import React from 'react'
import StyledDropDown from '@/components/ui/StyledDropDown'

const NewQuestionTypeChooseMenu = () => {

  const dispatch = useAppDispatch()

  return (
    <StyledDropDown big buttonText={"Додати запитання"}>
      <StyledButton onClick={() => dispatch(addQuestion({ type: QuestionTypes.singleMultipleChoice }))} symbol='plus'>
        Питання з вибором вірного варіанту
      </StyledButton>
      <StyledButton onClick={() => dispatch(addQuestion({ type: QuestionTypes.connectOptions }))} symbol='plus'>
        Питання на відповідність
      </StyledButton>
      <StyledButton onClick={() => dispatch(addQuestion({ type: QuestionTypes.textInput }))} symbol='plus'>
        Коротка текстова відповідь
      </StyledButton>
      <StyledButton onClick={() => dispatch(addQuestion({ type: QuestionTypes.fillTheGaps }))} symbol='plus'>
        Заповніть пропуски
      </StyledButton>
      <StyledButton onClick={() => dispatch(addQuestion({ type: QuestionTypes.trueOrFalse }))} symbol='plus'>
        Правда або брехня
      </StyledButton>
      <StyledButton onClick={() => dispatch(addQuestion({ type: QuestionTypes.essay }))} symbol='plus'>
        Есе
      </StyledButton>
    </StyledDropDown >
  )

}

export default NewQuestionTypeChooseMenu