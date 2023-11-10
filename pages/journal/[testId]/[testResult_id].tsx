import StyledButton from '@/components/ui/StyledButton';
import StyledPopupMessage from '@/components/ui/StyledPopupMessage';
import WatchTest from '@/components/watchTest/WatchTest';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxTypedHooks'
import { getTestResultsByTestId } from '@/store/userSlice';
import { StyledMessageComponentTypes } from '@/ts/styledCoponents';
import { IQuestion, IQuestionGrade } from '@/ts/test';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const TestResultid = () => {
  const router = useRouter()
  const { testId, testResult_id } = router.query;
  const dispatch = useAppDispatch()

  const testResults = useAppSelector(state =>
    state.user.testResultsById.find(testResult => String(testResult.ref) === testId))
  const testResult = testResults?.testResults.find(result => result._id === testResult_id)
  const [questionGrades, setQuestionGrades] = useState<IQuestionGrade[]>([])
  const [questions, setQuestions] = useState<IQuestion[]>([])

  useEffect(() => {
    if (!testResult) {
      dispatch(getTestResultsByTestId({ id: String(testId) }))
    }
  }, [])

  useEffect(() => {
    testResult?.questionGrades.forEach(questionGrade => {
      setQuestions(prevQuestions => [...prevQuestions, questionGrade.question])
      setQuestionGrades(prevQuestionGrades => [...prevQuestionGrades, questionGrade.questionGrade])
    })
  }, [testResult])

  if (!testResult) return <StyledPopupMessage type={StyledMessageComponentTypes.loading} />
  else return (
    <div>
      <WatchTest name={testResult.name} description={testResult.description} theoreticalPart={testResult.theoreticalPart}
        _id={testResult._id} questions={questions} passedAt={testResult.passedAt} grade={testResult.grade}
        passedBy={testResult.passedBy} questionGrades={questionGrades} />
    </div>
  )
}

export default TestResultid