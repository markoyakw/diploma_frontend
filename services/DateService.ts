export default class DateService {
    public static AddMinutesToTime(time: string, minutesToAdd: number) {
        const [hours, minutes] = time.split(':').map(Number);
        const totalMinutes = hours * 60 + minutes;
        const newTotalMinutes = totalMinutes + minutesToAdd;
        const newHours = Math.floor(newTotalMinutes / 60);
        const newMinutes = newTotalMinutes % 60;
        const formattedHours = String(newHours).padStart(2, '0');
        const formattedMinutes = String(newMinutes).padStart(2, '0');

        return `${formattedHours}:${formattedMinutes}`;
    }

    public static FormatTimeDateToInputTime(date: Date) {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }
    public static FormatDateToInput = (date: Date): string => {
        if (date instanceof Date && !isNaN(date.getTime())) {
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
        return '';
    }
    public static formatInputToDate = (date: string): Date | null => {
        const parsedDate = Date.parse(date);
        if (!isNaN(parsedDate)) {
            return new Date(parsedDate);
        }
        return null;
    }
    public static GetCurrentDateInUkraineTimeZone() {
        const now = new Date();
        const ukraineTimeZone = 'Europe/Kiev';
        const options = { timeZone: ukraineTimeZone, year: 'numeric', month: '2-digit', day: '2-digit' } as Intl.DateTimeFormatOptions;
        const formattedDate = now.toLocaleDateString(undefined, options);
        const [day, month, year] = formattedDate.split('.');
        const formattedDateForInput = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

        return formattedDateForInput;
    }
    public static GetMinTime = (selectedDate: Date, timeBufferMinutes: number): string => {
        const isDateToday = (date: Date): boolean => {
            const currentDate = new Date();
            return (
                date.getFullYear() === currentDate.getFullYear() &&
                date.getMonth() === currentDate.getMonth() &&
                date.getDate() === currentDate.getDate()
            );
        };
        const currentTime = new Date();
        currentTime.setMinutes(currentTime.getMinutes() + timeBufferMinutes)

        const formattedHours = currentTime.getHours().toString().padStart(2, '0')
        const formattedMinutes = currentTime.getMinutes().toString().padStart(2, '0')
        if (isDateToday(selectedDate)) {
            return `${formattedHours}:${formattedMinutes}`
        }
        else return "00:00"
    };
    public static GetMaxSelectableDate = (daysFromToday: number) => {
        const maxSelectableDate = new Date(this.GetCurrentDateInUkraineTimeZone());
        maxSelectableDate.setDate(maxSelectableDate.getDate() + daysFromToday);
        return maxSelectableDate.toISOString().split('T')[0]
    }
    public static GetDateFromDateAndTime = (date: Date, time: string) => {
        if (date && time !== "") {
            const selectedDateTime = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                parseInt(time.split(':')[0], 10),
                parseInt(time.split(':')[1], 10)
            );
            return selectedDateTime
        };
        return null
    }
    public static AreDatesSameDay(date1: Date, date2: Date) {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    }
}