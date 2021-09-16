import React from 'react';
import { Bar } from 'react-chartjs-2';
import { genBgColors } from '../../utils/genBgColors';

const HorizontalBarChart = ({ title, legend, dataX, dataY }) => {

    const options = {
        indexAxis: 'y',
        responsive: true,
        plugins: {
            legend: { position: 'bottom', display: false},
        },
        //maintainAspectRatio: false, 
    };

    const data = {
        labels: dataX,
        datasets: [
            {
                label: legend,
                data: dataY,
                backgroundColor: genBgColors(dataY)
            },
        ],
    };

    

    return (
        <>
            <p>{title}</p>
            <Bar data={data} options={options} />
        </>
    )
}

export default HorizontalBarChart;