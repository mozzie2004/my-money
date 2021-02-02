const countsLoaded = (counts)=>{
    return {
        type: 'COUNTS-LOADED',
        payload: counts
    }
}

const countsRequested = ()=>{
    return {
        type: 'COUNTS-REQUESTED'
    }
}

const operationsLoaded = (operations)=>{
    return {
        type: 'OPERATIONS-LOADED',
        payload: operations
    }
}

const addNewOperations = (operations)=>{
    return {
        type: 'ADD-NEW-OPERATIONS',
        payload: operations
    }
}

const operationsRequested = ()=>{
    return {
        type: 'OPERATIONS-LOADED'
    }
}

const groupesLoaded = (groupes)=>{
    return {
        type: 'GROUPES-LOADED',
        payload: groupes
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

const addNewGroupe = (groupe)=>{
    return {
        type: 'ADD-NEW-GROUPE',
        payload: groupe
    }
}

const addNewCountOperation = (id, sum)=>{
    return {
        type: 'ADD-NEW-COUNT-OPERATION',
        payload: sum,
        id
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
    addErrorLoginMessage,
    countsRequested,
    operationsLoaded,
    operationsRequested,
    groupesLoaded,
    addNewOperations,
    addNewCountOperation,
    addNewGroupe
}