import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function templateReducer(
  state = initialState.templateOptions,
  action
) {
  switch (action.type) {
    case types.LOAD_TEMPLATE_OPTIONS_SUCCESS:
      return action.templateOptions;
    default:
      return state;
  }
}
