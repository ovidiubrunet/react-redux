import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { saveCourse } from "../../redux/actions/courseActions";
import { loadTemplates } from "../../redux/actions/templateActions";
import { formToSchemaProperties } from "../../util/formUtil";
import PropTypes from "prop-types";
import { newCourse } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import Form from "react-jsonschema-form";

export function AddCoursePage({
  templates,
  loadTemplates,
  saveCourse,
  history,
  ...props
}) {
  const [template, setTemplate] = useState({ ...props.template });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (templates.length === 0) {
      loadTemplates().catch((error) => {
        alert("Loading courses failed" + error);
      });
    } else {
      setTemplate({ ...props.template });
    }
  }, [props.template]);

  function handleChange({ formData }) {
    setTemplate((prevCourse) => ({
      ...prevCourse,
      schema: {
        ...prevCourse.schema,
        properties: formToSchemaProperties(formData, prevCourse),
      },
    }));
  }
  function handleError() {}

  function handleSave() {
    template.id = null;
    setTemplate(template);
    saveCourse(template)
      .then(() => {
        toast.success("Course saved.");
        history.push("/courses");
      })
      .catch((error) => {
        setErrors({ onSave: error.message });
      });
  }

  if (template.schema) {
    return templates.length === 0 ? (
      <Spinner />
    ) : (
      <Form
        schema={template.schema}
        uiSchema={template.uiSchema}
        onChange={handleChange}
        onSubmit={handleSave}
        onError={handleError}
      />
    );
  }
  return null;
}

AddCoursePage.propTypes = {
  template: PropTypes.object.isRequired,
  templates: PropTypes.array.isRequired,
  loadTemplates: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export function getTemplateBySlug(templates, slug) {
  return templates.find((template) => template.name === slug) || null;
}

function mapStateToProps(state, ownProps) {
  console.log(state);
  const slug = ownProps.match.params.slug;
  const template =
    slug && state.templates.length > 0
      ? getTemplateBySlug(state.templates, slug)
      : newCourse;

  console.log(template);
  return {
    template,
    templates: state.templates,
  };
}

const mapDispatchToProps = {
  loadTemplates,
  saveCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCoursePage);
