import { fromJS } from "immutable";
import AjaxService from "../../services/AjaxService";

const SET_USER = "SETTINGS/SET_USER";
// Initial state
const initialState = fromJS({
  user: {}
});

export function setUser(user) {
  return {
    type: SET_USER,
    payload: user
  };
}

// Reducer
export default function SettingsStateReducer(
  state = initialState,
  action = {}
) {
  switch (action.type) {
    case SET_USER:
      console.log(action.payload);
      return state.set("user", fromJS(action.payload));

    default:
      return state;
  }
}
