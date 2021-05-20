import React,{ useState, useEffect } from 'react';
import { StyleSheet, Dimensions, ScrollView, View, Alert } from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { actions } from '../reducer/redux-saga/modules/user';

const { width } = Dimensions.get('screen');

const storeData = async (value) => {
  console.log('//////////stoire', value)
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('@user', jsonValue)
  } catch (e) {
    // saving error
  }
}

const Login = (props) => {

  const navigation = useNavigation();

  const[state,setState] = useState({
    email: null,
    password: null
  })

  useEffect(() => {
    props.clearMessage();
  },[])

  useEffect(() => {
    if(props && props.loginMessage){
      Alert.alert(
        'Response',
        props.loginMessage,
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
          {text: 'OK', onPress: props.loginMessage === "User login Successfully" ? navigateDashboard : cleatReduc},
        ],
        { cancelable: false }
      )
    }
  },[props && props.loginMessage]);

  const cleatReduc = () => {
    props.clearMessage();
  }

  const navigateDashboard = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
    // console.log('props.userDetails',props.userDetails)
    storeData(props.userDetails)
    // console.log('data//////',data)
    navigation.navigate("Home")
  }

  const onSubmitPress = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(reg.test(state.email)){
      props.userLogin(state)
    }else{
      Alert.alert("Insert Proper Email")
    }
  }

  const renderProducts = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}>
        <Block flex>
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
        </Block>
        <Button round size="small" onPress={onSubmitPress} >LOGIN</Button>
        <Text size={16} onPress={() => navigation.navigate("Sign Up")} style={styles.linkStyle}>New User use this link</Text>
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
    loginMessage: state.user.userLoginMessage,
    userDetails: state.user.user_details,
  };
};

export default connect(
  mapStateToProps,
  {
    userLogin: actions.userLogin,
    clearMessage: actions.clearMessage
  },
)(Login);

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  search: {
    height: 48,
    width: width - 32,
    color: 'black',
    // marginHorizontal: 16,
    borderWidth: 1,
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
  linkStyle: {
    marginTop: 20,
    textDecorationLine: 'underline',
    color: 'darkblue'
  }
});
