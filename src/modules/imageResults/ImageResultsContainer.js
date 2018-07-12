import { connect } from "react-redux";
import ImageResultsView from "./ImageResultsView";

export default connect(state => ({
  results: state.getIn(["snap", "results" ]).toJS(),
  challenge: state.getIn(['snap', 'currentChallenge']).toJS(),
  deals: state.getIn(['deals', 'deals']).toJS(),
}))(ImageResultsView);
