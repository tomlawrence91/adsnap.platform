import { connect } from 'react-redux';
import SnapView from './SnapView';
import { toJS } from 'immutable';

export default connect(
  state => ({
    uploading: state.getIn(['snap', 'uploading']),
    animationValue: state.getIn(['snap','animationObj','current']),
  })
)(SnapView);
