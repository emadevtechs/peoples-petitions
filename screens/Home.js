import React, {useState,useEffect} from 'react';
import { StyleSheet, Dimensions, ScrollView, ActivityIndicator, View } from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { actions as useraction } from '../reducer/redux-saga/modules/user';
import { actions } from '../reducer/redux-saga/modules/post';

import { Icon, Product } from '../components/';

const { width } = Dimensions.get('screen');
import products from '../constants/products';

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@user')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // error reading value
  }
}

const Home = (props) => {

  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const[myPosts,setMyPosts] = useState(null);
  const[userDetails,setUserDetails] = useState(null);
  const[UserFound,setUserFound] = useState(null);

  useEffect(() => {
    props.clearMessage()
  },[]);
  
  useEffect(() => {
    if(isFocused){
      async function getUser(){
        let data = await getData();
        console.log('data data at', data)
        if(data && data.id){
          setUserFound(true);
          setUserDetails(data);
          props.getMyPosts(data.id)
        }else{
          setUserFound(false);
        }
      } 
      getUser();
    }
  },[isFocused])

  useEffect(() => {
    if(props && props.my_posts){
      setMyPosts(props && props.my_posts);
    }
  },[props && props.my_posts])

  const renderSearch = () => {
    const { navigation } = props;
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
    const { navigation } = props;

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
          return <Product key={index} product={item} horizontal priceColor="#6632a8" />
          })}
        </Block>
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
        {UserFound === null ? showLoading() : UserFound === false ? UserNotFound() : renderProducts()}
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
)(Home);

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
