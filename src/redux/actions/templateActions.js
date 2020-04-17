import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadTemplateOptionSuccess(templateOptions) {
  return { type: types.LOAD_TEMPLATE_OPTIONS_SUCCESS, templateOptions };
}

/**
 * important the name
 * @param {*} template
 */
export function loadTemplateSuccess(templates) {
  return { type: types.LOAD_TEMPLATE_SUCCESS, templates };
}

export function loadTemplateOptions() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return courseApi
      .getTemplateOptions()
      .then((templateOptions) => {
        dispatch(loadTemplateOptionSuccess(templateOptions));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function loadTemplates() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return courseApi
      .getTemplates()
      .then((templates) => {
        dispatch(loadTemplateSuccess(templates));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
