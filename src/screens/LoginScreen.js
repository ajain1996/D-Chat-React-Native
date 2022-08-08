import React, { useCallback, useState } from 'react';
import { View, ScrollView, ImageBackground, StyleSheet, TouchableHighlight, StatusBar, Image, Text } from 'react-native';
import Toast from 'react-native-toast-message';
import CustomInput from '../components/custom_input';
import CustomButton from '../components/custom_button';
import { COLORS } from '../services/theme';
import { windowWidth } from '../services/utils';
import { signin } from '../redux/actions/auth_action';
import { connect } from 'react-redux';
import CustomLoader from '../components/custom_loader';

function LoginScreen({ route, navigation, signin }) {

    const [passwordError, setPasswordError] = useState(false);
    const [loading, setLoading] = useState(false);

    const [password, setPassword] = useState("");
    const [showEye, setShowEye] = useState("");

    console.log("LoginScreen route.params.email: ", route.params.email)

    const signinCallBack = useCallback((response, data) => {
        setLoading(false);
        console.log("\n\n Login screen handleSubmitOnPress:", password, response, data.code)
        if (response) {
            navigation.replace("Root", {
                email: route.params.email
            });
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: "User has been logged in successfully!",
            });
        } else {
            if (data.code === "auth/wrong-password") {
                Toast.show({
                    type: 'success',
                    text1: 'Error',
                    text2: "The password is invalid or the user does not have a password.",
                });
            } else if (data.code === "auth/too-many-requests") {
                Toast.show({
                    type: 'success',
                    text1: 'Error',
                    text2: "Oops, Something went wrong",
                });
            } else {
                Toast.show({
                    type: 'success',
                    text1: 'Error',
                    text2: "Oops, Something went wrong",
                });
            }
        }
    }, [password, route])

    const handleSubmitOnPress = () => {
        var re = /[A-Z].*\d|\d.*[A-Z]/;
        if (password.length === 0) {
            setPasswordError("Invalid Password")
        } else if (password.length < 6) {
            setPasswordError("Password must be 6 characters long")
        } else if (!(password.includes("@")) && !(password.includes("#")) && !(password.includes("%") && !(password.includes("*")) && !(password.includes("$")) && !(password.includes("!")))) {
            setPasswordError("Password is not strong enough it should include atleast one of '#', '@', '$', '%', '^', '!'");
        } else if (!(re.test(password))) {
            setPasswordError("Password should contain atleast one letter and it should be capital");
        } else {
            setLoading(true);
            signin(route.params.email, password, signinCallBack);
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <StatusBar backgroundColor="#000" barStyle='light-content' />
            <ImageBackground
                source={require("../../assets/images/login-bg.png")}
                style={{ width: '100%', height: '100%' }}
            >
                <View style={{ justifyContent: 'center', height: '100%', paddingBottom: 10, backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 24 }}>
                    <View style={{ marginTop: 100 }} />
                    <View style={styles.header_block}>
                        <Text style={{ fontSize: 30, color: "#fff" }}>Log In</Text>
                        <View style={{ marginTop: 30 }} />
                    </View>

                    <View style={{ alignItems: 'center', paddingHorizontal: 10 }}>
                        <View style={{ ...styles.emailInputBoxStyle }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                                    source={{ uri: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" }}
                                    style={{ width: 70, height: 70, borderRadius: 100 }}
                                />
                                <View style={{ marginLeft: 16 }}>
                                    <Text style={{ fontSize: 14, color: '#fff' }}>Jane Doe</Text>
                                    <Text style={{ fontSize: 13, color: '#fff' }}>janedoe@gmail.com</Text>
                                </View>
                            </View>
                            <View style={{ alignItems: 'center', marginTop: 16, }}>
                                <CustomInput
                                    placeholderText="Password"
                                    iconType={showEye ? "eye" : "eyeo"}
                                    error={passwordError}
                                    secureTextEntry={showEye ? false : true}
                                    labelValue={password}
                                    onChangeText={(val) => {
                                        setPassword(val);
                                        setPasswordError("");
                                    }}
                                    onPress={() => { setShowEye(!showEye) }}
                                />
                            </View>

                            <View style={{ marginTop: 20 }} />

                            <CustomButton
                                fs={16} text={"Continue"} fw={"600"}
                                textColor={COLORS.white}
                                bgColor={COLORS.seagreen}
                                width={"100%"} height={60}
                                onPress={handleSubmitOnPress}
                            />

                            <View style={{ marginTop: 20 }} />

                            <View style={{ alignItems: 'flex-start', marginTop: -6 }}>
                                <TouchableHighlight
                                    style={{ paddingHorizontal: 10, paddingVertical: 6, }}
                                    activeOpacity={0.6} underlayColor={'#f7f7f7'}
                                    onPress={() => { navigation.navigate("ForgotPasswordScreen") }}
                                >
                                    <Text style={{ fontSize: 15, color: COLORS.seagreen }}>Forgot your Password?</Text>
                                </TouchableHighlight>
                            </View>
                        </View>


                        <View style={{ marginTop: 80 }} />
                    </View>
                </View>

                <Panel loading={loading} />
            </ImageBackground>

            <CustomLoader loading={loading} />

        </ScrollView>
    )
}


export const Panel = ({ loading }) => {
    return (
        loading
            ? <View style={{
                justifyContent: 'center',
                height: '100%',
                paddingBottom: 10,
                backgroundColor: 'rgba(0,0,0,0.5)',
                position: 'absolute',
                top: 0, bottom: 0,
                right: 0, left: 0
            }} /> : <></>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        flexGrow: 1,
        justifyContent: 'space-between'
    },
    header_block: {
        alignItems: 'flex-start',
        width: '100%',
    },
    login_logo: {
        width: "80%",
        height: 80,
        marginTop: 20,
        marginBottom: 30,
    },
    emailInputBoxStyle: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        width: windowWidth - 22,
        padding: 26,
        borderRadius: 16,
        paddingVertical: 30
    }
});

const mapStateToProps = state => {
    return {
        userLogin: state.loginReducer.userLogin
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signin: (email, password, callback) => { dispatch(signin(email, password, callback)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);