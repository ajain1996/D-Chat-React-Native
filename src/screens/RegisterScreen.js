import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, ImageBackground, StatusBar, ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';
import CustomInput from '../components/custom_input';
import CustomButton from '../components/custom_button';
import { COLORS } from '../services/theme';
import { windowWidth } from '../services/utils';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { signup } from '../redux/actions/auth_action';
import CustomLoader from '../components/custom_loader';
import { Panel } from './LoginScreen';

function RegisterScreen({ route, navigation, signup }) {

    const [nameError, setNameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [showEye, setShowEye] = useState("");

    const signupCallBack = ((response, data) => {
        setLoading(false);
        console.log("\n\n Login screen handleSubmitOnPress:", response, data)
        if (response) {
            navigation.replace("Root", {
                email: route.params.email
            });
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: "The User account has been created successfully!",
            });
        } else {
            if (data.code === "auth/email-already-in-use") {
                Toast.show({
                    type: 'success',
                    text1: 'Error',
                    text2: "The email address is already in use by another account.",
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
    }, [route, name, password])

    const handleSubmitOnPress = () => {
        var re = /[A-Z].*\d|\d.*[A-Z]/;
        if (name.length === 0) {
            setNameError("Name is required");
        } else if (password.length < 6) {
            setPasswordError("Password must be 6 characters long")
        } else if (!(password.includes("@")) && !(password.includes("#")) && !(password.includes("%") && !(password.includes("*")) && !(password.includes("$")) && !(password.includes("!")))) {
            setPasswordError("Password is not strong enough it should include atleast one of '#', '@', '$', '%', '^', '!'");
        } else if (!(re.test(password))) {
            setPasswordError("Password should contain atleast one letter and it should be capital");
        } else {
            setLoading(true);
            signup(route.params.email, password, name, signupCallBack);
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <StatusBar backgroundColor="#000" barStyle='light-content' />
            <ImageBackground
                source={require("../../assets/images/login-bg.png")}
                style={{ width: '100%', height: '100%' }}
            >
                <View style={{ justifyContent: 'center', height: '100%', paddingBottom: 10 }}>
                    <View style={{ marginTop: 100 }} />
                    <View style={styles.header_block}>
                        <Text style={{ fontSize: 30, color: "#fff" }}>Sign Up</Text>
                        <View style={{ marginTop: 30 }} />
                    </View>

                    <View style={{ alignItems: 'center', paddingHorizontal: 10 }}>
                        <View style={{ ...styles.emailInputBoxStyle }}>
                            <Text style={{ fontSize: 13, color: "#fff", fontWeight: "600" }}>
                                Looks like you don't have an account.
                            </Text>
                            <View style={{ marginTop: 2 }} />
                            <Text style={{ fontSize: 13, color: "#fff", fontWeight: "600" }}>
                                Let's create a new account for
                            </Text>
                            <View style={{ marginTop: 2 }} />
                            <Text style={{ fontSize: 13, color: "#fff", fontWeight: "600" }}>
                                {route.params.email}
                            </Text>
                            <View style={{ marginTop: 5 }} />

                            <View style={{ alignItems: 'center', marginTop: 16 }}>
                                <CustomInput
                                    placeholderText="Name"
                                    iconType="user"
                                    autoCapitalize='none'
                                    error={nameError}
                                    labelValue={name}
                                    onChangeText={(val) => {
                                        setName(val);
                                        setNameError("");
                                    }}
                                />
                            </View>

                            <View style={{ alignItems: 'center', marginTop: 10, }}>
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
                            <Text style={{ fontSize: 13, color: "#fff", fontWeight: "600" }}>
                                By selecting Agree and continue below,
                            </Text>

                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                                <Text style={{ fontSize: 13, color: "#fff", fontWeight: "600" }}>
                                    I agree to
                                </Text>
                                <View style={{ width: 4 }} />
                                <TouchableOpacity>
                                    <Text style={{ fontSize: 13, color: COLORS.seagreen, fontWeight: "600" }}>
                                        Terms of Service and Privacy Policy
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ marginTop: 24 }} />

                            <CustomButton
                                fs={16} text={"Agree and continue"} fw={"600"}
                                textColor={COLORS.white}
                                bgColor={COLORS.seagreen}
                                width={"100%"} height={58}
                                onPress={handleSubmitOnPress}
                            />
                            <View style={{ marginTop: 10 }} />
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
        justifyContent: 'space-between'
    },
    header_block: {
        alignItems: 'flex-start',
        width: '100%',
        paddingHorizontal: 24
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
        userSignup: state.signupReducer.userSignup
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signup: (email, password, name, callback) => { dispatch(signup(email, password, name, callback)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
