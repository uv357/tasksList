const reduserDataPosts = (state = {}, action) => {
  switch (action.type) {
    case "SET_DATA_POSTS":
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
};

export default reduserDataPosts;
