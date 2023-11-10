import { IGrade, IQuestion, IQuestionGrade } from '@/ts/test'
import React from 'react'
import classes from "../../styles/test.module.css"
import StyledText from '../ui/StyledText'
import WatchQuestion from './WatchQuestionTypeDeterminator'
import TimeDisplay from '../ui/TimeDisplay'


interface WatchTestProps {
    _id: string,
    name: string,
    description: string | null,
    theoreticalPart: string | null,
    questions: Array<IQuestion>,
    questionGrades?: Array<IQuestionGrade>,
    passedAt?: number,
    grade?: IGrade
    passedBy?: {
        username: string
        login: string
    }
}

const WatchTest: React.FC<WatchTestProps> = ({ name, description, theoreticalPart, questions, questionGrades, grade, passedAt, passedBy }) => {
    return (
        <>
            <div className={classes.block}>
                <pre className={classes.preformated_text}>
                    <StyledText size='big'>
                        {name}
                    </StyledText>
                </pre>
                {description && <StyledText>{description}</StyledText>}
            </div>
            <div className={classes.block}>
                {theoreticalPart && <StyledText>
                    <pre className={classes.preformated_text}>
                        {theoreticalPart}
                    </pre>
                </StyledText>}
            </div>
            <div>
                {questions.map((question, questionId) => <WatchQuestion questionId={questionId} question={question} questionGrade={questionGrades && questionGrades[questionId]} key={question._id} />)}
            </div>
            {grade && passedBy && passedAt &&
                <div className={classes.block}>
                    <StyledText size='big'>{grade.numberGrade.label} або {grade.percentageGrade.label} правильних запитань.</StyledText>
                    <StyledText>
                        Здав(ла): {passedBy.username} ({passedBy.login})
                    </StyledText>
                    <StyledText>Час здачі: <TimeDisplay timestamp={passedAt} showDayMonthYear /></StyledText>
                </div>
            }
        </>
    )
}

export default WatchTest
