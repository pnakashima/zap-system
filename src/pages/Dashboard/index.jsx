import HorizontalBarChart from "../../components/HorizontalBarChart"
import LineChart from "../../components/LineChart"


const Dashboard = () => {

    return (
        <div className="dashboard">
            <div className="graph-area">
                <HorizontalBarChart />
            </div>
            <div className="graph-area">
                <LineChart />
            </div>
        </div>

    )
}

export default Dashboard