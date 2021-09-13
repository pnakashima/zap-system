import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import Modal from "../Modal";
import api from "../../services/api";


const MessageList = () => {

    const [showModal, setShowModal] = useState(false);
    const [triggers, setTriggers] = useState([])
    const [channels, setChannels] = useState([])
    const [messages, setMessages] = useState([])
    const [displayMessage, setDisplayMessage] = useState("")
    const [triggerValue, setTriggerValue] = useState("")
    const [channelValue, setChannelValue] = useState("")

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
        console.log("modal", message)
        setDisplayMessage(message)
        setShowModal(true)
    }

    const search = async () => {
        console.log("search", triggerValue, channelValue)
        let query = ""
        if (triggerValue) {
            if (channelValue) {
                query = `/messages?trigger=${triggerValue}&channel=${channelValue}`
            } else {
                query = `/messages?trigger=${triggerValue}`
            }
        } else if (channelValue) {
            query = `/messages?channel=${channelValue}`
        } else {
            const messages = await api.get('/messages')
            setMessages(messages.data)
            return
        }
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
                    <input type="text" id="timer" name="timer" />
                </div>
            </div>

            <div>
                <table border="1" id="message-list-table">
                    <tbody>
                        <tr>
                            <th>Gatilho</th>
                            <th>Canal</th>
                            <th>Tempo</th>
                            <th>Ações</th>
                        </tr>
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

            <div id="portal"></div>

            {showModal ? <Modal setShowModal={setShowModal} message={displayMessage} /> : null}





        </>
    );
}

export default MessageList;




