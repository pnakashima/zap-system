
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import api from '../../services/api'
import * as yup from 'yup'
import Swal from 'sweetalert2'


const Message = () => {

    const [triggers, setTriggers] = useState([])
    const [channels, setChannels] = useState([])
    const [timer, setTimer] = useState("")
    const [message, setMessage] = useState("")
    const [triggerValue, setTriggerValue] = useState("")
    const [channelValue, setChannelValue] = useState("")
    // const [errorMessages, setErrorMessages] = useState({})

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


    const schema = yup.object().shape({
        trigger: yup.string().required('Campo "Gatilho" obrigatório. '),
        channel: yup.string().required('Campo "Canal" obrigatório. '),
        timer: yup.number('Campo "Timer" inválido. ').required('Campo "Timer" obrigatório. ').positive('Campo "Timer" inválido. ').integer('Campo "Timer" inválido. '),
        message: yup.string().required('Campo "Mensagem" obrigatório. '),
    })

    const handleSubmit = async () => {
        const body = {
            "id": Math.floor((1 + Math.random()) * 0x1000000).toString(16),
            "channel": channelValue,
            "trigger": triggerValue,
            "timer": timer,
            "message": message
        }

        try {
            const isValid = await schema.validate(body, { abortEarly: false })
            console.log("isValid", isValid)
            postMessage(body)
            openModal("Mensagem cadastrada")
        } catch (error) {
            const errorMessage = error.inner.reduce((errorMessage, err) => errorMessage + (err.message + "\n"), "")
            openModal("Erro", errorMessage)

            // const errors = error.inner.reduce((acc, current) => {
            //     return {
            //         ...acc,
            //         [current.path]: current.message
            //     }
            // }, {})
            // setErrorMessages(errors)
        }

    }


    const openModal = (title, message) => {
        Swal.fire({
            title: title,
            text: message,
            confirmButtonText: 'Ok'
        })
    }

    const postMessage = async (body) => await api.post('/messages', body)



    return (
        <>

            <div className="message-top-container">
                <h1 className="body-title">Mensagens</h1>
                <span>
                    <button onClick={() => history.push('/list')}>Voltar</button>
                    <button onClick={handleSubmit}>Cadastrar</button>
                </span>
            </div>

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

        </>
    );
}

export default Message;
