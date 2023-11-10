import React from 'react'
import classes from '../styles/test.module.css'
import { useAppSelector } from '@/hooks/reduxTypedHooks'
import StyledText from '@/components/ui/StyledText'
import StyledButton from '@/components/ui/StyledButton'
import { useRouter } from 'next/router';
import MyTest from '@/components/myTests/MyTest'
import UnsavedTest from '@/components/myTests/unsavedTest'
import { useNewTestBackup } from '@/hooks/useNewTestBackup'

const MyTests = () => {

  const router = useRouter()
  const user = useAppSelector(state => state.user)
  const { unsavedTests } = useNewTestBackup()

  return (
    <div className={classes.block}>
      <StyledText size={"big"}>Незбережені тести:</StyledText>
      {
        unsavedTests?.map(test =>
          <UnsavedTest key={test._id} test={test}/>)
      }
      <StyledText size={"big"}>Ваші тести:</StyledText>
      {user.tests.map(test =>
        <MyTest key={test._id} test={test} />
      )}
      <StyledButton color='orange' symbol='plus' onClick={() => router.push(`/newTest`)}>
        Новий тест
      </StyledButton>
    </div >
  )
}

export default MyTests