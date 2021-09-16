import React from 'react';
import { Bar } from 'react-chartjs-2';

const data = {
    labels: ['Zapelino', 'OI', 'BRB', 'BRB Nacão'],
    datasets: [
        {
            label: 'Quantidade de contas abertas',
            data: [2350, 1300, 550, 1000],
            backgroundColor: [
                'blue',
                'green',
                'yellow',
                'red',
            ]
        },
    ],
};

const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
        legend: { position: 'top', },
    },
    options: { maintainAspectRatio: false }
};

const HorizontalBarChart = () => (
    <>
        <p>Contas Abertas - BOT</p>
        <Bar data={data} options={options} height={50} />
    </>
);

export default HorizontalBarChart;