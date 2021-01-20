import dbDefault from '../db-default';
let initialState = {
   counts: [],
   operations: [],
   groupe: [],
   curentUser: null,
   loading: {
       loadingCounts: true,
       loadingOperation: false
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
                loading: {...state.loading, loadingCounts: false},
                counts: action.payload
            }
        case 'COUNTS-REQUESTED':
            return {
                ...state,
                loading: {...state.loading, loadingCounts: true}
            }

        case 'OPERATIONS-LOADED':
            return {
                ...state,
                operations: action.payload,
                loading: {...state.loading, loadingOperation: false}
            }
        case 'OPERATIONS-REQUESTED':
            return {
                ...state,
                loading: {...state.loading, loadingOperation: true}
            }

        case 'ADD-NEW-OPERATIONS':
            return {
                ...state,
                operations: [...state.operations, action.payload]
            }

        case 'GROUPES-LOADED':
            return {
                ...state,
                groupe: action.payload
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

        case 'ADD-NEW-COUNT-OPERATION':
            const index = state.counts.findIndex(item=>item.id === action.id)
            const newItem = {...state.counts[index], sum: state.counts[index].sum + action.payload};
            return {
                ...state,
                counts: [...state.counts.slice(0, index), newItem, ...state.counts.slice(index+1)]
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