import React, { useCallback, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, ImageBackground, StatusBar, ActivityIndicator } from 'react-native';
import CustomInput from '../components/custom_input';
import CustomButton from '../components/custom_button';
import { COLORS } from '../services/theme';
import { windowWidth } from '../services/utils';
import Toast from 'react-native-toast-message';
import { connect } from 'react-redux';
import { emailFound } from '../redux/actions/auth_action';
import { Panel } from './LoginScreen';
import CustomLoader from '../components/custom_loader';

function EmailInputScreen({ navigation, emailFound }) {

    const [emailError, setEmailError] = useState(false);
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");

    var emailFoundCallBack = useCallback((response, data) => {
        setLoading(false);
        console.log("\n\n Email input screen handleSubmitOnPress:", response, data)
        if (response) {
            if (data.length === 0) {
                navigation.navigate("RegisterScreen", {
                    email: email
                });
            } else {
                navigation.navigate("LoginScreen", {
                    email: email
                });
            }
        } else {
            Toast.show({
                type: 'success',
                text1: 'Error',
                text2: data,
            });
        }
    }, [email])

    const handleSubmitOnPress = () => {
        if (email.length === 0) {
            setEmailError("Email is required");
        } else if (!(email.includes("@")) || !(email.includes("gmail.com"))) {
            setEmailError("Invalid Email");
        } else {
            setLoading(true);
            emailFound(email, emailFoundCallBack);
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <StatusBar backgroundColor="#000" barStyle='light-content' />
            <ImageBackground
                source={require("../../assets/images/login-bg.png")}
                style={{ width: '100%', height: '100%' }}
            >
                <View style={{ justifyContent: 'center', height: '100%', paddingBottom: 10, backgroundColor: 'rgba(0,0,0,0.5)', }}>
                    <View style={{ marginTop: 100 }} />
                    <View style={styles.header_block}>
                        <Text style={{ fontSize: 30, color: "#fff", fontWeight: "900" }}>
                            Hi!
                        </Text>
                        <View style={{ marginTop: 20 }} />
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <View style={{ ...styles.emailInputBoxStyle }}>
                            <View style={{ alignItems: 'center' }}>
                                <CustomInput
                                    placeholderText="Email"
                                    iconType="user"
                                    keyboardType={'email-address'}
                                    autoCapitalize='none'
                                    error={emailError}
                                    labelValue={email}
                                    onChangeText={(val) => {
                                        setEmail(val);
                                        setEmailError("");
                                    }}
                                />
                            </View>

                            <View style={{ marginTop: 20 }} />

                            <CustomButton
                                fs={16} text={"Continue"} fw={"600"}
                                textColor={COLORS.white}
                                bgColor={COLORS.seagreen}
                                width={"100%"} height={50}
                                onPress={handleSubmitOnPress}
                            />
                            <View style={{ marginTop: 20 }} />
                        </View>
                    </View>

                    <View style={{ marginTop: 80 }} />
                </View>

                <Panel loading={loading} />
            </ImageBackground>

            <CustomLoader loading={loading} />

        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    header_block: {
        alignItems: 'flex-start',
        width: '100%',
        paddingHorizontal: 24,
    },
    login_logo: {
        width: "80%",
        height: 80,
        marginTop: 20,
        marginBottom: 30,
    },
    emailInputBoxStyle: {
        // backgroundColor: 'rgba(0,0,0,0.7)',
        width: windowWidth - 15,
        padding: 14, margin: 6,
        borderRadius: 16
    }
});

const mapStateToProps = state => {
    return {
        // isLoggedIn: true, user
        userEmailFound: state.loginReducer.userEmailFound
    }
}

const mapDispatchToProps = dispatch => {
    return {
        emailFound: (email, callback) => { dispatch(emailFound(email, callback)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailInputScreen);
