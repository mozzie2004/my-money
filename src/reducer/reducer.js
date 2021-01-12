let initialState = {
   counts: [],
   curentUser: null,
   error: {
       errorLogin: false
   },
   errorMessage: {
       messageLogin: ''
   }
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case 'COUNTS-LOADED':
            return {
                ...state,
                counts: action.payload
            }
        
        case 'ADD-USER':
            return {
                ...state,
                curentUser: action.payload
            }

        case 'REMOVE-USER':
            return {
                ...state,
                curentUser: null
            }

        case 'ADD-NEW-COUNT':
            return {
                ...state,
                counts: [...state.counts, action.payload]
            }

        case 'ADD-ERROR-LOGIN':
            return {
                ...state,
                error: {...state.error, errorLogin: action.payload}
            }

        case 'ADD-ERROR-LOGIN-MESSAGE':
            return {
                ...state,
                errorMessage: {...state.errorMessage, messageLogin: action.payload}
            }
              
        default:
            return {
                ...state
            }
    }
}

export default reducer;