import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { windowHeight } from '../services/utils'

export default function HomeScreen() {
    return (
        <View style={{ backgroundColor: '#fff' }}>
            <View style={{ ...styles.headerBlock }}>
                <Text style={{ fontSize: 18, color: '#000', fontWeight: '700' }}>Home</Text>
            </View>
            <View style={{ ...styles.bodyBlock }}>
                <Image
                    source={require("../../assets/images/in_progress.png")}
                    resizeMode="contain"
                    style={{ width: '80%', height: 300 }}
                />
                <Text style={{ fontSize: 26, color: '#000' }}>Currently In Development</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerBlock: {
        width: '100%',
        height: 56,
        elevation: 8,
        shadowColor: '#999',
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingHorizontal: 20,
        borderBottomColor: '#dcdcdc',
        borderBottomWidth: 1,
    },
    bodyBlock: {
        width: '100%',
        height: windowHeight,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    }
})