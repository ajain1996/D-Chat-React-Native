import AsyncStorage from "@react-native-async-storage/async-storage";
import { SIGNUP_ERROR, SIGNUP_SUCCESS } from "../action_types/signup_action_types";

const initialState = { isLoading: false, userData: null };

export default signup_reducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isLoading: true,
                userData: payload,
            };
        case SIGNUP_ERROR:
            return {
                ...state,
                isLoading: false,
                userData: null,
            };
        default:
            return state;
    }
};