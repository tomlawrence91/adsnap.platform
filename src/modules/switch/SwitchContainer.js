import { connect } from 'react-redux'
import SwitchView from './SwitchView'

export default connect(
  state => ({
    activeView: state.getIn(['challenges', 'activeView'])
  })
)(SwitchView);