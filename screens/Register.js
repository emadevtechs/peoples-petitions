import React, {useState, useEffect }from 'react';
import { StyleSheet, Dimensions, ScrollView, View, Alert, ActivityIndicator } from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';
import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import { connect } from 'react-redux';
import {Picker} from '@react-native-community/picker';
import { actions } from '../reducer/redux-saga/modules/user';

import { Icon, Product } from '../components/';

const { width } = Dimensions.get('screen');
import products from '../constants/products';

const iconCamera = <Icon size={16} color={theme.COLORS.MUTED} name="zoom-in" family="material" />

const Register = (props) => {

  const navigation = useNavigation();
  const[state,setState] = useState({
    name: null,
    email: null,
    password: null,
    phone_number: null,
    profile_url: null,
    address: null,
    district: null,
    confirm_password: null
  });
  const[districtsList,setDistrictsList] = useState(null)
  const[photoObj,setPhotoObj] = useState(null);
  const[isLoading,setIsLoading]=useState(false);

  useEffect(() => {
    props.getDistricts()
  },[])

  useEffect(() => {
    if(props && props.districtsList){
      setDistrictsList(props.districtsList)
    }
  },[props && props.districtsList]);

  useEffect(() => {
    if(props && props.userRegisterMessage){
      setIsLoading(false);
      if(props.userRegisterMessage === 'Create User Successfully'){
        Alert.alert(
          "Success",
          'Register Successfully',
          [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
            {text: 'OK', onPress: () =>  navigation.navigate('Sign In')},
          ],
          { cancelable: false }
        )
      }else{
        Alert.alert("Something went wrong")
      }
    }
  },[props && props.userRegisterMessage])

  const onSubmitData = () => {
    if(state.password.length > 5){
      if(state.password === state.confirm_password){
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(reg.test(state.email)){
          if(photoObj){
            setIsLoading(true);
            postCloudinary();
          }else{
            setIsLoading(true);
            let data = {
              name: state.name,
              email: state.email,
              password: state.password,
              phone_number: state.phone_number,
              profile_url: null,
              address: state.address,
              district: state.district,
            }
            props.createUser(data)
          }
        }else{
          Alert.alert("Insert Proper Email")
        }        
    }else{
      Alert.alert("Password & ConfirmPassword are not same")
    }
  }else{
    Alert.alert("Password is too short")
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
            console.log('Cannot upload////////', err);
          });  
      }      
      haicall();
    }
  }

  const uploadApi = (item) => {
    let data = {
      name: state.name,
      email: state.email,
      password: state.password,
      phone_number: state.phone_number,
      profile_url: item.secure_url,
      address: state.address,
      district: state.district,
    }
    props.createUser(data)
  }

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

  const renderProducts = () => {

    const { navigation } = props;

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}>
          {isLoading ? <ActivityIndicator size="large" color="black" />
         : <>
        <Block flex>
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
            <Text size={16} style={styles.tabTitle}>Upload Profile Picture</Text>
            {photoObj && photoObj.name && <Text size={16} style={styles.tabTitle}>{photoObj.name}</Text>}
          </View>
          <Text size={16} style={styles.tabTitle}>Name</Text>
          <Input
            right
            icon="person"
            family="fontisto"
            iconSize={14}
            iconColor="black"
            style={styles.search}
            placeholder="Enter your Name"
            color={theme.COLORS.THEME}
            placeholderTextColor={theme.COLORS.THEME}
            onChangeText={(data) => setState({...state, name: data})}
          />
          <Text size={16} style={styles.tabTitle}>Email</Text>
          <Input
            right
            icon="email"
            family="fontisto"
            iconSize={14}
            iconColor="black"
            style={styles.search}
            placeholder="Enter proper Email"
            color={theme.COLORS.THEME}
            placeholderTextColor={theme.COLORS.THEME}
            onChangeText={(data) => setState({...state, email: data})}
          />
          <Text size={16} style={styles.tabTitle}>Address</Text>
          <Input
            right
            icon="address"
            family="entypo"
            iconSize={14}
            iconColor="black"
            style={styles.search}
            placeHolder="Enter your Address"
            color={theme.COLORS.THEME}
            placeholderTextColor={theme.COLORS.THEME}
            onChangeText={(data) => setState({...state, address: data})}
          />
          <Text size={16} style={styles.tabTitle}>Phone Number</Text>
          <Input
            right
            icon="old-phone"
            family="entypo"
            iconSize={14}
            iconColor="black"
            style={styles.search}
            placeholder="Enter Phone Number"
            color={theme.COLORS.THEME}
            placeholderTextColor={theme.COLORS.THEME}
            onChangeText={(data) => setState({...state, phone_number: data})}
          />
          <Text size={16} style={styles.tabTitle}>District</Text>
            <View style={styles.search}>
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
          <Text size={16} style={styles.tabTitle}>Password</Text>
          <Input
            style={styles.search}
            placeholder="password"
            family="antdesign"
            password
            viewPass
            placeholder="Enter Password"
            color={theme.COLORS.THEME}
            placeholderTextColor={theme.COLORS.THEME}
            onChangeText={(data) => setState({...state, password: data})}
          />
          <Text size={16} style={styles.tabTitle}>Confirm Password</Text>
          <Input
            style={styles.search}
            placeholder="password"
            family="antdesign"
            password
            viewPass
            placeholder="Confirm Password"
            color={theme.COLORS.THEME}
            placeholderTextColor={theme.COLORS.THEME}
            onChangeText={(data) => setState({...state, confirm_password: data})}
          />
        </Block>
        <Button round size="small" onPress={() => onSubmitData()} >SUBMIT</Button>
        <Text size={16} onPress={() => navigation.navigate("Sign Up")} style={styles.linkStyle}>Already Regitered</Text>
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
  return {
    userRegisterMessage: state.user.userRegisterMessage,
    districtsList: state.user.districtsList,
  };
};

export default connect(
  mapStateToProps,
  {
    createUser: actions.createUser,
    getDistricts: actions.getDistricts
  },
)(Register);

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  linkStyle: {
    marginTop: 20,
    textDecorationLine: 'underline',
    color: 'darkblue'
  },
  search: {
    height: 48,
    width: width - 32,
    color: 'black',
    // marginHorizontal: 16,
    // borderWidth: 1,
    backgroundColor: 'white',
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
});
