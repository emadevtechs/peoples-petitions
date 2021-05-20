import React, {useState, useEffect }from 'react';
import { StyleSheet, Dimensions, ScrollView, View, ActivityIndicator, Alert } from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from '@react-navigation/native';
import {Picker} from '@react-native-community/picker';
import { actions } from '../reducer/redux-saga/modules/user';
import { actions as postactions } from '../reducer/redux-saga/modules/post';
import { Select } from '../components/';
const { width } = Dimensions.get('screen');

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@user')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // error reading value
  }
}

const AddPost = (props) => {

  const navigation = useNavigation();
  const[state,setState] = useState({
    picture_url: null,
    user_id: null,
    status: null,
    district: null,
    text: null,
  });
  const[districtsList,setDistrictsList] = useState(null)
  const[photoObj,setPhotoObj] = useState(null);
  const[isLoading,setIsLoading]=useState(false);

  const[userDetails,setUserDetails] = useState(null);

  useEffect(() => {
  },[]);
  
  useEffect(() => {
    async function getUser(){
      let data = await getData();
      console.log('data data at', data)
      if(data && data.id){
        setUserDetails(data);
      }else{
        navigation.navigate("Sign In")
      }
    } 
    getUser();
  },[])

  useEffect(() => {
    props.getDistricts()
  },[]);

  useEffect(() => {
    if(props && props.createPostMessage){
      setIsLoading(false);
      if(props.createPostMessage === 'Create Post Successfully'){
        Alert.alert(
          "Success",
          'Post Successfully',
          [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
            {text: 'OK', onPress: () =>  navigation.navigate('Home')},
          ],
          { cancelable: false }
        )
      }else{
        Alert.alert("Something went wrong")
      }
    }
  },[props && props.createPostMessage])

  useEffect(() => {
    if(props && props.districtsList){
      setDistrictsList(props.districtsList)
    }
  },[props && props.districtsList]);

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({ type: "image/*", copyToCacheDirectory: true }).then(response => {

      if (response.type == 'success') {
    
        let { name, size, uri } = response;
        let nameParts = name.split('.');
        let fileType = nameParts[nameParts.length - 1];
        var fileToUpload = {
          name: name,
          size: size,
          uri: uri,
          type: "application/" + fileType
        };
        setPhotoObj(fileToUpload);
      }
    
    
    });
}

const onSubmitData = () => {
  if(state.district === null){
    Alert.alert("Select District")
  }else if(photoObj === null){
    Alert.alert("Photo Evidence Must")
  }else if( state.text === null){
    Alert.alert("Petition Compulsory")
  }else{
    if(photoObj){
      setIsLoading(true);
      postCloudinary();
    }else{
      setIsLoading(true);
      let data = {
        picture_url: null,
        user_id: userDetails.id,
        status: "Created",
        district: state.district,
        text: state.text
      }
      props.createMyPost(data)
    }
  }
  }

  const postCloudinary = () => {
    if(photoObj){
      let url = "https://api.cloudinary.com/v1_1/petition-peoples/auto/upload";
      console.log(photoObj, '.............../////file')
      const formData = new FormData();
      formData.append("file", photoObj);
      formData.append("upload_preset", "petition_preset");
      console.log("fomdaa", formData)
      async function haicall() {
        await fetch(url, {
          body: formData,
          headers: {
            'content-type':'multipart/form-data'
          },
          method: 'POST'
        })
          .then(async response => {
            let data = await response.json();
            if (data.secure_url) {             
              uploadApi(data)
            }
          })
          .catch(err => {
            setIsLoading(false);
            Alert.alert(err);
            console.log('Cannot upload////////', err);
          });  
      }      
      haicall();
    }
  }

  const uploadApi = (item) => {
    let data = {
      picture_url: item.secure_url,
      user_id: userDetails.id,
      status: "Created",
      district: state.district,
      text: state.text
    }
    props.createMyPost(data)
  }

  const renderProducts = () => {

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}>
           {isLoading ? <ActivityIndicator size="large" color="black" />
         : <>
        <Block flex>
          <Text size={16} style={styles.tabTitle}>District</Text>
            <View style={styles.search1}>
            <Picker
              selectedValue={state.district}
              onValueChange={(itemValue, itemIndex) => setState({...state, district: itemValue})}
            >
              <Picker.Item label="Select District" value={null} />
              {districtsList && districtsList.map((item,index) => {
                return <Picker.Item key={index} label={item.name} value={item.name} />
              })}
            </Picker>
            </View>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Button
              onlyIcon
              icon="upload-cloud"
              iconFamily="feather"
              iconSize={30}
              // color="warning"
              onPress={pickDocument}
              iconColor="#fff"
            // style={{ width: 40, height: 40 }}
            
            >
              warning
                </Button>
            <Text size={16} style={styles.tabTitle}>Upload Picture</Text>
            {photoObj && photoObj.name && <Text size={16} style={styles.tabTitle}>{photoObj.name}</Text>}
          </View>
          <Text size={16} style={styles.tabTitle}>Petition</Text>
          <Input
            style={styles.search}
            placeHolder="Enter your Address"
            color={theme.COLORS.THEME}
            placeholderTextColor={theme.COLORS.THEME}
            multiline={true}
            onChangeText={(data) => setState({...state, text: data})}
          />
        </Block>
        <Button round onPress={onSubmitData} size="small" >SUBMIT</Button>
        </>}
      </ScrollView>
    )
  }

    return (
      <Block flex center style={styles.home}>
        {renderProducts()}
      </Block>
    );
}

const mapStateToProps = (state) => {
  console.log('state.post.createPostMessage,',state.post.createPostMessage)
  return {
    createPostMessage: state.post.createPostMessage,
    districtsList: state.user.districtsList,
  };
};

export default connect(
  mapStateToProps,
  {
    createMyPost: postactions.createMyPost,
    getDistricts: actions.getDistricts,
    clearMessage: postactions.clearMessage,
  },
)(AddPost);

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  search: {
    height: 148,
    width: width - 32,
    color: 'black',
    // marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  search1: {
    height: 48,
    width: width - 32,
    color: 'white',
    backgroundColor: 'white',
    // marginHorizontal: 16,
    // borderWidth: 1,
    borderRadius: 3,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
    zIndex: 2,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.50,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 29,
    fontWeight: 'bold',
    // marginLeft: 20
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  products: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  shadow: {
    // shadowColor: 'black',
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 4,
    // shadowOpacity: 0.2,
    // elevation: 2,
    marginTop: 10,
    marginBottom: 10,
    height: 48,
    width: width - 32,
    backgroundColor: 'white'
    // borderWidth: 1,
    // borderRadius: 10,
  },
});
