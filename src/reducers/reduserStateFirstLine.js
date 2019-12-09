const reduserStateFirstLine = (
  state = {
    signIn: {
      user: "",
      password: ""
    },
    changedValues: {
      text: "",
      status: "",
      id: "",
      token: null
    },
    addNewTask: false,
    changeTask: false,
    signInAdmin: false,
    signInUser: false,
    token: null
  },
  action
) => {
  switch (action.type) {
    case "SET_STATE_FIRST_LINE_SIGN_IN":
      return Object.assign({}, state, action.data);
    case "SET_STATE_FIRST_LINE_CHANGED_VALUE":
      return Object.assign({}, state, action.data);
    case "SET_STATE_FIRST_LINE_ADD_NEW_TASK":
      return Object.assign({}, state, action.parameter);
    case "SET_STATE_FIRST_LINE_CHENGE_TASK":
      return Object.assign({}, state, action.parameter);
    case "SET_STATE_FIRST_LINE_SIGN_IN_ADMIN":
      return Object.assign({}, state, action.parameter);
    case "SET_STATE_FIRST_LINE_SIGN_IN_USER":
      return Object.assign({}, state, action.parameter);
    case "SET_STATE_FIRST_LINE_TOKEN":
      return Object.assign({}, state, action.parameter);
    case "SET_STATE_FIRST_LINE_BROAD_CAST_CHANNEL":
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
};

export default reduserStateFirstLine;
