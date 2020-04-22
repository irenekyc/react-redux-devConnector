import { SET_ALERT, REMOVE_ALERT} from '../actions/types'

const initialState = [
    // {
    //     id:1,
    //     msg: "Please log",
    //     alertType: "SUCCESS"
    // }
]

export default function(state=initialState, action){
    //action consist: type and payload(data=id)
    const { type, payload } = action
    switch (type){
        case SET_ALERT:
            return [...state, payload];
            //return state , change the state, add action.payload to the state
        case REMOVE_ALERT:
            return state.filter(alert=> alert.id !== payload);
        default: 
            return state;
    }
}