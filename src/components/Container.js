import React from 'react';
import * as COMMON_STYLES from '../constants/commonStyles';
import * as COLORS from '../constants/colors';
import LinearGradient from 'react-native-linear-gradient'

import {
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native';

const Container = React.createClass({

    render() {
      return(
        <View style={styles.viewContainer}>
          <LinearGradient colors={[COLORS.BACKGROUND_GRADIENT_START, COLORS.BACKGROUND_GRADIENT_END]} style={styles.linearGradient}>
          {!this.props.loading && this.props.children}
          {this.props.loading && 
            <ActivityIndicator
              size="large"
              style={styles.loading}
              color={COLORS.WHITE}
            />}
            </LinearGradient>
        </View>
      )
    }
});

const styles = StyleSheet.create({
  loading:{
    flex:1,
  },
  viewContainer: {
    //marginTop: COMMON_STYLES.HEADER_HEIGHT,
    flex:1,
    backgroundColor: COLORS.APP_BACKGROUND,
  },
  linearGradient:{
    flex:1
  }
});

export default Container;
