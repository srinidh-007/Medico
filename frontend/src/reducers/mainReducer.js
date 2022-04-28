let initialState = {
    loginSuccess: false,
    blocks : {},
}

function CounterReducer(state=initialState, action){


    switch(action.type){
        
            case 'loginSuccess':
            return {
                ...state,
                loginSuccess:true,
            };
            case 'loginFail':
            return {
                ...state,
                loginSuccess:false,
            };

            default: return state

    }

/*
    if (action.type === "INCREMENT"){
        return {
            ...state,
            count : state.count + 1,
        };
    }

    if (action.type === "DECREMENT"){
        return {
            ...state,
            count : state.count - 1,
        };
    }

    if (action.type === "RESET"){
        return {
            ...state,
            count : 0,
        };
    }

    if(action.type === "loginSuccess"){
        return{
            ...state,
            loginSuccess:true,
        };
    }
    
    if(action.type === "loginFail"){
        return{
            ...state,
            loginSuccess:false,
        };
    }

*/


}

export default CounterReducer;