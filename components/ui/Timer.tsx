import React, { useEffect, useState } from 'react';

interface TimerProps {
    start: number
    onTimerEnd?: () => void;
}

const Timer: React.FC<TimerProps> = ({ start, onTimerEnd }) => {
    const [timeLeft, setTimeLeft] = useState<number>(start)

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;

        const decrementTimer = () => {
            if (timeLeft > 0) {
                setTimeLeft((prevTimeLeft) => prevTimeLeft - 1000);
                clearInterval(timer!)
                if (onTimerEnd) {
                    onTimerEnd();
                }
            }
        };

        timer = setInterval(decrementTimer, 1000)
        return () => {
            if (timer) {
                clearInterval(timer)
            }
        };
    }, [timeLeft, onTimerEnd])

    const formatTime = (milliseconds: number): string => {
        const seconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
        if (milliseconds <= 0) return "00:00:00"
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
    };

    return <span>{formatTime(timeLeft)}</span>;
};

export default Timer;
