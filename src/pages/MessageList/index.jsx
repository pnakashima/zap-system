import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import api from "../../services/api";
import Swal from 'sweetalert2'
import MessageFields from "../../components/MessageFields";
import { useSelector } from "react-redux";

const MessageList = () => {

    const [triggerValue, setTriggerValue] = useState("")
    const [channelValue, setChannelValue] = useState("")
    const [timerValue, setTimerValue] = useState("")
    const [messages, setMessages] = useState([])

    const history = useHistory()
    const refPageTop = useRef(null)

    // const getInfo = async () => {
    //     try {
    //         const messages = await api.get('/messages')
    //         setMessages(messages.data)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // useEffect(() => {
    //     getInfo()
    // }, [])

    const storeMessages = useSelector((state) => state.appData.messages)

    useEffect(() => {
        setMessages(storeMessages)
    }, [storeMessages])
    

    const showMessage = (message) => {
        Swal.fire({
            title: 'Mensagem',
            text: message,
            confirmButtonText: 'Ok',
            confirmButtonColor: "#0b1a72"
        })
    }

    const search = async (e) => {
        e.preventDefault()
        let query = `/messages?trigger_like=${triggerValue}&channel_like=${channelValue}&timer_like=${timerValue}`
        const response = await api.get(query)
        setMessages(response.data)
    }

    return (
        <div ref={refPageTop}>
            <MessageFields
                isMessagePage={false}
                title={"Mensagens"}
                labelButton1={"Pesquisar"}
                funcButton1={search}
                labelButton2={"Nova Mensagem"}
                funcButton2={() => history.push("/message")}
                triggerValue={triggerValue}
                channelValue={channelValue}
                timerValue={timerValue}
                handleTrigger={setTriggerValue}
                handleChannel={setChannelValue}
                handleTimer={setTimerValue}
            />

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
                                <td><button onClick={() => showMessage(el.message)} >Ver mensagem</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <button
                style={{ display: "flex", margin: "10px auto" }}
                onClick={() => { window.scrollTo(0, refPageTop.current.offsetTop) }}
            >
                Voltar ao topo
            </button>
        </div>
    );
}

export default MessageList;




