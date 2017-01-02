import {connect} from 'react-redux';
import DealsView from './DealsView';
import {toJS} from 'immutable';

export default connect(
  state => ({
    deals: state.getIn(['deals','deals']).toJS()
    // deals: console.log(state.toJS())
    
  })
)(DealsView);
