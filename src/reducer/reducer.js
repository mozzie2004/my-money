import dbDefault from '../db-default';
let initialState = {
   counts: [],
   curentUser: null,
   loading: {
       loadingCounts: false
   },
   error: {
       errorLogin: false
   },
   errorMessage: {
       messageLogin: ''
   },
   ...dbDefault
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

        case 'LOADING-COUNTS':
            return {
                ...state,
                loading: {...state.loading, loadingCounts: action.payload}
            }

              
        default:
            return {
                ...state
            }
    }
}

export default reducer;