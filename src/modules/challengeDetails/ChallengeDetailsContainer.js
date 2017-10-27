import { connect } from 'react-redux'
import ChallengeDetailsView from './ChallengeDetailsView'

export default connect(state => ({
  challenge: state.getIn(['challengeDetails', 'challenge']).toJS()
}))(ChallengeDetailsView)