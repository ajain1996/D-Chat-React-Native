import { LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT } from "../action_types/login_action_type";

const initialState = { isLoading: false, userData: null };

export default login_reducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: true,
                userData: payload,
            };
        case LOGIN_ERROR:
            return {
                ...state,
                isLoading: false,
                userData: null,
            };
        case LOGOUT:
            return {
                ...state,
                isLoading: false,
                userData: null,
            };
        default:
            return state;
    }
};