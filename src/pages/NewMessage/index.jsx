
import { useState } from 'react'
import { useHistory } from 'react-router'
import api from '../../services/api'
import * as yup from 'yup'
import Swal from 'sweetalert2'
import MessageFields from '../../components/MessageFields'
import { addMessage } from '../../store/modules/appData/actions'
import { useDispatch } from 'react-redux'

const NewMessage = () => {

    const [timerValue, setTimerValue] = useState("")
    const [messageValue, setMessageValue] = useState("")
    const [triggerValue, setTriggerValue] = useState("")
    const [channelValue, setChannelValue] = useState("")

    const history = useHistory()

    const dispatch = useDispatch()

    const schema = yup.object().shape({
        trigger: yup.string().required('Escolha um Gatilho'),
        channel: yup.string().required('Escolha um Canal'),
        timer: yup.number().required()
            .typeError('Digite o número de horas do Timer (apenas números)')
            .positive('Digite o número de horas do Timer (números positivos apenas)')
            .integer('Digite o número de horas do Timer (números inteiros apenas)'),
        message: yup.string().required('Digite a mensagem que será enviada ao usuário'),
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        let body = {
            "id": Math.floor((1 + Math.random()) * 0x1000000).toString(16),
            "channel": channelValue,
            "trigger": triggerValue,
            "timer": timerValue,
            "message": messageValue
        }

        try {
            const isValid = await schema.validate(body, { abortEarly: false })
            if (isValid) {
                body.timer = `${timerValue}:00`
            }
            postMessage(body)
            openSuccessModal()
            dispatch(addMessage(body))
        } catch (error) {
            console.log(error)
            const errorMessage = error.inner.reduce((errorMessage, err) => errorMessage + (err.message + "<br>"), "")
            openErrorModal("Por favor corrija os seguintes erros:", errorMessage)
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
                labelButton1={"Cadastrar"}
                funcButton1={handleSubmit}
                labelButton2={"Voltar"}
                funcButton2={() => history.push('/list')}
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

export default NewMessage;
