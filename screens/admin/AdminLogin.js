import React,{ useState, useEffect } from 'react';
import { StyleSheet, Dimensions, ScrollView, View, Alert,ActivityIndicator } from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { actions } from '../../reducer/redux-saga/modules/admin';

const { width } = Dimensions.get('screen');

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('@admin', jsonValue)
  } catch (e) {
    // saving error
  }
}

const AdminLogin = (props) => {

  const navigation = useNavigation();
  
  const[isLoading,setIsLoading]=useState(false);

  const[state,setState] = useState({
    name: null,
    password: null
  })

  useEffect(() => {
    props.clearMessage();
  },[])

  useEffect(() => {
    if(props && props.loginMessage){
      setIsLoading(false);
      Alert.alert(
        'Response',
        props.loginMessage,
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
          {text: 'OK', onPress: props.loginMessage === "District login Successfully" ? navigateDashboard : cleatReduc},
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
      routes: [{name: 'Dashboard'}],
    });
    // console.log('props.adminDetails',props.adminDetails)
    props.clearMessage();
    storeData(props.adminDetails)
    // console.log('data//////',data)
    navigation.navigate("Dashboard")
  }

  const onSubmitPress = () => {
    setIsLoading(true);
      props.adminLogin(state);
  }

  const renderProducts = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}>
           {isLoading ? <ActivityIndicator size="large" color="black" />
         : <>
        <Block flex>
          <Text size={16} style={styles.tabTitle}>Name</Text>
          <Input
            right
            icon="person"
            family="fontisto"
            iconSize={14}
            iconColor="black"
            style={styles.search}
            placeholder="Enter Name"
            color={theme.COLORS.THEME}
            placeholderTextColor={theme.COLORS.THEME}
            onChangeText={(data) => setState({...state, name: data})}
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
    loginMessage: state.admin.adminLoginMessage,
    adminDetails: state.admin.admin_details,
  };
};

export default connect(
  mapStateToProps,
  {
    adminLogin: actions.adminLogin,
    clearMessage: actions.clearMessage
  },
)(AdminLogin);

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
