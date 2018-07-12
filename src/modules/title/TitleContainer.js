import { connect } from 'react-redux'
import Title from './TitleView'

export default connect(
  state => ({
    currentChallenge: state.getIn(['snap', 'currentChallenge'])
  })
)(Title);