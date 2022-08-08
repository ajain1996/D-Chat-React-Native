import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native'
import { COLORS } from '../services/theme'
import { windowWidth } from "../services/utils"
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { logout } from '../redux/actions/auth_action';
import Toast from 'react-native-toast-message';
import { Panel } from './LoginScreen';
import CustomLoader from '../components/custom_loader';
import { fetchProfileDataFromFirestore } from '../redux/actions/profile_action';
import auth from '@react-native-firebase/auth';

function ProfileScreen({ logout, fetchProfileDataFromFirestore }) {
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState([]);

    const onAuthStateChanged = (userData) => {
        setUser(userData);
    };

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    const fetchProfileDataCallBack = useCallback((response, data) => {
        if (response) {
            setUserData(data.data());
        }
    }, [userData])

    useEffect(() => {
        fetchProfileDataFromFirestore(user?.uid, fetchProfileDataCallBack);
    }, [userData]);

    const handleLogout = () => {
        setLoading(true);
        logout((response, data) => {
            setLoading(false);
            if (response) {
                navigation.replace("EmailInputScreen", {
                    email: route.params.email
                });
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: "User has been logged out successfully!",
                });
            } else {
                Toast.show({
                    type: 'success',
                    text1: 'Error',
                    text2: "Oops, Something went wrong",
                });
            }
        });
    }

    return (
        <View style={{ width: windowWidth, height: '100%', backgroundColor: '#fff' }}>

            <View style={{ ...styles.headerBlock }}>
                <Text style={{ fontSize: 18, color: '#000', fontWeight: '700' }}>Profile</Text>
            </View>

            <View style={{ width: windowWidth, height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>

                <Image
                    source={{ uri: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" }}
                    style={{ width: 160, height: 160, borderRadius: 100 }}
                />

                <Text />
                <Text style={{ fontSize: 24, color: '#000' }}>{userData?.fullName}</Text>
                <Text style={{ fontSize: 18, color: '#000' }}>{userData?.email}</Text>

                <TouchableOpacity style={{ ...styles.logoutBtn }} onPress={handleLogout}>
                    <Text style={{ fontSize: 16, color: '#fff' }}>Logout</Text>
                </TouchableOpacity>
            </View>
            <Panel loading={loading} />
            <CustomLoader loading={loading} />
        </View>
    )
}

const styles = StyleSheet.create({
    logoutBtn: {
        width: windowWidth / 1.6,
        height: 60,
        backgroundColor: COLORS.seagreen,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 20,
    },
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
})

const mapStateToProps = state => {
    return {
        userLogin: state.loginReducer.userLogin
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: (callback) => { dispatch(logout(callback)) },
        fetchProfileDataFromFirestore: (userId, callback) => { dispatch(fetchProfileDataFromFirestore(userId, callback)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
