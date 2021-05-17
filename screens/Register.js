import React from 'react';
import { StyleSheet, Dimensions, ScrollView, View } from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';

import { Icon, Product } from '../components/';

const { width } = Dimensions.get('screen');
import products from '../constants/products';

const iconCamera = <Icon size={16} color={theme.COLORS.MUTED} name="zoom-in" family="material" />

export default class Register extends React.Component {
  renderSearch = () => {
      
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
        
        renderTabs = () => {
            const { navigation } = this.props;
            
            return (
                <Block row style={styles.tabs}>
        <Button shadowless style={[styles.tab, styles.divider]} onPress={() => navigation.navigate('Pro')}>
          <Block row middle>
            <Icon name="grid" family="feather" style={{ paddingRight: 8 }} />
            <Text size={16} style={styles.tabTitle}>Categories</Text>
          </Block>
        </Button>
        <Button shadowless style={styles.tab} onPress={() => navigation.navigate('Pro')}>
          <Block row middle>
            <Icon size={16} name="camera-18" family="GalioExtra" style={{ paddingRight: 8 }} />
            <Text size={16} style={styles.tabTitle}>Best Deals</Text>
          </Block>
        </Button>
      </Block>
    )
}

renderProducts = () => {

    const { navigation } = this.props;

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}>
        <Block flex>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Button
                onlyIcon
                icon="upload-cloud"
                iconFamily="feather"
                iconSize={30}
                // color="warning"
                iconColor="#fff"
                // style={{ width: 40, height: 40 }}
                >
                    warning
                </Button>
            <Text size={16} style={styles.tabTitle}>Upload Profile Picture</Text>
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
                placeholderTextColor={theme.COLORS.INFO}
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
                placeholderTextColor={theme.COLORS.INFO}
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
                placeholderTextColor={theme.COLORS.INFO}
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
                placeholderTextColor={theme.COLORS.INFO}
            />
            <Text size={16} style={styles.tabTitle}>Password</Text>
            <Input
                style={styles.search}
                placeholder="password"
                family="antdesign"
                password
                viewPass
                placeholder="Enter Password"
                placeholderTextColor={theme.COLORS.INFO}
            />
            <Text size={16} style={styles.tabTitle}>Confirm Password</Text>
            <Input
                style={styles.search}
                placeholder="password"
                family="antdesign"
                password
                viewPass
                placeholder="Confirm Password"
                placeholderTextColor={theme.COLORS.INFO}
            />
        </Block>
        <Button round size="small" >SUBMIT</Button>
      </ScrollView>
    )
  }

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderProducts()}
      </Block>
    );
  }
}

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
});
