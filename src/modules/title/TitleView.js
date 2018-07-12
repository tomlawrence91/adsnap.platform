import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import styles from './TitleStyle'

class Title extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const challenge = this.props.currentChallenge.toJS()

    return(
      <View style={styles.title}>
        <Text style={styles.titleText}>
          {challenge.brandName ? `Challenge: ${challenge.brandName}` : 'Free snapping'}
        </Text>
      </View>
    )
  }
}

Title.propTypes = {
  currentChallenge: PropTypes.object.isRequired
}

export default Title