import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import BottomTabs from "../services/bottom_tabs";

export default function AppNavigation() {
    const Stack = createStackNavigator();

    const screenOptions = {
        headerShown: false,
    };

    return (
        <>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Root"
                    screenOptions={screenOptions}
                >
                    <Stack.Screen name="Root" component={BottomTabs} />
                    <Stack.Screen name="HomeScreen" component={HomeScreen} />
                    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
                    <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}