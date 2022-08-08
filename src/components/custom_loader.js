import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '../services/theme'

export default function CustomLoader({ loading }) {
    return (
        loading
            ? <View style={{ ...styles.loaderStyle }}>
                <ActivityIndicator size={50} color={COLORS.primary} />
            </View>
            : <></>
    )
}


const styles = StyleSheet.create({
    loaderStyle: {
        backgroundColor: 'transparent',
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
})
