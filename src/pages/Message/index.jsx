
import { useState } from 'react'


const Message = () => {

    const [trigger, setTrigger] = useState()
    const [channel, setChannel] = useState()
    const [timer, setTimer] = useState()
    const [message, setMessage] = useState()

    return (
        <>
            <div className="list-container">
                <div>
                    <h1 className="body-title">Mensagens</h1>
                    <button>Voltar</button>
                    <button>Cadastrar</button>
                </div>
                <div className="message-container">
                    <div>
                        <label for="trigger">Gatilho:</label>
                        <input
                            type="text"
                            id="trigger"
                            name="trigger"
                            value={trigger}
                            onChange={(e) => setTrigger(e.target.value)}
                        />

                        <label for="channel">Canal:</label>
                        <input
                            type="text"
                            id="channel"
                            name="channel"
                            value={channel}
                            onChange={(e) => setChannel(e.target.value)}
                        />

                        <label for="timer">Timer:</label>
                        <input
                            type="text"
                            id="timer"
                            name="timer"
                            value={timer}
                            onChange={(e) => setTimer(e.target.value)}
                        />
                    </div>
                    <div>
                        <label for="message">Mensagem:</label>
                        <textarea
                            id="message"
                            name="message"
                            rows="10"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Message;
