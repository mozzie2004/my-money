const countsLoaded = (counts)=>{
    return {
        type: 'COUNTS-LOADED',
        payload: counts
    }
}

const addUser = (user)=>{
    return {
        type: 'ADD-USER',
        payload: user
    }
}

const removeUser = ()=>{
    return {
        type: 'REMOVE-USER'
    }
}

const addNewCount = (count)=>{
    return {
        type: 'ADD-NEW-COUNT',
        payload: count
    }
}

const addErrorLogin = (boolen)=>{
    return {
        type: 'ADD-ERROR-LOGIN',
        payload: boolen
    }
}

const addErrorLoginMessage = (message)=>{
    return {
        type: 'ADD-ERROR-LOGIN-MESSAGE',
        payload: message
    }
}

export {
    countsLoaded,
    addUser,
    removeUser,
    addNewCount,
    addErrorLogin,
    addErrorLoginMessage
}