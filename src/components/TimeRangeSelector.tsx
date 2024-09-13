// src/components/TimeRangeSelector.tsx
import React from 'react';

interface TimeRangeSelectorProps {
  from: string;
  to: string;
  onChange: (from: string, to: string) => void;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({ from, to, onChange }) => {
  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value, to);
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(from, e.target.value);
  };

  return (
    <div>
      <label>
        From:
        <input type="datetime-local" value={from} onChange={handleFromChange} />
      </label>
      <label>
        To:
        <input type="datetime-local" value={to} onChange={handleToChange} />
      </label>
    </div>
  );
};

export default TimeRangeSelector;
