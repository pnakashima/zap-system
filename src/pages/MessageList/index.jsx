import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import api from "../../services/api";
import Swal from 'sweetalert2'
import MessageFields from "../../components/MessageFields";

const MessageList = () => {

    const [triggers, setTriggers] = useState([])
    const [channels, setChannels] = useState([])
    const [messages, setMessages] = useState([])
    const [triggerValue, setTriggerValue] = useState("")
    const [channelValue, setChannelValue] = useState("")
    const [timerValue, setTimerValue] = useState("")

    const history = useHistory()

    const getInfo = async () => {
        try {
            const triggers = await api.get('/triggers')
            setTriggers(triggers.data)
            const channels = await api.get('/channels')
            setChannels(channels.data)
            const messages = await api.get('/messages')
            setMessages(messages.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getInfo()
    }, [])


    const openModal = (message) => {
        Swal.fire({
            title: 'Mensagem',
            text: message,
            confirmButtonText: 'Ok',
            confirmButtonColor: "#0b1a72"
        })
    }

    const search = async () => {
        let query = `/messages?trigger_like=${triggerValue}&channel_like=${channelValue}&timer_like=${timerValue}`
        console.log(query)
        const response = await api.get(query)
        console.log("search results", response.data)
        setMessages(response.data)
    }


    return (
        <>
            <div className="message-list-top-container">
                <h1 className="body-title">Mensagens</h1>
                <span>
                    <button onClick={search}>Pesquisar</button>
                    <button onClick={() => history.push("/message")}>Nova Mensagem</button>
                </span>
            </div>

            {/* <MessageFields isMessagePage={false} /> */}

            <div className="message-filter-container">
                <div className="message-filter-item">
                    <label htmlFor="trigger">Gatilho:</label><br />
                    <select id="trigger" name="trigger" onChange={(e) => setTriggerValue(e.target.value)} value={triggerValue}>
                        <option value="" ></option>
                        {triggers.map((el) => <option key={el.id} value={el.name}>{el.name}</option>)}
                    </select>
                </div>
                <div className="message-filter-item">
                    <label htmlFor="channel">Canal:</label><br />
                    <select id="channel" name="channel" onChange={(e) => setChannelValue(e.target.value)} value={channelValue}>
                        <option value=""></option>
                        {channels.map((el) => <option key={el.id} value={el.name}>{el.name}</option>)}
                    </select>
                </div>
                <div className="message-filter-item">
                    <label htmlFor="timer">Timer:</label><br />
                    <input type="text" id="timer" name="timer" onChange={(e) => setTimerValue(e.target.value)} />
                </div>
            </div>

            <div>
                <table border="1" id="message-list-table">
                    <thead>
                        <tr>
                            <th>Gatilho</th>
                            <th>Canal</th>
                            <th>Tempo</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.map((el, key) =>
                            <tr key={key}>
                                <td>{el.trigger}</td>
                                <td>{el.channel}</td>
                                <td>{el.timer}</td>
                                <td><button onClick={() => openModal(el.message)} >Ver mensagem</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default MessageList;




