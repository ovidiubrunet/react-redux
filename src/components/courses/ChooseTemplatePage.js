import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadTemplateOptions } from "../../redux/actions/templateActions";
import { formToSchemaProperties } from "../../util/formUtil";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import Form from "react-jsonschema-form";

export function ChooseTemplatePage({
  templateOptions,
  loadTemplateOptions,
  history,
}) {
  useEffect(() => {
    if (!templateOptions.schema) {
      loadTemplateOptions().catch((error) => {
        alert("Loading templateOptions failed" + error);
      });
    }
  }, []);

  function handleChange() {}
  function handleError() {}

  function handleSave({ formData }) {
    const template = formData.template;
    let r = Math.random().toString(36).substring(7);
    history.push("/course/" + template + "/add/" + r);
  }

  if (templateOptions.schema) {
    return templateOptions.length === 0 ? (
      <Spinner />
    ) : (
      <Form
        schema={templateOptions.schema}
        uiSchema={templateOptions.uiSchema}
        onChange={handleChange}
        onSubmit={handleSave}
        onError={handleError}
      />
    );
  }
  return null;
}

ChooseTemplatePage.propTypes = {
  templateOptions: PropTypes.object.isRequired,
  loadTemplateOptions: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    templateOptions: state.templateOptions,
  };
}

const mapDispatchToProps = {
  loadTemplateOptions,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChooseTemplatePage);
