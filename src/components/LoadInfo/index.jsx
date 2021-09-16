import api from '../../services/api';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadInfo } from '../../store/modules/appData/actions';

const LoadInfo = () => {
    const [info, setInfo] = useState({})

    const dispatch = useDispatch()

    const getInfo = async () => {
        try {
            const triggers = await api.get('/triggers')
            const channels = await api.get('/channels')
            const messages = await api.get('/messages')
            const info = {
                triggers: triggers.data,
                channels: channels.data,
                messages: messages.data
            }
            setInfo(info)
            //console.log("getInfo", info)
        } catch (error) {
            //console.log("LoadInfo:", error)
        }
    }

    useEffect(() => {
        //console.log("LoadInfo useEffect")
        getInfo()
    }, [])

    dispatch(loadInfo(info))

    return (
        <>
        </>
    )
}

export default LoadInfo