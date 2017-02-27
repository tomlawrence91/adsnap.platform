import WelcomeView from './WelcomeView';
import { connect } from 'react-redux';
import { toJS } from 'immutable';

export default connect(
  state => ({
    navigation: console.log(state.toJS()),
  })
)(WelcomeView);
