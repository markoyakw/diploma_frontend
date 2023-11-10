import StyledText from '@/components/ui/StyledText'
import { useAppSelector } from '@/hooks/reduxTypedHooks'
import React from 'react'

const getTested = () => {


  return (
    <div>
      <StyledText size='big'>Отримайте посилання або QR-код для проходження тесту!</StyledText>
    </div>
  )
}

export default getTested