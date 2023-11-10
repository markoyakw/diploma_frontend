import React from 'react'
import Header from './Header'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxTypedHooks'
import { useRouter } from 'next/router';
import StyledLink from '../ui/StyledLink';
import { logOutAction } from '@/store/userSlice';
import classes from '../../styles/layout.module.css'
import StyledText from '../ui/StyledText';

type LayoutProps = {
    children: React.ReactNode
}

const LoggedInLayout: React.FC<LayoutProps> = ({ children }) => {

    const dispatch = useAppDispatch()
    const router = useRouter()
    const user = useAppSelector(state => state.user)

    const handleRouting = (url: string) => {
        router.push(url)
    }
    

    return (
        <>
            <Header>
                <div className={classes.header_list}>
                    <StyledLink active={router.pathname === '/newTest' && true} color={'white'} onClick={() => handleRouting("/newTest")} >
                        Новий тест
                    </StyledLink>
                    <StyledLink active={router.pathname === '/myTests' && true} color={'white'} onClick={() => handleRouting("/myTests")} >
                        Мої тести
                    </StyledLink>
                    <StyledLink active={router.pathname === '/journal' && true} color={'white'} onClick={() => handleRouting("/journal")} >
                        Журнал
                    </StyledLink>
                    <StyledLink color={'white'} onClick={() => dispatch(logOutAction())}> Вихід </StyledLink>
                </div>
                <div className={classes.header_username}>
                    <StyledText white>{user.username}</StyledText>
                </div>
            </Header>
            <div className={classes.layout_body_container}>
                {children}
            </div>
        </>
    )
}

export default LoggedInLayout