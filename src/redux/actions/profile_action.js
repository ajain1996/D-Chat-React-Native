import firestore from '@react-native-firebase/firestore';
import { FETCH_PROFILE_ERROR, FETCH_PROFILE_SUCCESS } from '../action_types/profile_sction_types';

export const fetchProfileDataFromFirestore = (userId, callback) => async dispatch => {
    try {
        firestore()
            .collection("users")
            .doc(userId)
            .get()
            .then(querySnapshot => {
                dispatch({ type: FETCH_PROFILE_SUCCESS });
                callback(true, querySnapshot);
            })
            .catch((error) => {
                dispatch({
                    type: FETCH_PROFILE_ERROR,
                    payload:
                        "Something went wrong, we couldn't create your account. Please try again."
                });
                callback(false, error);
            });
    } catch (err) {
        dispatch({
            type: FETCH_PROFILE_ERROR,
            payload:
                "Something went wrong, we couldn't create your account. Please try again."
        });
        callback(false, err);
    }
};