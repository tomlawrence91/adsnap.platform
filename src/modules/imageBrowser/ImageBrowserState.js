import { fromJS } from "immutable";

const ADD_PHOTOS = "IMAGE_BROWSER/ADD_PHOTOS";
// Initial state
const initialState = fromJS({
  photos: {}
});

export function addPhotos(edges) {
  return {
    type: ADD_PHOTOS,
    payload: edges
  };
}

// Reducer
export default function ImageBrowserState(
  state = initialState,
  action = {}
) {
  switch (action.type) {
    case ADD_PHOTOS:
      return state.set("photos", fromJS(action.payload));

    default:
      return state;
  }
}
