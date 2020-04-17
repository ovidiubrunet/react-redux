import { combineReducers } from "redux";
import courses from "./courseReducer";
import templateOptions from "./templateOptionReducer";
import templates from "./templateReducer";
import apiCallsInProgress from "./apiStatusReducer";
/**
 * The name is important because the state prop will have this name
 */
const rootReducer = combineReducers({
  courses,
  templateOptions,
  templates,
  apiCallsInProgress,
});

export default rootReducer;
