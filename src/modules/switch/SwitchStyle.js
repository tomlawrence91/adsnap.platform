import { StyleSheet } from 'react-native'
import * as COLORS from '../../constants/colors'

const styles = StyleSheet.create({
  button: {
    flex: 1,
    paddingLeft: 12,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonIcon: {
    width: 24,
    height: 24,
    marginRight: 6
  },
  buttonText: {
    color: COLORS.WHITE,
    fontWeight: 'bold'
  }
});

export default styles