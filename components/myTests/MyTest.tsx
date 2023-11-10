import React, { useEffect, useState } from 'react'
import StyledDropDown from '../ui/StyledDropDown'
import { ITest } from '@/ts/test';
import { useAppDispatch } from '@/hooks/reduxTypedHooks';
import { useRouter } from 'next/router';
import StyledButton from '../ui/StyledButton';
import { activateTestAction, deactivateTestAction, deleteTestAction } from '@/store/userSlice';
import Popup from '../ui/Popup';
import DateSelector from './DateSelector';
import MyTestButton from './MyTestButton';
import StyledPopupMessage from '../ui/StyledPopupMessage';
import { StyledMessageComponentTypes } from '@/ts/styledCoponents';
import QRCodeComponent from '../ui/QRCodeComponent';

const MyTest: React.FC<{ test: ITest }> = ({ test }) => {

    const BASE_URL = process.env.BASE_URL as string
    const getTestedURL = BASE_URL + "getTested/" + test._id;

    const dispatch = useAppDispatch()
    const router = useRouter()

    const editTest = (testId: number) => {
        router.push(`/editTest/${testId}`);
    }

    const handleTestActivation = (activatingTestId: number) => {
        if (startDateAndTime && endDateAndTime) {
            dispatch(activateTestAction({
                activatingTestId: activatingTestId,
                startTime: startDateAndTime,
                endTime: endDateAndTime
            }))
            setIsActivationPopupOpen(false)
        }
    }

    const copyGetTestedLink = () => {
        setIsCopiedMessageOpen(true)
        const inputElement = document.createElement('input');
        inputElement.value = getTestedURL
        document.body.appendChild(inputElement);
        inputElement.select();
        document.execCommand('copy');
        document.body.removeChild(inputElement);
        setIsCopiedMessageOpen(true)
    }

    const [isActivationPopupOpen, setIsActivationPopupOpen] = useState(false)
    const [isCopiedMessageOpen, setIsCopiedMessageOpen] = useState(false)
    const [startDateAndTime, setStartDateAndTime] = useState<null | number | "now">(null)
    const [endDateAndTime, setEndDateAndTime] = useState<null | number>(null)
    const [showQRCode, setShowQRCode] = useState(false)
    return (
        <>
            <StyledDropDown big buttonText={<MyTestButton test={test} />}>
                {test.isActive
                    ? <StyledButton symbol='stop' onClick={() => dispatch(deactivateTestAction({ deactivatingTestId: test._id }))}>
                        Закінчити тестування
                    </StyledButton>
                    : <StyledButton onClick={() => setIsActivationPopupOpen(true)} symbol='check'>
                        Почати тестування
                    </StyledButton>
                }
                {test.isActive &&
                    <>
                        <StyledButton onClick={copyGetTestedLink} symbol='copy'>
                            Скопіювати посилання на проходження
                        </StyledButton>
                        <StyledButton onClick={() => setShowQRCode(true)}>
                            Отримати QR-код
                        </StyledButton>
                    </>
                }
                <StyledButton onClick={() => editTest(test._id)} symbol="edit" disabled={Boolean(test.isActive)}>
                    {test.isActive ? "Для редагування деактивуйте" : "Редагувати"}
                </StyledButton>
                <StyledButton onClick={() => dispatch(deleteTestAction({ testIdToDelete: test._id }))} symbol='trash' disabled={Boolean(test.isActive)}>
                    {test.isActive ? "Для видалення деактивуйте" : "Видалити"}
                </StyledButton>
            </StyledDropDown>
            {isCopiedMessageOpen && <StyledPopupMessage disappearTime={4000} type={StyledMessageComponentTypes.success} text='Посилання успішно скопійоване' />}
            
            <Popup isOpen={showQRCode} closePopup={() => setShowQRCode(false)}>
                <QRCodeComponent value={getTestedURL} size={200} />
            </Popup>
            <Popup isOpen={isActivationPopupOpen} closePopup={() => { setIsActivationPopupOpen(false) }}>
                <DateSelector setEndDateAndTime={setEndDateAndTime} setStartDateAndTime={setStartDateAndTime} />
                <StyledButton onClick={() => handleTestActivation(test._id)} disabled={!Boolean(endDateAndTime && startDateAndTime)}>
                    Зберегти час тестування
                </StyledButton>
            </Popup>
        </>

    )
}

export default MyTest