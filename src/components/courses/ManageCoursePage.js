import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { formToSchemaProperties } from "../../util/formUtil";
import PropTypes from "prop-types";
import { newCourse } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import Form from "react-jsonschema-form";

export function ManageCoursePage({
  courses,
  loadCourses,
  saveCourse,
  history,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        alert("Loading courses failed" + error);
      });
    } else {
      setCourse({ ...props.course });
    }
  }, [props.course]);

  function handleChange({ formData }) {
    setCourse((prevCourse) => ({
      ...prevCourse,
      schema: {
        ...prevCourse.schema,
        properties: formToSchemaProperties(formData, prevCourse),
      },
    }));
  }
  function handleError() {}

  function handleSave() {
    saveCourse(course)
      .then(() => {
        toast.success("Course saved.");
        history.push("/courses");
      })
      .catch((error) => {
        setErrors({ onSave: error.message });
      });
  }

  if (!course.schema) {
    history.push("/not-found");
  }

  if (course.schema) {
    return courses.length === 0 ? (
      <Spinner />
    ) : (
      <Form
        schema={course.schema}
        uiSchema={course.uiSchema}
        onChange={handleChange}
        onSubmit={handleSave}
        onError={handleError}
      />
    );
  }
  return null;
}

ManageCoursePage.propTypes = {
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export function getCourseBySlug(courses, slug) {
  return courses.find((course) => course.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  return {
    course,
    courses: state.courses,
  };
}

const mapDispatchToProps = {
  loadCourses,
  saveCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
