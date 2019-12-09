import { combineReducers } from "redux";
import reduserDataPosts from "./reduserDataPosts";
import reduserDataPostRequest from "./reduserDataPostRequest";
import reduserParameterGetRequest from "./reduserParameterGetRequest";
import reduserStateFirstLine from "./reduserStateFirstLine";

const rootReducer = combineReducers({
  reduserDataPosts,
  reduserDataPostRequest,
  reduserParameterGetRequest,
  reduserStateFirstLine
});

export default rootReducer;
