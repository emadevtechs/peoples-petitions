import React, {useState,useEffect} from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Alert,Platform, View,ActivityIndicator } from 'react-native';
import { Button, Block, Text, theme } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { actions as useraction } from '../../reducer/redux-saga/modules/user';
import { actions } from '../../reducer/redux-saga/modules/post';
import { Icon } from '../../components';
import { Images, materialTheme } from '../../constants';
import { HeaderHeight } from "../../constants/utils";
import {Picker} from '@react-native-community/picker';

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
  } catch(e) {
    // error reading value
  }
}

const UpdatePost = (props) => {

  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const[status,setStatus] = useState(null);
  const[currentPost,setcurrentPost] = useState(null);
  const[isLoading,setIsLoading]=useState(false);

//   console.log('updta detail///s', props.route)
useEffect(() => {
    if(props && props.updatePostMessage){
      setIsLoading(false);
      if(props.updatePostMessage === 'Update Post Successfully'){
        Alert.alert(
          "Success",
          'Post Updated Successfully',
          [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
            {text: 'OK', onPress: () =>  navigation.goBack()},
          ],
          { cancelable: false }
        )
      }else{
        Alert.alert("Something went wrong")
      }
    }
  },[props && props.updatePostMessage])

    useEffect(() => {
        if(props && props.currentPost){
            setcurrentPost(props.currentPost)
            setStatus(props.currentPost.status)
        }
    },[props && props.currentPost])

  const onupdatePress = () => {
    setIsLoading(true)
        props.updatePost({
            id: currentPost.id,
            status: status
        })
        // navigation.goBack();
  }

    return (
      <Block flex style={styles.profile}>
           {isLoading ? <ActivityIndicator size="large" color="black" />
         : <>
        <Block flex>
          <ImageBackground
            source={{ uri: currentPost && currentPost.picture_url }}
            style={styles.profileContainer}
            imageStyle={styles.profileImage}>
            <Block flex style={styles.profileDetails}>
              {/* <Block style={styles.profileTexts}>
                <Text color="white" size={28} style={{ paddingBottom: 8 }}>{userDetails && userDetails.name}</Text>
              </Block> */}
              <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']} style={styles.gradient} />
            </Block>
          </ImageBackground>
        </Block>
        <Block flex style={styles.options}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Block space="between" style={{ padding: theme.SIZES.BASE, }}>
              <Block row space="between" style={{ padding: theme.SIZES.BASE, }}>
                <Block row left>
                  <Text muted size={18}>Petition</Text>
                </Block>
                <Block row right>
                  <Text bold size={18}>{currentPost && currentPost.text}</Text>
                </Block>
              </Block>
            </Block>
            <Text size={16} style={styles.tabTitle}>Update Status</Text>
            <View style={styles.search}>
            <Picker
              selectedValue={status}
              onValueChange={(itemValue, itemIndex) => setStatus(itemValue)}
            >
              <Picker.Item label='Created' value='Created' />
              <Picker.Item label="Assinged To Department" value="Assinged To Department" />
              <Picker.Item label="Process going on" value="Process going on" />
              <Picker.Item label="Completed" value='Completed' />
            </Picker>
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, marginTop: 30}}>
              <Button round onPress={onupdatePress} size="small" >UPDATE</Button>
            </View>
          </ScrollView>
        </Block>
            </>
}
      </Block>
    );
}

const mapStateToProps = (state) => {
  console.log('......',state.post.currentPost)
  return {
    updatePostMessage: state.post.updatePostMessage,
    currentPost: state.post.currentPost,
  };
};

export default connect(
  mapStateToProps,
  {
    updatePost: actions.updatePost,
    clearMessage: actions.clearMessage,
  },
)(UpdatePost);

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
    marginBottom: -HeaderHeight * 2,
  },
  profileImage: {
    width: width * 1.1,
    height: 'auto',
  },
  search: {
    // height: 48,
    width: width - 32,
    // color: 'black',
    // marginHorizontal: 16,
    // borderWidth: 1,
    backgroundColor: 'grey',
    borderRadius: 3,
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
  tabTitle: {
    lineHeight: 29,
    fontWeight: 'bold',
    // marginLeft: 20
  },
});
