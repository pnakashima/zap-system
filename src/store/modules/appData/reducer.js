const INITIAL_STATE = {
    messages: [],
    channels: [],
    triggers: []
}


const appData = (state = INITIAL_STATE, action) => {
    console.log("reducer action", action)

    switch (action.type) {
        case 'ADD_MESSAGE':
            console.log("state", state)
            return {
                ...state,
                messages: [
                    ...state.messages,
                    action.payload.message 
                ]
            }
        default:
            return state
    }


}

export default appData