import { connect } from "react-redux";
import ImageResultsView from "./ImageResultsView";

export default connect(state => ({
  results: state.getIn(["snap", "results" ]),
  challenge: state.getIn(['snap', 'currentChallenge'])
}))(ImageResultsView);
