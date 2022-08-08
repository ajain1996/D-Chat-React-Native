import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { COLORS } from '../../Component/Constant/Color';
import { FONTS } from '../../Component/Constant/Font';
import HomeHeader from '../../Component/Header/HomeHeader';
import Navigation from '../../Service/Navigation';
import { useSelector } from 'react-redux';
import database from '@react-native-firebase/database';

const listData = [
  {
    name: 'Amy Farha',
    avatar_url:
      'https://images.pexels.com/photos/2811087/pexels-photo-2811087.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    subtitle: 'Hey there, how are you?',
  },
  {
    name: 'Chris Jackson',
    avatar_url:
      'https://images.pexels.com/photos/3748221/pexels-photo-3748221.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    subtitle: 'Where are you?',
  },
  {
    name: 'Jenifar Lawrence',
    avatar_url:
      'https://m.media-amazon.com/images/M/MV5BOTU3NDE5MDQ4MV5BMl5BanBnXkFtZTgwMzE5ODQ3MDI@._V1_.jpg',
    subtitle: 'I am good, how are you?',
  },
  {
    name: 'Tom Holland',
    avatar_url:
      'https://static.toiimg.com/thumb.cms?msid=80482429&height=600&width=600',
    subtitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
  },
  {
    name: 'Robert',
    avatar_url:
      'https://expertphotography.b-cdn.net/wp-content/uploads/2020/05/male-poses-squint.jpg',
    subtitle: 'Where does it come from?',
  },
  {
    name: 'downey junior',
    avatar_url:
      'https://www.apetogentleman.com/wp-content/uploads/2018/06/male-models-marlon.jpg',
    subtitle: 'Where can I get some?',
  },
  {
    name: 'Ema Watson',
    avatar_url:
      'https://images.unsplash.com/photo-1503104834685-7205e8607eb9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bW9kZWx8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
    subtitle: 'I am good, how are you?',
  },
  {
    name: 'Chris Jackson',
    avatar_url:
      'https://images.pexels.com/photos/3748221/pexels-photo-3748221.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    subtitle: ' If you use this site regularly and would like to help keep the site',
  },
  {
    name: 'Jenifar Lawrence',
    avatar_url:
      'https://m.media-amazon.com/images/M/MV5BOTU3NDE5MDQ4MV5BMl5BanBnXkFtZTgwMzE5ODQ3MDI@._V1_.jpg',
    subtitle: 'Why do we use it?',
  },
  {
    name: 'Tom Holland',
    avatar_url:
      'https://static.toiimg.com/thumb.cms?msid=80482429&height=600&width=600',
    subtitle: ' If you use this site regularly and would like to help keep the site',
  },
];

const Home = () => {

  const { userData } = useSelector(state => state.User);

  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    getChatList();
  }, [])

  const getChatList = () => {
    database()
      .ref('/chatlist/' + userData?.id)
      .on('value', snapshot => {
        if (snapshot?.val() != null) {
          console.log("User data: ", Object.values(snapshot?.val()));
          setChatList(Object.values(snapshot?.val()))
        }
      })
  }

  const renderItem = ({ item }) => {
    console.log("\n\n \n\n item last msg: ", item.lastMsg.length)
    return (
      <ListItem
        containerStyle={{ paddingVertical: 8, marginVertical: 0 }}
        onPress={() => Navigation.navigate('SingleChat', { data: item })}>
        <Avatar
          source={{ uri: item.img }}
          rounded
          title={item.name}
          size="medium" />
        <ListItem.Content>
          <ListItem.Title style={{ fontFamily: FONTS.Medium, fontSize: 14 }}>
            {item.name}
          </ListItem.Title>
          {item.lastMsg.length === 0
            ? <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons
                style={{ color: COLORS.black, marginRight: 4 }}
                name="image" type="Ionicons" size={22}
              />
              <ListItem.Subtitle style={{ fontFamily: FONTS.Regular, fontSize: 12 }} numberOfLines={1}>
                Photo
              </ListItem.Subtitle>
            </View>
            : <ListItem.Subtitle style={{ fontFamily: FONTS.Regular, fontSize: 12 }} numberOfLines={1}>
              {item.lastMsg}
            </ListItem.Subtitle>}
        </ListItem.Content>
      </ListItem>
    )
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <HomeHeader userData={userData} />
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={chatList}
        renderItem={renderItem}
      />
      <TouchableOpacity
        style={styles.but}
        onPress={() => Navigation.navigate('AllUser')}>
        <Icon
          name="users"
          type="FontAwesome5"
          style={{ color: COLORS.white, fontSize: 20 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  but: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.theme,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
});