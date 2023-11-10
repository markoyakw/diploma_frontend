import JournalButton from '@/components/journal/JournalButton'
import { useAppSelector } from '@/hooks/reduxTypedHooks'
import React, { useEffect, useState } from 'react'
import classes from "../../styles/test.module.css"
import StyledText from '@/components/ui/StyledText'
import GetTestedService from '@/services/GetTestedService'
import StyledLink from '@/components/ui/StyledLink'
import { useRouter } from 'next/router'


const Journal = () => {

    const user = useAppSelector(state => state.user)
    const router = useRouter()
    const groupedData = GetTestedService.groupTestsByMonthAndYear(user.testResultsById)

    const GroupedByDataTestResultsById = Object.keys(groupedData).map(key => {
        const [year, month] = key.split('-');
        const sectionData = groupedData[key];
        return (
            <div key={key} className={classes.block}>
                <StyledText size='big'>
                    {`${GetTestedService.GetUkrainianMonthName(Number(month))} ${year}`}
                </StyledText>
                {sectionData.map(testWithResults => {
                    return (
                        <JournalButton key={testWithResults._id} testWithResults={testWithResults} />
                    );
                })}
            </div>
        );
    });

    if (user.testResultsById.length === 0 && !user.interfaceData.loading) return (
        <StyledText size='big'>
            У вас немає результатів тестів,&nbsp;
            <StyledLink size='big' onClick={() => router.push("/newTest")}>
                створіть тест
            </StyledLink>
            &nbsp;та активуйте його для проходження.
        </StyledText>
    )
    else return (
        <>
            <StyledText size='big'>Журнал за тестами:</StyledText>
            {GroupedByDataTestResultsById}
        </>
    )
}

export default Journal