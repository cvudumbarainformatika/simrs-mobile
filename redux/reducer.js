import { combineReducers } from "redux";

stateRegister = {
    nip: '',
    tgllahir: ''
}

stateLogin = {
    nip: '',
    password:''
}


const registerReducer = (state = stateRegister, action) => {
    return state;
}
const loginReducer = (state = stateLogin, action) => {
    return state;
}

const reducer = combineReducers({
    registerReducer, loginReducer
})

export default reducer