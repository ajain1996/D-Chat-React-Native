import AsyncStorage from "@react-native-async-storage/async-storage";
import { FETCH_PROFILE_ERROR, FETCH_PROFILE_SUCCESS } from "../action_types/profile_sction_types";

const initialState = { isLoading: false, user: null };

export default profile_reducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case FETCH_PROFILE_SUCCESS:
            return {
                ...state,
                isLoading: true,
                user: payload,
            };
        case FETCH_PROFILE_ERROR:
            return {
                ...state,
                isLoading: false,
                user: null,
            };
        default:
            return state;
    }
};