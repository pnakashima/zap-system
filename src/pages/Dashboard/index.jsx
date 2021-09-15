


// import { Bar } from 'react-chartjs-2';

// const data = {
//     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//     datasets: [
//         {
//             label: '# of Votes',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: [
//                 'red',
//                 'blue',
//                 'yellow',
//                 'green',
//                 'purple',
//                 'orange',
//             ]
//         },
//     ],
// };

// const options = {
//     indexAxis: 'y',
//     responsive: true,
//     plugins: {
//         legend: {
//             position: 'top',
//         },
//     },
// };


// const Dashboard = () => {

//     return (
//         <div className="dashboard">
//             <div style={{width: "100%"}}>
//                 <Bar data={data} options={options}/>
//             </div>
//             {/* <div className="graph-area">
//                 <LineChart />
//             </div> */}
//         </div>

//     )
// }

// export default Dashboard



































import HorizontalBarChart from "../../components/HorizontalBarChart"
import LineChart from "../../components/LineChart"

const Dashboard = () => {

    return (
        <div className="dashboard">
            <div style={{width: "100%"}}>
                <HorizontalBarChart />
            </div>
            <div style={{width: "100%"}}>
                <LineChart />
            </div>
        </div>

    )
}

export default Dashboard