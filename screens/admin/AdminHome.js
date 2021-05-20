import React,{ useState, useEffect } from 'react';
import { StyleSheet, Dimensions, ScrollView,TouchableOpacity, View } from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { actions } from '../../reducer/redux-saga/modules/post';

import { Icon, AdminProduct } from '../../components/';

const { width } = Dimensions.get('screen');
import products from '../../constants/products';

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@admin')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // error reading value
  }
}

const removeData = async () => {
  try {
    await AsyncStorage.removeItem('@admin')
    await AsyncStorage.removeItem('@user')
  } catch(e) {
    // error reading value
  }
}

const AdminHome = (props) => {

  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const[myPosts,setMyPosts] = useState(null);
  const[adminDetails,setAdminDetails] = useState(null);
  const[AdminFound,setAdminFound] = useState(null);

  
  useEffect(() => {
    if(isFocused){
      props.clearMessage()
      async function getAdmin(){
        let data = await getData();
        console.log('data data at', data)
        if(data && data.id){
          setAdminFound(true);
          setAdminDetails(data);
          props.getPostsByDistrict(data.name)
        }else{
          setAdminFound(false);
        }
      } 
      getAdmin();
    }
  },[isFocused]);

  useEffect(() => {
    if(props && props.district_posts){
      setMyPosts(props && props.district_posts)
    }
  },[props && props.district_posts])

  const renderSearch = () => {
    // const { navigation } = this.props;
    const iconCamera = <Icon size={16} color={theme.COLORS.MUTED} name="zoom-in" family="material" />

    return (
      <Input
        right
        color="black"
        style={styles.search}
        iconContent={iconCamera}
        placeholder="What are you looking for?"
        onFocus={() => navigation.navigate('Pro')}
      />
    )
  }
  
  const renderTabs = () => {
    // const { navigation } = props;

    return (
      <Block row style={styles.tabs}>
        <Button shadowless style={[styles.tab, styles.divider]} onPress={() => navigation.navigate('Add Post')}>
          <Block row middle>
            <Icon name="grid" family="feather" style={{ paddingRight: 8 }} />
            <Text size={16} style={styles.tabTitle}>Categories</Text>
          </Block>
        </Button>
        <Button shadowless style={styles.tab} onPress={() => navigation.navigate('Add Post')}>
          <Block row middle>
            <Icon size={16} name="camera-18" family="GalioExtra" style={{ paddingRight: 8 }} />
            <Text size={16} style={styles.tabTitle}>Best Deals</Text>
          </Block>
        </Button>
      </Block>
    )
  }

  const onSignOutPress = () => {
    removeData().then(res => {
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
      navigation.navigate("Login")
    })
  }

  const getItem = (data) => {
    // console.log('....data///////',data)
    props.passPost(data)
    navigation.navigate('PostDetail')
  }

  const renderProducts = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}>
        <Block flex>
          {myPosts && myPosts.length === 0 &&
            <View style={{alignItems: 'center', justiftContent: 'center', display: 'flex'}}>
              <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>No Posts Found</Text>
            </View>
          }
          {myPosts && myPosts.map((item,index) => {
            return <AdminProduct key={index} product={item} getdetails={getItem} horizontal priceColor="#6632a8" />
          })}
        </Block>
        <View style={{position: 'absolute', Top: 15, right: 10}}>
          <TouchableOpacity onPress={onSignOutPress} style={{borderRadius: 5,width: 60,height: 40, backgroundColor: 'darkblue', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: 'white'}}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }

  const showLoading = () => {
    return(
      <View style={{alignItems: 'center', justiftContent: 'center', display: 'flex',marginTop: 50}}>
        <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>Loading</Text>
      </View>        
    )
  }

  const UserNotFound = () => {
    return(
      <View style={{alignItems: 'center', justiftContent: 'center', display: 'flex',marginTop: 50}}>
        <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>You must Login First</Text>
      </View> 
    )
  }

    return (
      <Block flex center style={styles.home}>
        {AdminFound === null ? showLoading() : AdminFound === false ? UserNotFound() :renderProducts()}
      </Block>
    );
}

const mapStateToProps = (state) => {
  console.log('......',state.post.district_posts)
  return {
    userRegisterMessage: state.user.userRegisterMessage,
    district_posts: state.post.district_posts,
  };
};

export default connect(
  mapStateToProps,
  {
    getPostsByDistrict: actions.getPostsByDistrict,
    clearMessage: actions.clearMessage,
    passPost: actions.passPost
  },
)(AdminHome);

const styles = StyleSheet.create({
  home: {
    width: width,    
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
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
    lineHeight: 19,
    fontWeight: '300'
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  products: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
  },
});
