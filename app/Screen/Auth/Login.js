import React, { useEffect, useState } from 'react';
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
import Toast from 'react-native-simple-toast';
import database from '@react-native-firebase/database';
import { useDispatch } from 'react-redux';
import Auth from '../../Service/Auth';
import { setUser } from '../../Redux/reducer/user';

const { width, height } = Dimensions.get('window');

function Login() {

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  useEffect(() => { }, []);

  const loginUser = async () => {
    database()
      .ref("/users/")
      .orderByChild("emailId")
      .equalTo(email)
      .once('value')
      .then(async snapshot => {
        if (snapshot.val() == null) {
          Toast.show("Invalid Email Id");
          return false;
        }
        let userData = Object.values(snapshot.val())[0];
        if (userData?.password !== pass) {
          Toast.show("Invalid Password");
          return false;
        }
        console.log("User data: ", userData);
        dispatch(setUser(userData));
        await Auth.setAccount(userData);
        Toast.show("Login Successfully!");
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
            Welcome
          </Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Card
            style={{
              backgroundColor: '#fff',
              width: '92%',
              borderRadius: 15,
              marginHorizontal: 18
            }}>
            <View style={styles.cardView}>
              <View style={{}}>
                <Text style={styles.Login}>Login</Text>
                <Text /><Text />
                <KeyboardAwareScrollView
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}>

                  <View style={[styles.inputContainer, { marginTop: 10 }]}>
                    <TextInput
                      style={styles.inputs}
                      placeholder="Enter Email Id"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      underlineColorAndroid="transparent"
                      onChangeText={value => {
                        setEmail(value);
                      }}
                      value={email}
                      placeholderTextColor={COLORS.liteBlack}
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.inputs}
                      placeholder="Enter Password"
                      secureTextEntry={true}
                      underlineColorAndroid="transparent"
                      onChangeText={value => {
                        setPass(value);
                      }}
                      value={pass}
                      placeholderTextColor={COLORS.liteBlack}
                    />
                  </View>
                </KeyboardAwareScrollView>
                <Text />

                <TouchableOpacity
                  style={styles.btn}
                  onPress={loginUser}
                // onPress={() => Navigation.navigate('AppStack')}
                >
                  <Text style={styles.btnText}>Login Now</Text>
                </TouchableOpacity>

                <View style={styles.contactView}>
                  <Text style={styles.smallTxt}>New user?</Text>
                  <TouchableOpacity style={{ marginLeft: 4 }}
                    onPress={() => Navigation.navigate('Register')}>
                    <Text style={styles.register}>Register Now</Text>
                  </TouchableOpacity>
                </View>
                <View>

                </View>
              </View>
            </View>
          </Card>
        </View>
      </View>
    </>
  );
}

export default Login;

const styles = StyleSheet.create({
  uppercard: {
    width: width,
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