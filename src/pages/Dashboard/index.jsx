import HorizontalBarChart from "../../components/HorizontalBarChart"
import LineChart from "../../components/LineChart"
import PieChart from "../../components/PieChart"
import { useEffect, useState } from "react"
import api from "../../services/api"
import { useDispatch } from 'react-redux';
import { loadInfo } from '../../store/modules/appData/actions';

const Dashboard = () => {

    const [messages, setMessages] = useState([])
    const [triggers, setTriggers] = useState([])
    const [channels, setChannels] = useState([])
   
    const dispatch = useDispatch()

    const getInfo = async () => {
        try {
            const messages = await api.get('/messages')
            setMessages(messages.data)
            const triggers = await api.get('/triggers')
            setTriggers(triggers.data)
            const channels = await api.get('/channels')
            setChannels(channels.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getInfo()
    }, [])

    const info = { triggers, channels, messages }
    dispatch(loadInfo(info))

    const triggerData = messages.reduce((sums, message) => {
        sums[message.trigger] = (sums[message.trigger] || 0) + 1;
        return sums;
    }, {});

    const triggerKeys = Object.keys(triggerData)
    const triggerValues = Object.values(triggerData)

    const channelData = messages.reduce((sums, message) => {
        sums[message.channel] = (sums[message.channel] || 0) + 1;
        return sums;
    }, {});

    const channelKeys = Object.keys(channelData)
    const channelValues = Object.values(channelData)

    const timerKeys = messages.map((message) => messages.indexOf(message) + 1)
    const timerValues = messages.map((message) => parseInt(message.timer.slice(0, -3)))


    return (
        <div className="dashboard">
            <div className="graph-area" >
                <HorizontalBarChart title={"Gatilhos"} legend={"Gatilhos"} dataX={triggerKeys} dataY={triggerValues} />
            </div>
            <div className="graph-area" style={{width:"50%"}} >
                <PieChart title={"Canais"} legend={"Canais"} dataX={channelKeys} dataY={channelValues} />
            </div>
            <div className="graph-area" >
                <LineChart title={"Timers"} legend={"Timers"} dataX={timerKeys} dataY={timerValues} />
            </div>
        </div>
    )
}

export default Dashboard


