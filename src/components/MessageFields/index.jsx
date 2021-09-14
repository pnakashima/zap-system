import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import api from "../../services/api";
import Swal from 'sweetalert2'

const MessageFields = ({isMessagePage}) => {

    const [triggers, setTriggers] = useState([])
    const [channels, setChannels] = useState([])
    const [timer, setTimer] = useState("")
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState("")
    const [triggerValue, setTriggerValue] = useState("")
    const [channelValue, setChannelValue] = useState("")
    const [timerValue, setTimerValue] = useState("")

    const getInfo = async () => {
        try {
            const triggers = await api.get('/triggers')
            setTriggers(triggers.data)
            const channels = await api.get('/channels')
            setChannels(channels.data)
            // const messages = await api.get('/messages')
            // setMessages(messages.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getInfo()
    }, [])

    return (
        <>
            <div className="message-filter-container">
                <div className="message-filter-item">
                    <label htmlFor="trigger">Gatilho:</label><br />
                    <select id="trigger" name="trigger" onChange={(e) => setTriggerValue(e.target.value)} value={triggerValue}>
                        <option value="" ></option>
                        {triggers.map((el) => <option key={el.id} value={el.name}>{el.name}</option>)}
                    </select>
                    {/* {errorMessages['trigger']} */}
                </div>
                <div className="message-filter-item">
                    <label htmlFor="channel">Canal:</label><br />
                    <select id="channel" name="channel" onChange={(e) => setChannelValue(e.target.value)} value={channelValue}>
                        <option value=""></option>
                        {channels.map((el) => <option key={el.id} value={el.name}>{el.name}</option>)}
                    </select>
                    {/* {errorMessages['channel']} */}
                </div>
                <div className="message-filter-item">
                    <label htmlFor="timer">Timer:</label><br />
                    <input type="text" id="timer" name="timer" onChange={(e) => setTimer(e.target.value)} />
                    {/* {errorMessages['timer']} */}
                </div>
            </div>

            { (isMessagePage) &&
                <div className="message-body-container">
                <label htmlFor="message">Mensagem:</label><br />
                <textarea
                    id="message"
                    name="message"
                    rows="10"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                {/* {errorMessages['message']} */}
            </div>
            }
            
        </>
    )
}

export default MessageFields
