import types from "../types"

let init_state = {
    userData: null,
    isLoading : false,
    isError: false,
    products:[]
}

export default function (state = init_state, action) {
    switch (action.type) {
        case types.LOADING_START:{
            return { ...state, isLoading:true }
        }
        case types.LOGIN: {
           let data = action.payload
            return { ...state, isLoading:false , isError: false, userData: data }
        }
        case types.LOGOUT: {
             return { ...state, isLoading:false , isError: false, userData: null }
         }
        case types.ERROR:{
            return { ...state, isError:true }
        }
        case types.GET_USER_PRODUCTS:{
            let data = action.payload
            return { ...state, isLoading:false , isError: false, products: data }
        }
        case types.SIGNUP: {
            let data = action.payload
            return { ...state, userData: data }
        }
        default:
            return {...state}
    }
}