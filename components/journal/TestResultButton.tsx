import React from 'react'
import StyledButton from '../ui/StyledButton'
import { ITestResult } from '@/ts/test'
import classes from '../../styles/test.module.css'
import { useRouter } from 'next/router'
import TimeDisplay from '../ui/TimeDisplay'
import StyledText from '../ui/StyledText'

const TestResultButton: React.FC<{ testResult: ITestResult }> = ({ testResult }) => {

    const router = useRouter()

    const onTestResultButtonClick = (id: string) => {
        router.push(router.asPath + "/" + id)
    }

    return (
        <div className={classes.journal_button}>
            <StyledButton symbol='arrow_right' onClick={() => onTestResultButtonClick(testResult._id)}>
                <div className={classes.my_test_button}>
                    <div className={classes.my_test_link_icon}>
                        <><StyledText size='small'>{testResult.grade.percentageGrade.value}%</StyledText></>
                    </div>
                    <div className={classes.my_test_link_info}>
                        <div className={classes.my_test_link_name}>{testResult.passedBy.username} ({testResult.passedBy.login})</div>
                        <div className={classes.my_test_link_description}><TimeDisplay timestamp={testResult.passedAt} showDayMonthYear /></div>
                    </div>
                </div>
            </StyledButton>
        </div>
    )
}

export default TestResultButton