import Icon from 'react-native-vector-icons/AntDesign'
import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { COLORS } from '../Constant/Color'
import { FONTS } from '../Constant/Font'
import Auth from '../../Service/Auth'
import { useDispatch } from 'react-redux'
import { removeUser } from '../../Redux/reducer/user'

const HomeHeader = ({ userData }) => {

    const dispatch = useDispatch();

    const handleLogout = async () => {
        Auth.logout().then(() => {
            dispatch(removeUser([]));
        })
    }

    return (
        <View style={styles.main}>
            <Text style={styles.logo}>{userData.name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableWithoutFeedback
                    onPress={handleLogout}
                >
                    <Icon
                        name="logout"
                        type="AntDesign"
                        size={24}
                        style={{ color: COLORS.theme, marginRight: 30 }}
                    />
                </TouchableWithoutFeedback>
                <Avatar
                    source={{ uri: userData.img }}
                    rounded
                    size="small" />
            </View>
        </View>
    )
}

export default HomeHeader;

const styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15, height: 60,
        backgroundColor: COLORS.white,
    },
    logo: {
        fontFamily: FONTS.Bold,
        color: COLORS.theme,
        fontSize: 22,
    },
})
