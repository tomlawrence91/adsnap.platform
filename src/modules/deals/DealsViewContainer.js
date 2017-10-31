import { connect } from 'react-redux';
import DealsView from './DealsView';
import { toJS } from 'immutable';

export default connect(
  state => ({
    deals: state.getIn(['deals', 'deals']).toJS(),
    colors: state.getIn(['deals', 'colors']).toJS(),
    results: state.getIn(['snap', 'results']),
    currentChallenge: state.getIn(['snap', 'currentChallenge'])
  })
)(DealsView);
