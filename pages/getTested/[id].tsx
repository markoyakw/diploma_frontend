import StyledText from '@/components/ui/StyledText';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxTypedHooks';
import { fetchGetTestedTest } from '@/store/getTestedSlice';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react'
import classes from "../../styles/test.module.css"
import GetTestedQuestionTypeDeterminator from '@/components/getTested/GetTestedQuestionTypeDeterminator';
import StyledButton from '@/components/ui/StyledButton';
import { postTestResultAction } from '@/store/getTestedSlice';
import StyledMessage from '@/components/ui/StyledMessage';
import { StyledMessageComponentTypes } from '@/ts/styledCoponents';
import StyledPopupMessage from '@/components/ui/StyledPopupMessage';
import { useValidation } from '@/hooks/useValidation';
import { IPostTestResultResponse } from '@/ts/response/GetTestedResponse';
import { PayloadAction } from '@reduxjs/toolkit';
import HighlightedText from '@/components/ui/HighlightedText';

const GetTested = () => {

    const test = useAppSelector(state => state.getTested)
    const router = useRouter();
    const { id } = router.query;
    const dispatch = useAppDispatch()
    const [showQuestions, setShowQuestions] = useState(true)
    const [showTheoreticalPart, setShowTheoreticalPart] = useState(true)
    const { validateAllFields, areAllFieldsValid, unsubscribeAllRules } = useValidation()

    const [highlightedResult, setHighlightedResult] = useState<ReactElement | null>(null);

    const handleSubmit = async () => {
        if (validateAllFields()) {
            const response = await dispatch(postTestResultAction({ testResult: test })) as PayloadAction<IPostTestResultResponse>;
            if (response.payload.message && (!test.theoreticalPart || !response.payload.highlightedWrongPartsArr)) {
                router.push("/");
            } else if (test.theoreticalPart && response.payload.highlightedWrongPartsArr) {
                setHighlightedResult(<HighlightedText text={test.theoreticalPart} stringsToHighlight={response.payload.highlightedWrongPartsArr.highlightedWrongPartsArr} />);
                setShowQuestions(false)
                setShowTheoreticalPart(false)
            }
        }
    };

    useEffect(() => {
        if (typeof id === "string") {
            dispatch(fetchGetTestedTest({ id }))
        }
        return () => unsubscribeAllRules()
    }, [])

    useEffect(() => {
        if (test.theoreticalPart) {
            setShowTheoreticalPart(true)
            setShowQuestions(false)
        }
        else {
            setShowTheoreticalPart(false)
            setShowQuestions(true)
        }
    }, [test.theoreticalPart])

    const questionsAreReaden = () => {
        setShowQuestions(true)
        setShowTheoreticalPart(false)
    }

    if (test.interfaceData.loading) return (<StyledPopupMessage type={StyledMessageComponentTypes.loading} />)
    else if (test.interfaceData.error) return (<StyledMessage type={StyledMessageComponentTypes.error} text={test.interfaceData.error} />)
    else return (
        <div>
            {showTheoreticalPart &&
                <>
                    <div className={classes.block}>
                        <StyledText size='big'>{test.name}</StyledText>
                        {test.description && <StyledText>
                            <pre className={classes.preformated_text}>
                                {test.description}
                            </pre>
                        </StyledText>}
                        {test.theoreticalPart && <StyledText>
                            <pre className={classes.preformated_text}>
                                {test.theoreticalPart}
                            </pre>
                        </StyledText>}
                    </div>
                    <StyledButton size='big' color='orange' onClick={() => questionsAreReaden()}>
                        Почати відповідь на питання
                    </StyledButton>
                </>
            }
            {showQuestions &&
                <>
                    {test.questions.map((question, questionId) =>
                        <div className={classes.block} key={question._id}>
                            <GetTestedQuestionTypeDeterminator question={question} questionId={questionId} />
                        </div>
                    )}
                    <StyledButton color='orange' size='big' disabled={!areAllFieldsValid()} onClick={() => handleSubmit()}>
                        Здати тест
                    </StyledButton>
                </>
            }
            {highlightedResult &&
                <>
                    <div className={classes.block}>
                        <StyledText size='big'>Ваша відповідь мала помилки.</StyledText>
                        <br />
                        <StyledText >Повторіть тестову частину та приділіть увагу виділеним абзацам!</StyledText>
                        {highlightedResult}
                    </div>
                    <StyledButton size='big' color='orange' onClick={() => router.push("/getTested")}>Повторив 👍</StyledButton>
                </>
            }

        </div >
    )
}

export default GetTested
