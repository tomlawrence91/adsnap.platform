import {connect} from 'react-redux';
import RedeemView from './RedeemView';
import {toJS} from 'immutable';

export default connect(
  state => ({
    deal: state.getIn(['redeem', 'deal']).toJS()
  })
)(RedeemView);
