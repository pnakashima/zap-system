import { useState, useEffect } from "react";
import api from "../../services/api";

const MessageFields = (props) => {

    const { isMessagePage, title,
        funcButton1, labelButton1,
        funcButton2, labelButton2,
        triggerValue, channelValue, timerValue, messageValue,
        handleTrigger, handleChannel, handleTimer, handleMessage
    } = props

    const [triggers, setTriggers] = useState([])
    const [channels, setChannels] = useState([])

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

    return (
        <>
            <form>
                <div className="message-top-container">
                    <h1 className="body-title">{title}</h1>
                    <span>
                        <button onClick={funcButton1}>{labelButton1}</button>
                        <button onClick={funcButton2}>{labelButton2}</button>
                    </span>
                </div>

                <div className="message-filter-container">
                    <div className="message-filter-item">
                        <label htmlFor="trigger">Gatilho:</label><br />
                        <select id="trigger" name="trigger" onChange={(e) => handleTrigger(e.target.value)} value={triggerValue}>
                            <option value="" ></option>
                            {triggers.map((el) => <option key={el.id} value={el.name}>{el.name}</option>)}
                        </select>
                    </div>
                    <div className="message-filter-item">
                        <label htmlFor="channel">Canal:</label><br />
                        <select id="channel" name="channel" onChange={(e) => handleChannel(e.target.value)} value={channelValue}>
                            <option value=""></option>
                            {channels.map((el) => <option key={el.id} value={el.name}>{el.name}</option>)}
                        </select>
                    </div>
                    <div className="message-filter-item">
                        <label htmlFor="timer">Timer:</label><br />
                        <input type="text" id="timer" name="timer" onChange={(e) => handleTimer(e.target.value)} value={timerValue} />
                    </div>
                </div>

                {(isMessagePage) &&
                    <div className="message-body-container">
                        <label htmlFor="message">Mensagem:</label><br />
                        <textarea
                            id="message"
                            name="message"
                            rows="10"
                            value={messageValue}
                            onChange={(e) => handleMessage(e.target.value)}
                        />
                    </div>
                }
            </form>
        </>
    )
}

export default MessageFields
