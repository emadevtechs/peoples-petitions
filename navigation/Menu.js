import React, {useState,useEffect}from "react";
import { TouchableWithoutFeedback, ScrollView, StyleSheet, Image, Alert } from "react-native";
import { Block, Text, theme } from "galio-framework";
import { useSafeArea } from "react-native-safe-area-context";

import { Icon, Drawer as DrawerCustomItem } from '../components/';
import { Images, materialTheme } from "../constants/";
import { connect } from 'react-redux';
import { actions } from '../reducer/redux-saga/modules/post';


function CustomDrawerContent({
  drawerPosition,
  navigation,
  profile,
  focused,
  state,
  ...rest
}) {

  let props = rest;
  const[isAdmin,setAdmin] = useState(false);

  const insets = useSafeArea();
  const screens = [
    "Home",
    "Sign In",
    "Sign Up",
    "Profile",
  ];
  const adminscreens = [
    "Dashboard",
    "Login",
    // "PostDetail",
  ];

  useEffect(() => {
    if(props.is_admin){
     setAdmin(props.is_admin)
    }
  },[props.is_admin])

  return (
    <Block
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <Block flex={0.25} style={styles.header}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Profile")}
        >
          <Block style={styles.profile}>
            <Image source={{ uri: profile.avatar }} style={styles.avatar} />
            <Text h5 color={"white"}>
              {profile.name}
            </Text>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
      <Block flex style={{ paddingLeft: 7, paddingRight: 14 }}>
        <ScrollView
          contentContainerStyle={[
            {
              paddingTop: insets.top * 0.4,
              paddingLeft: drawerPosition === "left" ? insets.left : 0,
              paddingRight: drawerPosition === "right" ? insets.right : 0
            }
          ]}
          showsVerticalScrollIndicator={false}
        >
          {!isAdmin && screens.map((item, index) => {
            return (
              <DrawerCustomItem
                title={item}
                key={index}
                navigation={navigation}
                focused={state.index === index ? true : false}
              />
            );
          })}
          {isAdmin && adminscreens.map((item, index) => {
            return (
              <DrawerCustomItem
                title={item}
                key={index}
                navigation={navigation}
                focused={state.index === index ? true : false}
              />
            );
          })}
        </ScrollView>
      </Block>
    </Block>
  );
}


const mapStateToProps = (state) => {
  console.log('is_Admin',state.general.is_admin)
  return {
    is_admin: state.general.is_admin,
  };
};

export default connect(
  mapStateToProps,
  {
    getMyPosts: actions.getMyPosts,
    clearMessage: actions.clearMessage,
  },
)(CustomDrawerContent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#4B1958',
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 2,
    justifyContent: 'center',
  },
  footer: {
    paddingHorizontal: 28,
    justifyContent: 'flex-end'
  },
  profile: {
    marginBottom: theme.SIZES.BASE / 2,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginBottom: theme.SIZES.BASE,
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: 8,
    borderRadius: 4,
    height: 19,
    width: 38,
  },
  seller: {
    marginRight: 16,
  }
});

// export default CustomDrawerContent;