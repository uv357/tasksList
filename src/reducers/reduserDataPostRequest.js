const reduserDataPostRequest = (
  state = {
    dataPostRequest: null,
    dataSignIn: {
      username: "",
      password: ""
    }
  },
  action
) => {
  switch (action.type) {
    case "SET_DATA_POST_REQUEST":
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
};

export default reduserDataPostRequest;
