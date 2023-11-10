import TestConstructor from '@/components/testConstructor/TestConstructor'
import { useAppSelector } from '@/hooks/reduxTypedHooks'
import { useNewTestBackup } from '@/hooks/useNewTestBackup'
import React, { useEffect } from 'react'

const NewTest = () => {

  const test = useAppSelector(state => state.test)
  const { addBackup } = useNewTestBackup()

  useEffect(() => {
    addBackup(test)
  }, [test])

  return (
    <TestConstructor />
  )
}

export default NewTest