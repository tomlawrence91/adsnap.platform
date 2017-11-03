import React from 'react';
import {connect} from 'react-redux';
import { Dimensions } from 'react-native';

import {
  StyleSheet,
  View,
  Text
} from 'react-native';

const Title = React.createClass({

  render() {

    const challenge = this.props.currentChallenge.toJS();

    return (

      <View style={styles.title}>
        <Text style={styles.titleText}>{ challenge.brandName ? `Challenge: ${challenge.brandName}` : 'Free snapping'}</Text>
      </View>
    )
  }
});

const styles = StyleSheet.create({
  title: {
    width: Dimensions.get('window').width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '500'
  }
});

export default connect(
  state => ({
    currentChallenge: state.getIn(['snap', 'currentChallenge'])
  })
)(Title);
