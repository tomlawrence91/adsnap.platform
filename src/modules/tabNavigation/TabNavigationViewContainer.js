import {connect} from 'react-redux';
import TabNavigationView from './TabNavigationView';

export default connect(
  state => ({
      tabIndex: state.getIn(['tabNav', 'tabIndex'])
  })
)(TabNavigationView);