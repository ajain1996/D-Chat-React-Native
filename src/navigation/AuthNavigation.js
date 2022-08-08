import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import EmailInputScreen from '../screens/EmailInputScreen';
import RegisterScreen from "../screens/RegisterScreen";

export default function AuthNavigation() {
    const Stack = createStackNavigator();

    const screenOptions = {
        headerShown: false,
    };

    return (
        <>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="EmailInputScreen"
                    screenOptions={screenOptions}
                >
                    <Stack.Screen name="EmailInputScreen" component={EmailInputScreen} />
                    <Stack.Screen name="LoginScreen" component={LoginScreen} />
                    <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}