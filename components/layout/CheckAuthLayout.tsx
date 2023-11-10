import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxTypedHooks'
import { checkAuthnAction } from '@/store/userSlice'
import AuthContainer from '../auth/AuthContainer'
import LoggedInLayout from './LoggedInLayout'
import StyledPopupMessage from '../ui/StyledPopupMessage'
import { StyledMessageComponentTypes } from '@/ts/styledCoponents'
import Loader from '../ui/Loader'

type LayoutProps = {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user)
  const test = useAppSelector(state => state.test)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuthnAction())
    }
  }, [])

  return (
    <>
      {user.interfaceData.isLoggedIn
        ? <LoggedInLayout>{children}</LoggedInLayout>
        : <AuthContainer />
      }

      {user.interfaceData.message && <StyledPopupMessage disappearTime={10000}
        text={user.interfaceData.message} type={StyledMessageComponentTypes.success} />}
      {test.interfaceData.loading && <StyledPopupMessage type={StyledMessageComponentTypes.loading} />}
      {user.interfaceData.loading && <StyledPopupMessage type={StyledMessageComponentTypes.loading} />}
      {test.interfaceData.error && <StyledPopupMessage disappearTime={3000}
        text={test.interfaceData.error} type={StyledMessageComponentTypes.error} />}
      {test.interfaceData.message && <StyledPopupMessage disappearTime={3000}
        text={test.interfaceData.message} type={StyledMessageComponentTypes.success} />}
    </>
  )
}

export default Layout