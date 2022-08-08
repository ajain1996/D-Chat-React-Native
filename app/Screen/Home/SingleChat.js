import Icon from 'react-native-vector-icons/Ionicons';
import React, { useEffect } from 'react';
import { View, StyleSheet, ImageBackground, TextInput, TouchableOpacity, FlatList, Image, TouchableWithoutFeedback } from 'react-native';
import moment from 'moment';
import { COLORS } from '../../Component/Constant/Color';
import ChatHeader from '../../Component/Header/ChatHeader';
import { useSelector } from 'react-redux';
import database from '@react-native-firebase/database';
import Toast from 'react-native-simple-toast';
import { launchImageLibrary } from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64';
import RenderMessageBlock from './renderMessageComponent';
import RenderMessageImgComponent from './renderMessageImgComponent';

const SingleChat = (props) => {

    const { userData } = useSelector(state => state.User)

    const { data } = props.route.params;

    const [msg, setMsg] = React.useState('');
    const [disabled, setdisabled] = React.useState(false);
    const [allChat, setallChat] = React.useState([]);

    useEffect(() => {
        const onChildAdd = database()
            .ref('/messages/' + data?.roomId)
            .on('child_added', snapshot => {
                setallChat((state) => [snapshot.val(), ...state]);
            })

        return () => database().ref('/messages/').off('child_added', onChildAdd);
    }, [data?.roomId])


    const msgValid = txt => txt && txt.replace(/\s/g, '').length;

    const sendMsg = (dataVal) => {
        if (dataVal === "" || msgValid(dataVal) === 0) {
            Toast.show("Enter something....");
            return false;
        }
        setdisabled(true);
        let msgData = {};
        if (msg === "") {
            msgData = {
                roomId: data?.roomId,
                message: "",
                from: userData?.id,
                to: data?.id,
                sendTime: moment().format(),
                image: dataVal,
                msgType: "image",
            }
        } else {
            msgData = {
                roomId: data?.roomId,
                message: msg,
                from: userData?.id,
                to: data?.id,
                sendTime: moment().format(),
                image: "",
                msgType: "text",
            }
        }

        const newReference = database().ref('/messages/' + data?.roomId).push();

        msgData.id = newReference.key;
        newReference
            .set(msgData)
            .then(() => {
                let chatListUpdate = {
                    lastMsg: msg,
                    sendTime: msgData.sendTime,
                }
                database()
                    .ref('/chatlist/' + data.id + "/" + userData.id)
                    .update(chatListUpdate)
                    .then(() => { console.log('Data updated.') });

                database()
                    .ref('/chatlist/' + userData.id + "/" + data.id)
                    .update(chatListUpdate)
                    .then(() => { console.log('Data updated.') });

                setMsg("");
                setdisabled(false);
            });
    }

    const picImage = () => {
        launchImageLibrary("photo", async (response) => {
            console.log('\n\n response =', response.assets[0].uri);
            ImgToBase64.getBase64String(response.assets[0].uri)
                .then(async (base64String) => {
                    let source = "data:image/jpeg;base64," + base64String;
                    sendMsg(source)
                })
                .catch(err => { });
        });
    }



    return (
        <View style={styles.container}>
            <ChatHeader data={data} />
            <ImageBackground
                source={require('../../Assets/Background.jpg')}
                style={{ flex: 1 }}
            >
                <FlatList
                    style={{ flex: 1 }}
                    data={allChat}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index}
                    inverted
                    renderItem={({ item }) => {
                        console.log("\n\n \n\n Message box: ", item)
                        if (item.image === "") {
                            return (
                                <RenderMessageBlock item={item} data={data} userData={userData} />
                            )
                        } else {
                            return (
                                <RenderMessageImgComponent item={item} sender={item.from === userData.id} />
                            )
                        }
                    }}
                />
            </ImageBackground>

            <View style={styles.inputWrapper}>
                <View style={{ width: 5 }} />
                <TextInput
                    style={styles.inputStyle}
                    placeholder="type a message"
                    placeholderTextColor={COLORS.black}
                    multiline={true}
                    value={msg}
                    onChangeText={(val) => setMsg(val)}
                />
                <View style={{ width: 8 }} />

                <TouchableOpacity
                    disabled={disabled}
                    onPress={picImage}
                >
                    <Icon
                        style={{
                            color: COLORS.white
                        }}
                        name="image"
                        type="Ionicons"
                        size={26}
                    />

                </TouchableOpacity>
                <View style={{ width: 8 }} />

                <TouchableOpacity
                    disabled={disabled}
                    onPress={() => { sendMsg(msg) }}
                >
                    <Icon
                        style={{
                            color: COLORS.white
                        }}
                        name="paper-plane-sharp"
                        type="Ionicons"
                        size={26}
                    />

                </TouchableOpacity>
                <View style={{ width: 5 }} />

            </View>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputWrapper: {
        backgroundColor: COLORS.theme,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 7,
        justifyContent: 'space-evenly'
    },
    inputStyle: {
        backgroundColor: COLORS.white,
        width: '72%',
        borderRadius: 25,
        borderWidth: 0.5,
        borderColor: COLORS.white,
        paddingHorizontal: 15,
        color: COLORS.black,
    }
});

export default SingleChat;