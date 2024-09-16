import React from 'react';

interface TimeRangeSelectorProps {
  startTime: number;
  endTime: number;
  setStartTime: (time: number) => void;
  setEndTime: (time: number) => void;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({ startTime, endTime, setStartTime, setEndTime }) => {
  // Function to convert Unix timestamp to 'datetime-local' format in UTC
  const formatDateForInput = (unixTimestamp: number): string => {
    const date = new Date(unixTimestamp * 1000);
    const offset = date.getTimezoneOffset() * 60000; // Offset in milliseconds
    const localISOTime = new Date(date.getTime() - offset).toISOString().substring(0, 16); // Remove offset for correct local time
    return localISOTime;
  };

  // Function to convert 'datetime-local' input to Unix timestamp (UTC)
  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartTime = Math.floor(new Date(e.target.value).getTime() / 1000);
    console.log('Selected Start Time:', newStartTime); // Log the selected start time
    setStartTime(newStartTime);
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndTime = Math.floor(new Date(e.target.value).getTime() / 1000);
    console.log('Selected End Time:', newEndTime); // Log the selected end time
    setEndTime(newEndTime);
  };

  return (
    <div>
      <h3>Select Time Range</h3>
      <label>
        Start Time:
        <input
          type="datetime-local"
          value={formatDateForInput(startTime)}
          onChange={handleStartTimeChange}
        />
      </label>
      <label>
        End Time:
        <input
          type="datetime-local"
          value={formatDateForInput(endTime)}
          onChange={handleEndTimeChange}
        />
      </label>
    </div>
  );
};

export default TimeRangeSelector;
