import React from 'react';

const TimeDisplay: React.FC<{ timestamp: number; showDayMonthYear?: boolean }> = ({ timestamp, showDayMonthYear }) => {
  const date = new Date(timestamp);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const months = [
    'січня', 'лютого', 'березня', 'квітня',
    'травня', 'червня', 'липня', 'серпня',
    'вересня', 'жовтня', 'листопада', 'грудня',
  ];

  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return (
    <span>
      {showDayMonthYear && (
        <span>
          {date.getDate()} {month} {year}{' '}
        </span>
      )}
      {formattedTime}
    </span>
  );
};

export default TimeDisplay;
