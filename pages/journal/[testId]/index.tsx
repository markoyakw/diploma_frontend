import TestResultButton from '@/components/journal/TestResultButton';
import StyledLink from '@/components/ui/StyledLink';
import StyledText from '@/components/ui/StyledText';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxTypedHooks';
import { getTestResultsByTestId } from '@/store/userSlice';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import classes from "../../../styles/test.module.css"

const JournalItem = () => {
    const router = useRouter()
    const { testId: id } = router.query;
    const dispatch = useAppDispatch()
    const resultsAreLoading = useAppSelector(state => state.user.interfaceData.loading)
    const testResults = useAppSelector(state =>
        state.user.testResultsById.find(testResult => String(testResult.ref) === id))

    useEffect(() => {
        dispatch(getTestResultsByTestId({ id: String(id) }))
    }, [])

    if (testResults && testResults.testResults.length > 0) return (
        <div className={classes.block}>
            <StyledText size='big'>Результати з тесту &quot;{testResults?.name}&quot;:</StyledText>
            {
                testResults
                    ? testResults.testResults.map((testResult, testResultId) =>
                        <TestResultButton testResult={testResult} key={testResultId} />).reverse()
                    : <></>
            }
        </div>
    )
    else if (!resultsAreLoading) return (
        <StyledText size='big'>Цей тест ще не проходили,&nbsp;
            <StyledLink size='big' onClick={() => router.push("/myTests")}>
                активуйте та поширте
            </StyledLink>
            &nbsp;його.
        </StyledText>
    )
}

export default JournalItem
