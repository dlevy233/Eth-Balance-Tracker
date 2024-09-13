// src/components/BalanceChart.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

interface BalanceEntry {
  timestamp: number;
  balance: string;
}

interface BalanceChartProps {
  data: BalanceEntry[];
}

const BalanceChart: React.FC<BalanceChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map((entry) => new Date(entry.timestamp).toLocaleString()),
    datasets: [
      {
        label: 'ETH Balance',
        data: data.map((entry) => Number(entry.balance) / 1e18), // Convert wei to ETH
        fill: false,
        backgroundColor: 'blue',
        borderColor: 'lightblue',
      },
    ],
  };

  const options = {
    responsive: true,
  };

  return <Line data={chartData} options={options} />;
};

export default BalanceChart;
