import React from 'react';

interface TimeRangeSelectorProps {
  startTime: number;
  endTime: number;
  setStartTime: (time: number) => void;
  setEndTime: (time: number) => void;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  startTime,
  endTime,
  setStartTime,
  setEndTime,
}) => {
  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(new Date(e.target.value).getTime() / 1000);
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(new Date(e.target.value).getTime() / 1000);
  };

  return (
    <div style={{ marginBottom: '20px', textAlign: 'center' }}>
      <label>
        Start Date:
        <input type="date" onChange={handleStartChange} />
      </label>
      <label>
        End Date:
        <input type="date" onChange={handleEndChange} />
      </label>
    </div>
  );
};

export default TimeRangeSelector;
