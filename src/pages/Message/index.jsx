
import { useState } from 'react'
import { useHistory } from 'react-router'


const Message = () => {

    const [trigger, setTrigger] = useState()
    const [channel, setChannel] = useState()
    const [timer, setTimer] = useState()
    const [message, setMessage] = useState()

    const history = useHistory()

    return (
        <>

            <div className="message-top-container">
                <h1 className="body-title">Mensagens</h1>
                <span>
                    <button onClick={() => history.push('/list')}>Voltar</button>
                    <button>Cadastrar</button>
                </span>
            </div>

            <div className="message-list-filter-container">
                <div className="message-filter-item">
                    <label htmlFor="trigger">Gatilho:</label>
                    <input
                        type="text"
                        id="trigger"
                        name="trigger"
                        value={trigger}
                        onChange={(e) => setTrigger(e.target.value)}
                    />
                </div>
                <div className="message-filter-item">
                    <label htmlFor="channel">Canal:</label>
                    <input
                        type="text"
                        id="channel"
                        name="channel"
                        value={channel}
                        onChange={(e) => setChannel(e.target.value)}
                    />
                </div>
                <div className="message-filter-item">
                    <label htmlFor="timer">Timer:</label>
                    <input
                        type="text"
                        id="timer"
                        name="timer"
                        value={timer}
                        onChange={(e) => setTimer(e.target.value)}
                    />
                </div>
            </div>

            <div className="message-body-container">
                <label htmlFor="message">Mensagem:</label><br/>
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
