import React, { useState, useEffect } from 'react';
import { Easing, Animated, Dimensions } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Provider } from 'react-redux';
import configureStore from '../reducer/redux-saga/configStore';

import { Block, Text, theme } from "galio-framework";

import ComponentsScreen from '../screens/Components';
import HomeScreen from '../screens/Home';
import OnboardingScreen from '../screens/Onboarding';
import ProfileScreen from '../screens/Profile';
import ProScreen from '../screens/Pro';
import SettingsScreen from '../screens/Settings';
import RegisterScreen from '../screens/Register';
import LoginScreen from '../screens/Login';
import AddPostScreen from '../screens/AddPost';
import AdminHomeScreen from '../screens/admin/AdminHome';
import AdminLoginScreen from '../screens/admin/AdminLogin';
import UpdatePostScreen from '../screens/admin/UpdatePost';

import CustomDrawerContent from './Menu';
import { Icon, Header } from '../components';
import { Images, materialTheme } from "../constants/";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const profile = {
  avatar: Images.Profile,
  name: "Welcome",
  type: "Seller",
  plan: "Pro",
  rating: 4.8
};

function ProfileStack(props) {
  return (
    <Stack.Navigator initialRouteName="Profile" mode="card" headerMode="screen">
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              white
              transparent
              title="Profile"
              scene={scene}
              navigation={navigation}
            />
          ),
          // headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

function SettingsStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      mode="card"
      headerMode="screen"
    >
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Settings" scene={scene} navigation={navigation} />
          )
        }}
      />
    </Stack.Navigator>
  );
}

function UpdatePostStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="PostDetail"
      mode="card"
      headerMode="screen"
    >
      <Stack.Screen
        name="PostDetail"
        component={UpdatePostScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Update Petition" scene={scene} navigation={navigation} />
          )
        }}
      />
    </Stack.Navigator>
  );
}

function ComponentsStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Components"
        component={ComponentsScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Components" scene={scene} navigation={navigation} />
          )
        }}
      />
    </Stack.Navigator>
  );
}

function HomeStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              // search
              // tabs
              title="Home"
              navigation={navigation}
              scene={scene}
            />
          )
        }}
      />
      <Stack.Screen
        name="Add Post"
        component={AddPostScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              // search
              // tabs
              back
              title="Add Petition"
              navigation={navigation}
              scene={scene}
            />
          )
        }}
      />
    </Stack.Navigator>
  );
}

function RegisterStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Sign Up"
        component={RegisterScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              // search
              // tabs
              title="Sign Up"
              navigation={navigation}
              scene={scene}
            />
          )
        }}
      />
      <Stack.Screen
        name="Sign In"
        component={LoginScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              // search
              // tabs
              title="Sign In"
              navigation={navigation}
              scene={scene}
            />
          )
        }}
      />
    </Stack.Navigator>
  );
}

function LoginStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Sign In"
        component={LoginScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              // search
              // tabs
              title="Sign In"
              navigation={navigation}
              scene={scene}
            />
          )
        }}
      />
    </Stack.Navigator>
  );
}

function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={props => (
        <CustomDrawerContent {...props} profile={profile} />
      )}
      drawerStyle={{
        backgroundColor: "white",
        width: width * 0.8
      }}
      drawerContentOptions={{
        activeTintColor: "white",
        inactiveTintColor: "#000",
        activeBackgroundColor: materialTheme.COLORS.ACTIVE,
        inactiveBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.74,
          paddingHorizontal: 12,
          // paddingVertical: 4,
          justifyContent: "center",
          alignContent: "center",
          // alignItems: 'center',
          overflow: "hidden"
        },
        labelStyle: {
          fontSize: 18,
          fontWeight: "normal"
        }
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen
        name="Home"
        component={HomeStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="shop"
              family="GalioExtra"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Sign In"
        component={LoginStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="shop"
              family="GalioExtra"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Sign Up"
        component={RegisterStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="shop"
              family="GalioExtra"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="circle-10"
              family="GalioExtra"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="gears"
              family="font-awesome"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
              style={{ marginRight: -3 }}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Components"
        component={ComponentsStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="md-switch"
              family="ionicon"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
              style={{ marginRight: 2, marginLeft: 2 }}
            />
          )
        }}
      />
    </Drawer.Navigator>
  );
}

function AdminHomeStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Dashboard"
        component={AdminHomeScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              // search
              // tabs
              title="Dashboard"
              navigation={navigation}
              scene={scene}
            />
          )
        }}
      />
       <Stack.Screen
        name="PostDetail"
        component={UpdatePostScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Update Petition" scene={scene} navigation={navigation} />
          )
        }}
      />
    </Stack.Navigator>
  );
}

function AdminLoginStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Login"
        component={AdminLoginScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              // search
              // tabs
              title="Login"
              navigation={navigation}
              scene={scene}
            />
          )
        }}
      />
    </Stack.Navigator>
  );
}

function AdminStack(props) {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={props => (
        <CustomDrawerContent {...props} profile={profile} />
      )}
      drawerStyle={{
        backgroundColor: "white",
        width: width * 0.8
      }}
      drawerContentOptions={{
        activeTintColor: "white",
        inactiveTintColor: "#000",
        activeBackgroundColor: materialTheme.COLORS.ACTIVE,
        inactiveBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.74,
          paddingHorizontal: 12,
          // paddingVertical: 4,
          justifyContent: "center",
          alignContent: "center",
          // alignItems: 'center',
          overflow: "hidden"
        },
        labelStyle: {
          fontSize: 18,
          fontWeight: "normal"
        }
      }}
      initialRouteName="Dashboard"
    >
      <Drawer.Screen
        name="Dashboard"
        component={AdminHomeStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="shop"
              family="GalioExtra"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Login"
        component={AdminLoginStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="shop"
              family="GalioExtra"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />
    </Drawer.Navigator>
  );
}
export default function OnboardingStack(props) {

  const [loading, onLoading] = useState(true);
  const { store } = configureStore(() => onLoading(false));

  return (
    <Provider store={store}>
      <Stack.Navigator mode="card" headerMode="none">
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          option={{
            headerTransparent: true
          }}
        />
        <Stack.Screen name="App" component={AppStack} />
        <Stack.Screen name="Admin" component={AdminStack} />
      </Stack.Navigator>
    </Provider>
  );
}
