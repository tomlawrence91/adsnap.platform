import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Dimensions
} from 'react-native';
import * as COLORS from '../constants/colors';

const ListItemWithImage = () => (
  <View style={styles.container}>
    <Image style={styles.icon} source={props.icon} />
    <TextInput
      autoCapitalize={'none'}
      underlineColorAndroid={COLORS.TRANSPARENT}
      style={styles.input}
      placeholder={props.text}
    />
  </View>
)
const styles = StyleSheet.create({
  icon: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
    marginRight: 15
  },
  container: {
    marginTop: 10,
    width: Dimensions.get('window').width - 30,
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    height: 40,
    flex: 1,
    color: COLORS.DARK_GREY
  }
});

ListItemWithImage.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
}

export default ListItemWithImage