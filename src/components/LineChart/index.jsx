import React from 'react';
import { Line } from 'react-chartjs-2';

const data = {
  labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
          '11','12','13','14','15','16','17','18','19','20'],
  datasets: [
    {
      label: 'Quantidade de transações PIX',
      data: [1600, 13000, 3500, 1600, 3500, 
             6200, 1600, 13000, 3500, 5500,
             2200, 3500, 1600, 13000, 3500,
             7500, 8100, 4500, 8200, 2300],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
};

const options = {
  scales: {
    yAxes: [{ ticks: { beginAtZero: true, }, },],
  },
  maintainAspectRatio: false,
};

const LineChart = () => (
    <Line data={data} options={options} height={200} />
);

export default LineChart;