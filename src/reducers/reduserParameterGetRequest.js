const reduserParameterGetRequest = (
  state = {
    sort_field: "id",
    sort_direction: "asc",
    page: "1",
    start_request: false
  },
  action
) => {
  switch (action.type) {
    case "SET_PARAMETER_GET_REQUEST_SORT_FIELD":
      return Object.assign({}, state, {
        sort_field: action.parameter,
        start_request: true
      });
    case "SET_PARAMETER_GET_REQUEST_SORT_DIRECTION":
      return Object.assign({}, state, {
        sort_direction: action.parameter,
        start_request: true
      });
    case "SET_PARAMETER_GET_REQUEST_PAGE":
      return Object.assign({}, state, {
        page: action.parameter,
        start_request: true
      });
    default:
      return state;
  }
};

export default reduserParameterGetRequest;
