import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native';
import * as COMMON_STYLES from '../constants/commonStyles';
import * as COLORS from '../constants/colors';

const Container = (props) => (
  <View style={styles.viewContainer}>
    {!props.loading && props.children}
    {props.loading &&
      <ActivityIndicator
        size="large"
        style={styles.loading}
        color={COLORS.WHITE}
      />}
  </View>
)

const styles = StyleSheet.create({
  loading: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    backgroundColor: COLORS.APP_BACKGROUND,
  },
  linearGradient: {
    flex: 1
  }
});

Container.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.any
}

export default Container;
