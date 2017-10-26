import { connect } from 'react-redux'
import ChallengesView from './ChallengesView'

export default connect(
  state => ({
    challenges: state.getIn(['challenges', 'challenges']).toJS()
  })
)(ChallengesView)