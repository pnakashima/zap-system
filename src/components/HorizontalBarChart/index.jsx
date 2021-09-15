import React from 'react';
import { Bar } from 'react-chartjs-2';

const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'red',
                'blue',
                'yellow',
                'green',
                'purple',
                'orange',
            ]
        },
    ],
};

const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
    },
};

const HorizontalBarChart = () => (
    <>
        {/* <div className='header'>
            <h1 className='title'>Horizontal Bar Chart</h1>
        </div> */}
        <Bar data={data} options={options} />
    </>
);

export default HorizontalBarChart;