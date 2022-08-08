import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'

export default function RenderMessageImgComponent({ item, sender }) {
    return (
        <View style={{ alignItems: !sender ? 'flex-start' : 'flex-end' }}>
            <TouchableOpacity>
                <Image
                    source={{ uri: item.image }}
                    style={styles.imgStyle}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    imgStyle: {
        width: 250, height: 250, borderRadius: 9,
        borderWidth: 4, margin: 10, borderColor: "green"
    }
})
