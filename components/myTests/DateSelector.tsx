import DateService from '@/services/DateService'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import StyledPopupMessage from '../ui/StyledPopupMessage'
import { StyledMessageComponentTypes } from '@/ts/styledCoponents'
import StyledText from '../ui/StyledText'
import classes from "../../styles/test.module.css"
import StyledButton from '../ui/StyledButton'

interface DateSelectorProps {
    setStartDateAndTime: Dispatch<SetStateAction<number | null | "now">>
    setEndDateAndTime: Dispatch<SetStateAction<number | null>>
}

const DateSelector: React.FC<DateSelectorProps> = ({ setStartDateAndTime, setEndDateAndTime }) => {

    const [startTime, setStartTime] = useState("")
    const [startDate, setStartDate] = useState<Date | null>(new Date(DateService.GetCurrentDateInUkraineTimeZone()))
    const [startError, setStartError] = useState<string | null>(null)
    const [startNow, setStartNow] = useState<boolean>(false)

    const [endTime, setEndTIme] = useState("")
    const [endDate, setEndDate] = useState<Date | null>(new Date(DateService.GetCurrentDateInUkraineTimeZone()))
    const [endError, setEndError] = useState<string | null>(null)

    const handleStartTimeChange = (time: string) => {
        if (startDate) {
            if (time >= DateService.GetMinTime(startDate, 2)) {
                setStartError(null)
                setStartTime(time);
            }
            else {
                setStartError(`Ви не можете обрати час сьогодняшньої дати, менший за ${String(DateService.GetMinTime(startDate, 2))}`)
                setStartTime(DateService.GetMinTime(startDate, 2))
            }
        }
    }

    const handleStartDataChange = (date: string) => {
        const dateFormatedDate = new Date(date)
        if (date === DateService.GetCurrentDateInUkraineTimeZone()
            && startTime <= DateService.GetMinTime(dateFormatedDate, 2)
        ) {
            setStartError(`Ви не можете обрати час сьогодняшньої дати, менший за ${String(DateService.GetMinTime(dateFormatedDate, 2))}`)
            setStartTime(DateService.GetMinTime(dateFormatedDate, 2))
        }
        const formatedDate = DateService.formatInputToDate(date)
        setStartDate(formatedDate)
    }

    const handleEndTimeChange = (time: string) => {
        if (endDate) {
            if (time >= DateService.GetMinTime(endDate, 12)) {
                setEndError(null)
                setEndTIme(time);
            }
            else {
                setEndError(`Ви не можете обрати час сьогодняшньої дати, менший за ${String(DateService.GetMinTime(endDate, 12))}`)
                setEndTIme(DateService.GetMinTime(endDate, 22))
            }
        }
    }

    const handleEndDateChange = (date: string) => {
        const dateFormatedDate = new Date(date)
        //Якщо був обраний час, раніший за сьогодняшній наявний і потім був змінений на сьогодні,
        //змінити на мінімальний дозволений
        if (date === DateService.GetCurrentDateInUkraineTimeZone()
            && endTime <= DateService.GetMinTime(dateFormatedDate, 12)
        ) {
            setEndError(`Ви не можете обрати час сьогодняшньої дати, менший за ${String(DateService.GetMinTime(dateFormatedDate, 12))}`)
            setEndTIme(DateService.GetMinTime(dateFormatedDate, 12))
        }
        const formatedDate = DateService.formatInputToDate(date)
        setEndDate(formatedDate)

    }

    useEffect(() => {
        if (startNow) {
            setStartDateAndTime("now")
        }
        else {
            setStartDateAndTime(oldState => {
                if (startDate && startTime) {
                    const startDateAndTime = DateService.GetDateFromDateAndTime(startDate, startTime)
                    if (startDateAndTime) {
                        return (Number(startDateAndTime))
                    }
                    else return null
                }
                else return null
            })

            if (endDate && getMinEndDate() > DateService.FormatDateToInput(endDate)) {
                setEndDate(startDate)
            }
            if (startDate && endDate && DateService.AreDatesSameDay(startDate, endDate)) {
                if (startTime > endTime) {
                    setEndTIme(DateService.AddMinutesToTime(startTime, 20))
                }
            }
        }
    }, [startDate, startTime, startNow])

    useEffect(() => {
        if (endDate && endTime !== "") {
            const endDateAndTime = DateService.GetDateFromDateAndTime(endDate, endTime)
            if (endDateAndTime) {
                setEndDateAndTime(Number(endDateAndTime))
            }
        }
    }, [endDate, endTime])

    const getMinEndDate = () => {
        if (startDate && DateService.FormatDateToInput(startDate)) {
            return DateService.FormatDateToInput(startDate)
        }
        else return DateService.GetCurrentDateInUkraineTimeZone()
    }


    return (
        <div className={classes.date_selector}>
            <div className={classes.date_selector_block}>
                {startNow
                    ? <>
                        <StyledText>Тестування почнеться зараз.</StyledText>
                        <StyledText> Для вибору іншої дати, натисніть кнопку нижче:</StyledText>
                    </>
                    : <>
                        <StyledText>Оберіть час початку тестування:</StyledText>
                        <div>
                            <label htmlFor="dateInput">Дата:</label>
                            <input
                                value={startDate ? DateService.FormatDateToInput(startDate) : DateService.FormatDateToInput(new Date())}
                                type="date"
                                id="dateInput"
                                onChange={e => handleStartDataChange(e.target.value)}
                                min={DateService.GetCurrentDateInUkraineTimeZone()}
                                max={DateService.GetMaxSelectableDate(2)}
                                disabled={startNow}
                            />
                        </div>
                        <label htmlFor="timeInput">Час:</label>
                        <input
                            value={startTime}
                            type="time"
                            id="timeInput"
                            onChange={e => handleStartTimeChange(e.target.value)}
                            disabled={startNow}
                        />
                    </>
                }
                <div className={classes.date_selector_start_button}>
                    <StyledButton onClick={() => setStartNow(prev => !prev)}>
                        {startNow
                            ? <>Ввести дату</>
                            : <>Зараз</>
                        }
                    </StyledButton>
                </div>
                {startError && <StyledPopupMessage text={startError} type={StyledMessageComponentTypes.error} disappearTime={2000} />}
            </div>
            <div className={classes.date_selector_block}>
                <StyledText>Та закінчення:</StyledText>
                <div>
                    <label htmlFor="dateInput">Дата:</label>
                    <input
                        value={endDate ? DateService.FormatDateToInput(endDate) : DateService.FormatDateToInput(new Date())}
                        type="date"
                        id="dateInput"
                        onChange={e => handleEndDateChange(e.target.value)}
                        min={getMinEndDate()}
                        max={DateService.GetMaxSelectableDate(6)}
                    />
                </div>
                <label htmlFor="timeInput">Час:</label>
                <input
                    value={endTime}
                    type="time"
                    id="timeInput"
                    onChange={e => handleEndTimeChange(e.target.value)}
                />
                {endError && <StyledPopupMessage text={endError} type={StyledMessageComponentTypes.error} disappearTime={2000} />}
            </div>
        </div>
    )
}

export default DateSelector