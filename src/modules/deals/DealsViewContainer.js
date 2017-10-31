import { connect } from 'react-redux';
import DealsView from './DealsView';
import { toJS } from 'immutable';

export default connect(
  state => ({
    deals: state.getIn(['deals', 'deals']).toJS(),
    activeDeal: state.getIn(['deals', 'activeDeal']).toJS(),
    colors: state.getIn(['deals', 'colors']).toJS(),
  })
)(DealsView);
