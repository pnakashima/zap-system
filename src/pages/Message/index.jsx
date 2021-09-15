
import { useState } from 'react'
import { useHistory } from 'react-router'
import api from '../../services/api'
import * as yup from 'yup'
import Swal from 'sweetalert2'
import MessageFields from '../../components/MessageFields'
import { addMessage } from '../../store/modules/appData/actions'
import { useDispatch } from 'react-redux'

const Message = () => {

    const [timer, setTimer] = useState("")
    const [message, setMessage] = useState("")
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
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                history.go(0)
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
                funcButton1={() => history.push('/list')}
                labelButton1={"Voltar"}
                funcButton2={handleSubmit}
                labelButton2={"Cadastrar"}
                triggerValue={triggerValue}
                channelValue={channelValue}
                timer={timer}
                message={message}
                handleTrigger={setTriggerValue}
                handleChannel={setChannelValue}
                handleTimer={setTimer}
                handleMessage={setMessage}
            />
        </>
    );
}

export default Message;
