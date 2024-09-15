import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface BalanceData {
  timestamp: number;
  balance: number;
}

const BalanceChart: React.FC<{ startTime: number; endTime: number }> = ({
  startTime,
  endTime,
}) => {
  const [data, setData] = useState<BalanceData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<BalanceData[]>('/api/balances', {
          params: {
            start: startTime.toString(),
            end: endTime.toString(),
          },
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching balance data:', error);
      }
    };
    fetchData();
  }, [startTime, endTime]);

  return (
    <div style={{ textAlign: 'center' }}>
      <LineChart
        width={800}
        height={400}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="timestamp"
          domain={['auto', 'auto']}
          tickFormatter={(unixTime) =>
            new Date(unixTime * 1000).toLocaleDateString()
          }
          type="number"
        />
        <YAxis dataKey="balance" />
        <Tooltip
          labelFormatter={(unixTime) =>
            new Date(unixTime * 1000).toLocaleString()
          }
        />
        <Line type="monotone" dataKey="balance" stroke="#8884d8" dot={false} />
      </LineChart>
    </div>
  );
};

export default BalanceChart;
