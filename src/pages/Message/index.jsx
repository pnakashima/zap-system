
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import api from '../../services/api'

const Message = () => {

    const [triggers, setTriggers] = useState([])
    const [channels, setChannels] = useState([])
    const [timer, setTimer] = useState("")
    const [message, setMessage] = useState("")
    const [triggerValue, setTriggerValue] = useState("")
    const [channelValue, setChannelValue] = useState("")

    const history = useHistory()

    const getInfo = async () => {
        try {
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

    const postMessage = async () => {
        const body = {
            "id": Math.floor((1 + Math.random()) * 0x1000000).toString(16),
            "channel": channelValue,
            "trigger": triggerValue,
            "timer": timer,
            "message": message
        }
        console.log(body)
        const response = await api.post('/messages', body)
        console.log(response)
    }

    return (
        <>

            <div className="message-top-container">
                <h1 className="body-title">Mensagens</h1>
                <span>
                    <button onClick={() => history.push('/list')}>Voltar</button>
                    <button onClick={postMessage}>Cadastrar</button>
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
                    <input type="text" id="timer" name="timer" onChange={(e) => setTimer(e.target.value)} />
                </div>
            </div>

            <div className="message-body-container">
                <label htmlFor="message">Mensagem:</label><br />
                <textarea
                    id="message"
                    name="message"
                    rows="10"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </div>

        </>
    );
}

export default Message;
