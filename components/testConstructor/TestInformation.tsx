import { useAppDispatch } from '@/hooks/reduxTypedHooks'
import { useValidation } from '@/hooks/useValidation'
import { generateQuestionsAction, handleDescriptionChange, handleNameChange, handleTheoreticalPartChange } from '@/store/testSlice'
import React, { useEffect } from 'react'
import classes from '../../styles/test.module.css'
import StyledInput from '../ui/StyledInput'
import StyledTextArea from '../ui/StyledTextArea'
import { StyledMessageComponentTypes } from '@/ts/styledCoponents'
import StyledButton from '../ui/StyledButton'

interface TestInformationProps {
    name: string,
    description: string | undefined,
    theoreticalPart: string | undefined,
    questionGenerationLoading: boolean
}

const TestInformation: React.FC<TestInformationProps> = ({ name, description, theoreticalPart, questionGenerationLoading }) => {

    const { addRules, validateField, validationErrors, unsubscribeRule } = useValidation()
    const dispatch = useAppDispatch()

    useEffect(() => {
        return () => {
            unsubscribeRule("name")
            unsubscribeRule("description")
            unsubscribeRule("theoreticalPart")
        }
    }, [])
    
    useEffect(() => {
        addRules("name", name, [
            { type: "maxLength", value: 100, message: "Максимальна довжина поля - 100 символів" },
            { type: "minLength", value: 3, message: "Мінімальна довжина поля - 3 символи" },
            { type: "required", value: true, message: "Заповніть поле" },
        ])
        addRules("description", description, [
            { type: "maxLength", value: 2000, message: "Максимальна довжина поля - 2000 символів" },
            { type: "minLength", value: 100, message: "Мінімальна довжина поля - 100 символів" },
        ])
        addRules("theoreticalPart", theoreticalPart, [
            { type: "maxLength", value: 10000, message: "Максимальна довжина поля - 10000 символів" },
            { type: "minLength", value: 500, message: "Мінімальна довжина поля - 500 символів" },
        ])
    }, [name, description, theoreticalPart])

    const generateQuestions = (theoreticalPart: string | undefined) => {
        if (theoreticalPart) {
            dispatch(generateQuestionsAction({ theoreticalPart }))
        }
    }
    const onNameChange = (name: string) => {
        dispatch(handleNameChange(name))
        validateField("name", name)
    }
    const onDescriptionChange = (description: string) => {
        dispatch(handleDescriptionChange(description))
        validateField("description", description)
    }
    const onTheoreticalPartChange = (theoreticalPart: string) => {
        dispatch(handleTheoreticalPartChange(theoreticalPart))
        validateField("theoreticalPart", theoreticalPart)
    }

    return (
        <>
            <div className={classes.block}>
                <StyledInput id="name" value={name} messageText={validationErrors.name} messageType={StyledMessageComponentTypes.error}
                    sizeClass={"big"} onChange={(e) => onNameChange(e.target.value)} label='Назва' />

                <StyledTextArea id="description" value={description}
                    messageText={validationErrors.description} messageType={StyledMessageComponentTypes.error}
                    onChange={(e) => onDescriptionChange(e.target.value)} label='Додаткова інформація' />
            </div>

            <div className={classes.block}>
                <StyledTextArea id="theoretical_part" value={theoreticalPart} messageText={validationErrors.theoreticalPart} messageType={StyledMessageComponentTypes.error}
                    onChange={(e) => onTheoreticalPartChange(e.target.value)} label='Теоретична частина' />
                {theoreticalPart
                    ?
                    <>
                        <br />
                        <StyledButton disabled={Boolean(validationErrors.theoreticalPart) || questionGenerationLoading}
                            onClick={() => generateQuestions(theoreticalPart)}>Згенерувати питання за даним текстом</StyledButton>
                    </>
                    :
                    <></>
                }
            </div>
        </>
    )
}

export default TestInformation