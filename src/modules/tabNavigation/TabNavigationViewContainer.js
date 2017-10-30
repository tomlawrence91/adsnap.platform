import {connect} from 'react-redux';
import TabNavigationView from './TabNavigationView';

export default connect(
  state => ({
    tabIndex: state.getIn(['tabNav', 'tabIndex']),
    points: state.getIn(['snap', 'points']),
    results: state.getIn(['snap', 'results']),
    currentChallenge: state.getIn(['snap', 'currentChallenge'])
  })
)(TabNavigationView);