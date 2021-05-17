import React from 'react';
import { StyleSheet, Dimensions, ScrollView, View, Picker } from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';
import { Select } from '../components/';
const { width } = Dimensions.get('screen');

export default class AddPost extends React.Component {

renderProducts = () => {

    const { navigation } = this.props;

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}>
        <Block flex>
          <Text size={16} style={styles.tabTitle}>Select District</Text>
            <View style={styles.shadow}>
              <Picker
                // selectedValue={}
                // style={styles.shadow}
                // onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
              >
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
              </Picker>
            </View>
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
            <Text size={16} style={styles.tabTitle}>Upload Picture</Text>
            </View>
            <Text size={16} style={styles.tabTitle}>Petition</Text>
            <Input
                style={styles.search}
                placeHolder="Enter your Address"
                placeholderTextColor={theme.COLORS.INFO}
                multiline={true}
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
    height: 148,
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
