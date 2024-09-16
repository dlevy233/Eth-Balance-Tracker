import React from 'react';

interface TimeRangeSelectorProps {
  startTime: number;
  endTime: number;
  setStartTime: (time: number) => void;
  setEndTime: (time: number) => void;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({ startTime, endTime, setStartTime, setEndTime }) => {
  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(new Date(e.target.value).getTime() / 1000); // Convert to Unix timestamp in seconds
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(new Date(e.target.value).getTime() / 1000); // Convert to Unix timestamp in seconds
  };

  return (
    <div>
      <label>
        Start Time:
        <input
          type="datetime-local"
          value={new Date(startTime * 1000).toISOString().slice(0, 16)}
          onChange={handleStartChange}
        />
      </label>
      <label>
        End Time:
        <input
          type="datetime-local"
          value={new Date(endTime * 1000).toISOString().slice(0, 16)}
          onChange={handleEndChange}
        />
      </label>
    </div>
  );
};

export default TimeRangeSelector;
