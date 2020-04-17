const courses = [
  {
    id: 1,
    slug: "react-auth0-authentication-security",
    name: "simple-course",
    uiSchema: {
      authorId: {
        "ui:placeholder": "Choose Author",
      },
    },

    schema: {
      definitions: {
        authors: {
          type: "number",
          enum: ["", 1, 2],
          enumNames: ["", "Cory House", "Scott Allen"],
        },
      },

      title: "Course",
      type: "object",
      required: ["title", "authorId", "category"],
      properties: {
        title: {
          type: "string",
          title: "Title",
          default: "Securing React Apps with Auth0",
          minLength: 5,
        },
        authorId: {
          // default: course.authorId,
          $ref: "#/definitions/authors",
        },
        category: {
          type: "string",
          title: "Category",
          default: "JavaScript",
          minLength: 5,
        },
      },
    },
  },
  {
    id: 2,
    slug: "react-big-picture",
    name: "simple-course",
    uiSchema: {
      authorId: {
        "ui:placeholder": "Choose Author",
      },
    },

    schema: {
      definitions: {
        authors: {
          type: "number",
          enum: ["", 1, 2],
          enumNames: ["", "Cory House", "Scott Allen"],
        },
      },

      title: "Course",
      type: "object",
      required: ["title", "authorId", "category"],
      properties: {
        title: {
          type: "string",
          title: "Title",
          default: "React: The Big Picture",
          minLength: 5,
        },
        authorId: {
          default: 1,
          $ref: "#/definitions/authors",
        },
        category: {
          type: "string",
          title: "Category",
          default: "JavaScript",
          minLength: 5,
        },
      },
    },
  },
  {
    id: 3,
    slug: "react-creating-reusable-components",
    name: "simple-course",
    uiSchema: {
      authorId: {
        "ui:placeholder": "Choose Author",
      },
    },

    schema: {
      definitions: {
        authors: {
          type: "number",
          enum: ["", 1, 2],
          enumNames: ["", "Cory House", "Scott Allen"],
        },
      },

      title: "Course",
      type: "object",
      required: ["title", "authorId", "category"],
      properties: {
        title: {
          type: "string",
          title: "Title",
          default: "Creating Reusable React Components",
          minLength: 5,
        },
        authorId: {
          default: 2,
          $ref: "#/definitions/authors",
        },
        category: {
          type: "string",
          title: "Category",
          default: "JavaScript",
          minLength: 5,
        },
      },
    },
  },
];

const authors = [
  { id: 1, name: "Cory House" },
  { id: 2, name: "Scott Allen" },
  { id: 3, name: "Dan Wahlin" },
];

const templateOptions = {
  uiSchema: {
    template: {
      "ui:placeholder": "Choose Course Template",
    },
  },

  schema: {
    definitions: {
      templates: {
        type: "string",
        enum: ["", "simple-course", "advanced-course"],
      },
    },

    title: "Template",
    type: "object",
    required: ["template"],
    properties: {
      template: {
        $ref: "#/definitions/templates",
      },
    },
  },
};

const newCourse = {
  id: null,
  title: "",
  authorId: null,
  category: "",
};

const templates = [
  {
    id: 1,
    name: "simple-course",
    uiSchema: {
      authorId: {
        "ui:placeholder": "Choose Author",
      },
    },

    schema: {
      definitions: {
        authors: {
          type: "number",
          enum: ["", 1, 2],
          enumNames: ["", "Cory House", "Scott Allen"],
        },
      },

      title: "Course",
      type: "object",
      required: ["title", "authorId", "category"],
      properties: {
        title: {
          type: "string",
          title: "Title",
          default: "",
          minLength: 5,
        },
        authorId: {
          // default: course.authorId,
          $ref: "#/definitions/authors",
        },
        category: {
          type: "string",
          title: "Category",
          default: "",
          minLength: 5,
        },
      },
    },
  },
  {
    id: 2,
    name: "advanced-course",
    uiSchema: {
      file: {
        "ui:options": {
          accept: ".jpg",
        },
      },
    },

    schema: {
      definitions: {},

      title: "Course",
      type: "object",
      required: ["title"],
      properties: {
        title: {
          type: "string",
          title: "Title",
          default: "",
          minLength: 5,
        },
        file: {
          type: "string",
          format: "data-url",
          title: "Single file",
        },
      },
    },
  },
];

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  courses,
  newCourse,
  authors,
  templateOptions,
  templates,
};
