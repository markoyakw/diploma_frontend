import React from 'react'
import classes from '../../styles/test.module.css'
import TimeDisplay from '../ui/TimeDisplay';
import StyledText from '../ui/StyledText';
import Timer from '../ui/Timer';
import { ITest } from '@/ts/test';

const MyTestButton = ({ test }: { test: ITest }) => {

    const getTimeLeft = (targetDate: number) => {
        const endDate = new Date(targetDate);
        const currentDate = new Date();
        const timeDifference: number = endDate.getTime() - currentDate.getTime();
        return timeDifference;
    };

    return (
        <div className={classes.my_test_button}>
            <div className={classes.my_test_button_name_desc_act}>
                <div className={classes.my_test_link_icon}>
                    {test.isActive
                        ? <>✔️</>
                        : <>😴</>
                    }
                </div>
                <div className={classes.my_test_link_info}>
                    <div className={classes.my_test_link_name}>{test.name}</div>
                    <div className={classes.my_test_link_description}>{test.description}</div>
                </div>
            </div>
            <div className={classes.my_test_button_testing_dates}>
                {!test.isActive && test.activateAt && test.deactivateAt
                    &&
                    <>
                        <StyledText size='small'>
                            Початок тестування: <TimeDisplay timestamp={test.activateAt} />
                        </StyledText>
                        <StyledText size='small'>
                            Кінець тестування: <TimeDisplay timestamp={test.deactivateAt} />
                        </StyledText>
                    </>
                }
                {test.isActive && test.activateAt && test.deactivateAt
                    &&
                    <>
                        <StyledText size='small'>
                            Був активований: <TimeDisplay timestamp={test.activateAt} />
                        </StyledText>
                        <StyledText size='small'>
                            Залишилось часу: <Timer start={getTimeLeft(test.deactivateAt)} />
                        </StyledText>
                    </>
                }
            </div>
        </div >
    )
}

export default MyTestButton