import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function templateReducer(
  state = initialState.templates,
  action
) {
  switch (action.type) {
    case types.LOAD_TEMPLATE_SUCCESS:
      return action.templates;
    default:
      return state;
  }
}
