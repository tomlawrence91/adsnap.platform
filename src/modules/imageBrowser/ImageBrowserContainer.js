import { connect } from "react-redux";
import ImageBrowserView from "./ImageBrowserView";
import { toJS } from "immutable";

export default connect(state => ({
  photos: state.getIn(["imageBrowser", "photos" ])
}))(ImageBrowserView);
