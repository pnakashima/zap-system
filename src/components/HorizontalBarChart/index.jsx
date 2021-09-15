import React from 'react';
import { Bar } from 'react-chartjs-2';

const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5],
            backgroundColor: [
                'red',
                'blue',
                'yellow',
                'green',
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
        {/* <div className='header'>
            <h1 className='title'>Horizontal Bar Chart</h1>
        </div> */}
        <Bar data={data} options={options} height={100} />
    </>
);

export default HorizontalBarChart;