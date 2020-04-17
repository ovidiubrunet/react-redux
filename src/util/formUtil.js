export function formToSchemaProperties(formData, prevCourse) {
  const entriesC = Object.entries(prevCourse.schema.properties);
  const data = {};
  for (const [name, value] of entriesC) {
    data[name] = {
      ...prevCourse.schema.properties[name],
      default: formData[name],
    };
  }
  return data;
}
