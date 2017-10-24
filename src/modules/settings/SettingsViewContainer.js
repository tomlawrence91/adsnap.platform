import { connect } from "react-redux";
import SettingsView from "./SettingsView";
import { toJS } from "immutable";

export default connect(state => ({
  user: state.getIn(["settings", "user"])
}))(SettingsView);
