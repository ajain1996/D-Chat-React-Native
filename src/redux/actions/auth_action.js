import auth from '@react-native-firebase/auth';
import { EMAIL_FOUND_ERROR, EMAIL_FOUND_SUCCESS } from '../action_types/email_input_action_type';
import { LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT } from '../action_types/login_action_type';
import { SIGNUP_ERROR, SIGNUP_SUCCESS } from '../action_types/signup_action_types';
import firestore from '@react-native-firebase/firestore';

export const emailFound = (email, callback) => async dispatch => {
    try {
        auth()
            .fetchSignInMethodsForEmail(email)
            .then((emailData) => {
                dispatch({ type: EMAIL_FOUND_SUCCESS, payload: emailData });
                callback(true, emailData);
            })
            .catch((error) => {
                dispatch({
                    type: EMAIL_FOUND_ERROR,
                    payload: "Invalid login credentials"
                });
                console.log("\n\n \n\n emailFound", error)
                callback(false, error)
            });
    } catch (err) {
        dispatch({ type: EMAIL_FOUND_ERROR, payload: "Email not found" });
    }
};

export const signin = (email, password, callback) => async dispatch => {
    console.log("\n\n signin called...", email, password)
    try {
        auth()
            .signInWithEmailAndPassword(email, password)
            .then((signInResponse) => {
                console.log("\n\n signin success...")
                dispatch({ type: LOGIN_SUCCESS, payload: signInResponse });
                callback(true, signInResponse);
            })
            .catch((error) => {
                console.log("\n\n signin failed...", error)
                dispatch({
                    type: LOGIN_ERROR,
                    payload: "Invalid login credentials"
                });
                callback(false, error);
            });
    } catch (err) {
        dispatch({ type: LOGIN_ERROR, payload: "Invalid login credentials" });
        callback(false, err);
    }
};

export const signup = (email, password, name, callback) => async dispatch => {
    try {
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(dataBeforeEmail => {
                dispatch({ type: SIGNUP_SUCCESS, payload: dataBeforeEmail });
                firestore().collection('users').doc(dataBeforeEmail.user.uid).set({
                    fullName: name,
                    email: email,
                });
                callback(true, dataBeforeEmail);
            })
            .then(dataAfterEmail => {
                auth().onAuthStateChanged(function (user) {
                    dispatch({
                        type: SIGNUP_SUCCESS,
                        payload:
                            "Your account was successfully created! Now you need to verify your e-mail address, please go check your inbox."
                    });
                    callback(true, dataAfterEmail);
                });
            })
            .catch(function (error) {
                dispatch({
                    type: SIGNUP_ERROR,
                    payload:
                        "Something went wrong, we couldn't create your account. Please try again."
                });
                callback(false, error);
            });
    } catch (err) {
        dispatch({
            type: SIGNUP_ERROR,
            payload:
                "Something went wrong, we couldn't create your account. Please try again."
        });
        callback(false, err);
    }
};

export const logout = (callback) => (dispatch) => {
    return auth().signOut()
        .then((response) => {
            if (response.status === "success") {
                dispatch({
                    type: LOGOUT,
                    payload: "User logged out successfully!"
                });
                callback(true, response);
                Promise.resolve();
                return response;
            } else {
                callback(false, response)
            }
        })
        .catch((error) => {
            callback(false, error)
        });
};