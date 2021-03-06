import React, {useState,useEffect} from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform, View } from 'react-native';
import { Button, Block, Text, theme } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { actions as useraction } from '../reducer/redux-saga/modules/user';
import { actions } from '../reducer/redux-saga/modules/post';
import { Icon } from '../components';
import { Images, materialTheme } from '../constants';
import { HeaderHeight } from "../constants/utils";

const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@user')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // error reading value
  }
}

const removeData = async () => {
  try {
    await AsyncStorage.removeItem('@user')
    await AsyncStorage.removeItem('@admin')
  } catch(e) {
    // error reading value
  }
}

const Profile = (props) => {

  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const[myPosts,setMyPosts] = useState(null);
  const[userDetails,setUserDetails] = useState(null);

  useEffect(() => {
    if(isFocused){
      async function getUser(){
        let data = await getData();
        if(data && data.id){
          setUserDetails(data);
          props.getMyPosts(data.id)
        }else{
          navigation.navigate("Sign In")
        }
      } 
      getUser();
    }
  },[isFocused]);

  useEffect(() => {
    if(props && props.my_posts){
      setMyPosts(props && props.my_posts);
    }
  },[props && props.my_posts]);

  const onSignOutPress = () => {
    removeData().then(res => {
      navigation.reset({
        index: 0,
        routes: [{name: 'Sign In'}],
      });
      navigation.navigate("Sign In")
    })
  }

    return (
      <Block flex style={styles.profile}>
        <Block flex>
          <ImageBackground
            source={{ uri: userDetails && userDetails.profile_url }}
            style={styles.profileContainer}
            imageStyle={styles.profileImage}>
            <Block flex style={styles.profileDetails}>
              <Block style={styles.profileTexts}>
                <Text color="white" size={28} style={{ paddingBottom: 8 }}>{userDetails && userDetails.name}</Text>
              </Block>
              <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']} style={styles.gradient} />
            </Block>
          </ImageBackground>
        </Block>
        <Block flex style={styles.options}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Block space="between" style={{ padding: theme.SIZES.BASE, }}>
              <Block row space="between" style={{ padding: theme.SIZES.BASE, }}>
                <Block row left>
                  <Text muted size={18}>Email</Text>
                </Block>
                <Block row right>
                  <Text bold size={18}>{userDetails && userDetails.email}</Text>
                </Block>
              </Block>
              <Block row space="between" style={{ padding: theme.SIZES.BASE, }}>
                <Block row left>
                  <Text muted size={18}>Phone Number</Text>
                </Block>
                <Block row right>
                  <Text bold size={18}>{userDetails && userDetails.phone_number}</Text>
                </Block>
              </Block>
              <Block row space="between" style={{ padding: theme.SIZES.BASE, }}>
                <Block row left>
                  <Text muted size={18}>Address</Text>
                </Block>
                <Block row right>
                  <Text bold size={18}>{userDetails && userDetails.address}</Text>
                </Block>
              </Block>
              <Block row space="between" style={{ padding: theme.SIZES.BASE, }}>
                <Block row left>
                  <Text muted size={18}>District</Text>
                </Block>
                <Block row right>
                  <Text bold size={18}>{userDetails && userDetails.district}</Text>
                </Block>
              </Block>
              <Block row space="between" style={{ padding: theme.SIZES.BASE, }}>
                <Block row left>
                  <Text muted size={18}>My Posts</Text>
                </Block>
                <Block row right>
                  <Text bold size={18}>{myPosts && myPosts.length}</Text>
                </Block>
              </Block>
            </Block>
            <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
              <Button round onPress={onSignOutPress} size="small" >LOGOUT</Button>
            </View>
          </ScrollView>
        </Block>
      </Block>
    );
}

const mapStateToProps = (state) => {
  console.log('......',state.post.my_posts)
  return {
    userRegisterMessage: state.user.userRegisterMessage,
    my_posts: state.post.my_posts,
  };
};

export default connect(
  mapStateToProps,
  {
    getMyPosts: actions.getMyPosts,
    clearMessage: actions.clearMessage,
  },
)(Profile);

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
    marginBottom: -HeaderHeight * 2,
  },
  profileImage: {
    width: width * 1.1,
    height: 'auto',
  },
  profileContainer: {
    width: width,
    height: height / 2,
  },
  profileDetails: {
    paddingTop: theme.SIZES.BASE * 4,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  profileTexts: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    zIndex: 2
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: theme.SIZES.BASE / 2,
    borderRadius: 4,
    height: 19,
    width: 38,
  },
  seller: {
    marginRight: theme.SIZES.BASE / 2,
  },
  options: {
    position: 'relative',
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -theme.SIZES.BASE * 7,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure
  },
  gradient: {
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    height: '30%',
    position: 'absolute',
  },
});
