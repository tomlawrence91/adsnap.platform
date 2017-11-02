import { connect } from 'react-redux'
import ChallengesView from './ChallengesView'

export default connect(
  state => ({
    activeView: state.getIn(['challenges', 'activeView']),
    challenges: state.getIn(['challenges', 'challenges']).toJS()
  })
)(ChallengesView)