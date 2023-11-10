import React from 'react'
import StyledButton from '../ui/StyledButton'
import { ITestResultsById } from '@/ts/test'
import classes from '../../styles/test.module.css'
import GetTestedService from '@/services/GetTestedService'
import { useRouter } from 'next/router'

const JournalButton: React.FC<{ testWithResults: ITestResultsById }> = ({ testWithResults }) => {

    const router = useRouter()

    const onJournalButtonClick = (id: number) => {
        router.push("/journal/" + id)
    }

    return (
        <div className={classes.journal_button}>
            <StyledButton onClick={() => onJournalButtonClick(testWithResults.ref)} symbol='arrow_right'>
                <div className={classes.my_test_button}>
                    <div className={classes.my_test_link_info}>
                        <div className={classes.my_test_link_name}>{testWithResults.name}</div>
                        <div className={classes.my_test_link_description}>{testWithResults.description}</div>
                    </div>
                </div>
            </StyledButton>
        </div>
    )
}

export default JournalButton