// {
//     "id": "117f8e8",
//     "channel": "whatsapp",
//     "trigger": "abertura_conta",
//     "timer": "333",
//     "message": "Lorem ipsum dolor sit amet",
// },



export const addMessage = (message) => {
    console.log("action message", message)
    return {
        type: 'ADD_MESSAGE',
        payload: { message },
    }
}

export const loadInfo = (info) => {
    return {
        type: 'LOAD_INFO',
        payload: { info },
    }
}
