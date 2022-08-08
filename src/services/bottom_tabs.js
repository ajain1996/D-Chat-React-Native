import React from "react";
import { StyleSheet, View } from 'react-native';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { COLORS } from "./theme";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                showLabel: false,
                tabBarLabel: "",
                tabBarStyle: {
                    position: 'absolute',
                    backgroundColor: COLORS.white,
                    borderRadius: 0,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopStartRadius: 8,
                    borderTopEndRadius: 8,
                }
            }}
        >
            <Tab.Screen
                name="HomeTab"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <BuildTabComponent
                                image={"home"}
                                text="Home"
                                focused={focused}
                            />
                        );
                    }
                }}
            />
            <Tab.Screen
                name="SettingsTab"
                component={SettingsScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <BuildTabComponent
                                image={"search"}
                                text="Settings"
                                focused={focused}
                            />
                        );
                    }
                }}
            />
            <Tab.Screen
                name="ProfileTab"
                component={ProfileScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <BuildTabComponent
                                image={"user"}
                                text="Profile"
                                focused={focused}
                            />
                        );
                    }
                }}
            />
        </Tab.Navigator>
    );
}

const BuildTabComponent = ({ image, text, focused }) => {
    return (
        <View style={{ height: 50, marginBottom: -15 }}>
            <View style={{
                borderColor: focused ? COLORS.primary : "transparent",
                borderTopWidth: 2, paddingTop: 10, width: 60,
                alignItems: 'center',
            }}>
                <FontAwesome5Icon
                    name={image}
                    size={focused ? 22 : 20}
                    color={focused ? COLORS.primary : "#323233"}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#7F5DF0",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
});

export default BottomTabs;