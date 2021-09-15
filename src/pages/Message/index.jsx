
import { useState } from 'react'
import { useHistory } from 'react-router'
import api from '../../services/api'
import * as yup from 'yup'
import Swal from 'sweetalert2'
import MessageFields from '../../components/MessageFields'
import { addMessage } from '../../store/modules/appData/actions'
import { useDispatch } from 'react-redux'

const Message = () => {

    const [timerValue, setTimerValue] = useState("")
    const [messageValue, setMessageValue] = useState("")
    const [triggerValue, setTriggerValue] = useState("")
    const [channelValue, setChannelValue] = useState("")

    const history = useHistory()

    const dispatch = useDispatch()

    const schema = yup.object().shape({
        trigger: yup.string().required('Campo "Gatilho" obrigatório. '),
        channel: yup.string().required('Campo "Canal" obrigatório. '),
        timer: yup.number().required('Campo "Timer" obrigatório. ').typeError('Campo "Timer" inválido. ').positive('Campo "Timer" inválido. ').integer('Campo "Timer" inválido. '),
        message: yup.string().required('Campo "Mensagem" obrigatório. '),
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const body = {
            "id": Math.floor((1 + Math.random()) * 0x1000000).toString(16),
            "channel": channelValue,
            "trigger": triggerValue,
            "timer": timerValue,
            "message": messageValue
        }

        try {
            const isValid = await schema.validate(body, { abortEarly: false })
            console.log("isValid", isValid)
            postMessage(body)
            openSuccessModal()
            // dispatch(addMessage(body))
        } catch (error) {
            console.log(error)
            const errorMessage = error.inner.reduce((errorMessage, err) => errorMessage + (err.message + "<br>"), "")
            openErrorModal("Erro", errorMessage)
        }

    }

    const openErrorModal = (title, message, icon) => {
        Swal.fire({
            title: title,
            html: message,
            confirmButtonText: 'OK',
            confirmButtonColor: "#0b1a72",
            icon: icon,
            buttonsStyling: false,
        })
    }

    const openSuccessModal = (title, message, icon) => {
        Swal.fire({
            title: 'Mensagem cadastrada!\nDeseja cadastrar outra mensagem?',
            showDenyButton: true,
            confirmButtonText: 'Sim',
            confirmButtonColor: "#0b1a72",
            denyButtonText: 'Não',
            denyButtonColor: "#0b1a72",
            buttonsStyling: false,
        }).then((result) => {
            if (result.isConfirmed) {
                //history.go(0)
                setTriggerValue("")
                setChannelValue("")
                setTimerValue("")
                setMessageValue("")
            } else if (result.isDenied) {
                history.push('/list')
            }
        })
    }

    const postMessage = async (body) => await api.post('/messages', body)

    return (
        <>
            <MessageFields
                isMessagePage={true}
                title={"Nova Mensagem"}
                labelButton1={"Voltar"}
                funcButton1={() => history.push('/list')}
                labelButton2={"Cadastrar"}
                funcButton2={handleSubmit}
                triggerValue={triggerValue}
                channelValue={channelValue}
                timerValue={timerValue}
                messageValue={messageValue}
                handleTrigger={setTriggerValue}
                handleChannel={setChannelValue}
                handleTimer={setTimerValue}
                handleMessage={setMessageValue}
            />
        </>
    );
}

export default Message;
