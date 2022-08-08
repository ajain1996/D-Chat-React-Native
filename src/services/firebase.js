import React, { useState, useEffect, createContext } from 'react';
import auth from '@react-native-firebase/auth';
import { Provider as ReduxProvider } from "react-redux";
import AppNavigation from '../navigation/AppNavigation';
import store from '../redux/store';
import AuthNavigation from '../navigation/AuthNavigation';

const Routes = () => {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState(null);

    const onAuthStateChanged = (userData) => {
        setUser(userData);
        if (initializing) setInitializing(false);
    };

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    if (initializing) return null;

    return (
        <ReduxProvider store={store}>
            {user !== null ? <AppNavigation /> : <AuthNavigation />}
        </ReduxProvider>
    );
};

export default Routes;