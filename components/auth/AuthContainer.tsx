import React, { useState } from 'react'
import classes from "../../styles/auth.module.css"
import LoginForm from './LoginForm'
import RegisterForm from './RegistrationForm'
import ExistingAcoountMessage from './ExistingAcoountMessage'
import Logo from '../ui/Logo'
import GreetingMessage from './GreetingMessage'
import GreetingSlider from './GreetingSlider/GreetingSlider'
import { useAppDispatch } from '@/hooks/reduxTypedHooks'
import { clearError, clearMessage } from '@/store/userSlice'

const AuthContainer = () => {

    const dispatch = useAppDispatch()
    const [showLoginForm, setShowLoginForm] = useState<boolean>(true)
    const toggleShowLoginOrRegistration = () => {
        dispatch(clearMessage())
        dispatch(clearError())
        setShowLoginForm(prevState => !prevState)
    }

    const greetingSliderItems = [
        {
            header: "⚡ Створюйте тести леко та швидко ",
            textParagraphs: [
                "Наш додаток пропонує чіткий та легко зрозумілий інтерфейс, який дозволяє вам створювати тести без зайвих зусиль. Ви швидко зрозумієте, як використовувати всі можливості додатку.",
                "Процес створення тесту виконується крок за кроком. Виберіть тип питання, введіть питання та варіанти відповідей, а також виберіть правильну відповідь і ваш тест готовий до публікації"
            ]
        },
        {
            header: "💾 Автоматичне збереження",
            textParagraphs: [
                "Наш додаток автоматично зберігає ваші тести, щоб ви не втратили свою роботу. Ви можете спокійно працювати над тестами та вносити зміни, знаючи, що ваша робота залишиться збереженою.",
                "Відключення зв'язку або електроживлення не видалять створений квіз, все зберігається у пам'яті браузера. Таким чином ви можете зберігати до 3х тестів!"
            ]
        },
        {
            header: "🌎 Зручне поширення",
            textParagraphs: [
                "Завдяки зручному способу поширення тестів, ви можете легко поділитися створеними тестами зі своїми учнями або колегами.",
                "Оберіть тест, введіть часові рамки тестування та отримайте QR-код, при скануванні якого, суб'єкт тестування буде перенесений на сторінку з тестом!",
                "Також ви отримаєте індивідуальний ідентифікатор, при введені якого на сайті, можна отримати доступ до проходження поширеного тесту."
            ]
        }
    ]

    return (
        <div className={classes.container}>

            <div className={`${classes.block} ${classes.left_block}`}>
                <div className={classes.logo_block}><Logo /></div>
                <GreetingMessage />
                {showLoginForm
                    ? <LoginForm />
                    : <RegisterForm />
                }
                <ExistingAcoountMessage toggleShowLoginOrRegistration={toggleShowLoginOrRegistration} showLoginForm={showLoginForm} />
            </div>

            <div className={`${classes.block} ${classes.right_block}`}>
                <GreetingSlider items={greetingSliderItems} />
            </div>
        </div>
    )
}

export default AuthContainer
