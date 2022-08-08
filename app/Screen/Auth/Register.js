import React, { useState } from 'react';
import {
  StatusBar,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { Card } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { COLORS } from '../../Component/Constant/Color';
import { FONTS } from '../../Component/Constant/Font';
import Navigation from '../../Service/Navigation';
import uuid from 'react-native-uuid';
import Toast from 'react-native-simple-toast';
import database from '@react-native-firebase/database';

const { width, height } = Dimensions.get('window');

function Register() {

  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [pass, setpass] = useState('');

  const registerUser = async () => {
    if (name == '' || email == "" || pass == "") {
      Toast.show('please fill in all the fields');
      return false;
    }
    let data = {
      id: uuid.v4(),
      name: name,
      emailId: email,
      password: pass,
      img: "https://images.pexels.com/photos/2811087/pexels-photo-2811087.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    };
    database()
      .ref('/users/' + data.id)
      .set(data)
      .then((dataVal) => {
        Toast.show('Register Successfully!');
        setname("")
        setemail("")
        setpass("")
        Navigation.navigate("Login")
      })
      .catch((error) => {
        console.log("Errorrrrrrrrrrrrrrrrrrr", error)
      })
  }

  return (
    <>
      <StatusBar
        backgroundColor={COLORS.theme}
        barStyle="light-content"
        hidden={false}
      />
      <View style={{ justifyContent: "space-between", height: "95%" }}>
        <View style={styles.uppercard}>
          <Text
            style={{
              color: '#fff',
              fontFamily: FONTS.Bold,
              fontSize: 25
            }}>
            WELCOME
          </Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Card
            style={{
              backgroundColor: '#fff',
              width: width - 30,
              borderRadius: 15,
            }}>
            <KeyboardAwareScrollView
              style={{ marginTop: 20 }}
              showsVerticalScrollIndicator={false}>
              <View style={styles.cardView}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.Login}>Register</Text>
                  <Text />
                  <View style={[styles.inputContainer, { marginTop: 10 }]}>
                    <TextInput
                      style={styles.inputs}
                      placeholder="Enter Full Name"
                      underlineColorAndroid="transparent"
                      onChangeText={value => setname(value)}
                      value={name}
                      placeholderTextColor={COLORS.liteBlack}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.inputs}
                      placeholder="Enter Email Id"
                      underlineColorAndroid="transparent"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      onChangeText={value => setemail(value)}
                      value={email}
                      placeholderTextColor={COLORS.liteBlack}
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.inputs}
                      placeholder="Enter Password"
                      underlineColorAndroid="transparent"
                      onChangeText={value => setpass(value)}
                      value={pass}
                      secureTextEntry={true}
                      placeholderTextColor={COLORS.liteBlack}
                    />
                  </View>
                  <Text />

                  <TouchableOpacity
                    style={styles.btn}
                    // onPress={() => Navigation.navigate('AppStack')}
                    onPress={registerUser}
                  >
                    <Text style={styles.btnText}>Register Now</Text>
                  </TouchableOpacity>

                  <View style={styles.contactView}>
                    <Text style={styles.smallTxt}>Existing user?</Text>
                    <TouchableOpacity
                      style={{ marginLeft: 4 }}
                      onPress={() => Navigation.navigate('Login')}>
                      <Text style={styles.register}>Login Now</Text>
                    </TouchableOpacity>
                  </View>
                  <View>

                  </View>
                </View>
              </View>
            </KeyboardAwareScrollView>
          </Card>
        </View>
      </View>
    </>
  );
}

export default Register;

const styles = StyleSheet.create({
  uppercard: {
    height: height / 4,
    backgroundColor: COLORS.theme,
    borderBottomLeftRadius: height / 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: height / 2 - 50,
    width: '95%',
    resizeMode: 'cover',
    borderRadius: 13,
  },
  loginBtn: {
    height: 48,
    width: '95%',
    backgroundColor: COLORS.theme,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
  },
  loginText: {
    color: COLORS.lightgray,
    fontSize: 18,
    fontFamily: FONTS.Regular,
  },
  buttonSec: { marginTop: 20, justifyContent: 'center', alignItems: 'center' },
  logo: {
    height: height / 2 - 50,
    width: '95%',
    resizeMode: 'cover',
    borderRadius: 13,
  },

  inputs: {
    borderBottomColor: COLORS.white,
    flex: 1,
    color: COLORS.liteBlack,
    paddingLeft: 10,
    fontFamily: FONTS.Regular,
    paddingLeft: 20
  },
  inputContainer: {
    borderRadius: 30,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginBottom: 10,
    elevation: 2,
  },
  inputIconView: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.theme,
    height: '100%',
    borderRadius: 30,
    alignSelf: 'center',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    elevation: 2,
  },
  smallTxt: {
    fontSize: 13,
    color: COLORS.black,
    fontFamily: FONTS.Regular,
    marginTop: 10,
    opacity: .5,
    textAlign: 'center',
  },
  register: {
    fontSize: 13,
    fontFamily: FONTS.SemiBold,
    marginTop: 12,
    textAlign: 'center',
    color: COLORS.textInput,
    textDecorationLine: 'underline'
  },
  contactView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  btnText: {
    color: '#fff',
    fontFamily: FONTS.SemiBold,
    fontSize: 14,
    marginTop: 2,
  },
  btn: {
    backgroundColor: COLORS.theme,
    width: '100%',
    height: 50,
    borderRadius: 30,
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Login: {
    alignSelf: 'center',
    fontFamily: FONTS.Medium,
    color: COLORS.textInput,
    fontSize: 20,
    marginTop: 10,
  },
  cardView: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingBottom: 20,
    paddingTop: 20,
  }
});