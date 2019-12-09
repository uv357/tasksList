import axios from "axios";
import { setDataPosts_, SET_DATA_POSTS_ } from "./actionReduserDataPosts";
import {
  SET_DATA_POST_REQUEST_,
  setDataPostRequest_
} from "./actionReduserDataPostRequest";
import {
  SET_PARAMETER_GET_REQUEST_SORT_FIELD_,
  setParameterGetRequestSortField_,
  SET_PARAMETER_GET_REQUEST_SORT_DIRECTION_,
  setParameterGetRequestSortDirection_,
  SET_PARAMETER_GET_REQUEST_PAGE_,
  setParameterGetRequestPage_
} from "./actionReduserParametrGetRequest";
import {
  SET_STATE_FIRST_LINE_SIGN_IN_,
  setStateFirstLineSignIn_,
  SET_STATE_FIRST_LINE_CHANGED_VALUE_,
  setStateFirstLineChangedValue_,
  SET_STATE_FIRST_LINE_ADD_NEW_TASK_,
  setStateFirstLineAddNewTask_,
  SET_STATE_FIRST_LINE_CHENGE_TASK_,
  setStateFirstLineChengeTask_,
  SET_STATE_FIRST_LINE_SIGN_IN_ADMIN_,
  setStateFirstLineSignInAdmin_,
  SET_STATE_FIRST_LINE_SIGN_IN_USER_,
  setStateFirstLineSignInUser_,
  SET_STATE_FIRST_LINE_TOKEN_,
  setStateFirstLineToken_,
  SET_STATE_FIRST_LINE_BROAD_CAST_CHANNEL_,
  setStateFirstLineBroadCastChannel_
} from "./actionReduserStateFirstLine";

export const SET_DATA_POSTS = SET_DATA_POSTS_;
export const setDataPosts = setDataPosts_;

export const SET_DATA_POST_REQUEST = SET_DATA_POST_REQUEST_;
export const setDataPostRequest = setDataPostRequest_;

export const SET_PARAMETER_GET_REQUEST_SORT_FIELD = SET_PARAMETER_GET_REQUEST_SORT_FIELD_;
export const setParameterGetRequestSortField = setParameterGetRequestSortField_;
export const SET_PARAMETER_GET_REQUEST_SORT_DIRECTION = SET_PARAMETER_GET_REQUEST_SORT_DIRECTION_;
export const setParameterGetRequestSortDirection = setParameterGetRequestSortDirection_;
export const SET_PARAMETER_GET_REQUEST_PAGE = SET_PARAMETER_GET_REQUEST_PAGE_;
export const setParameterGetRequestPage = setParameterGetRequestPage_;

export const SET_STATE_FIRST_LINE_SIGN_IN = SET_STATE_FIRST_LINE_SIGN_IN_;
export const setStateFirstLineSignIn = setStateFirstLineSignIn_;
export const SET_STATE_FIRST_LINE_CHANGED_VALUE = SET_STATE_FIRST_LINE_CHANGED_VALUE_;
export const setStateFirstLineChangedValue = setStateFirstLineChangedValue_;
export const SET_STATE_FIRST_LINE_ADD_NEW_TASK = SET_STATE_FIRST_LINE_ADD_NEW_TASK_;
export const setStateFirstLineAddNewTask = setStateFirstLineAddNewTask_;
export const SET_STATE_FIRST_LINE_CHENGE_TASK = SET_STATE_FIRST_LINE_CHENGE_TASK_;
export const setStateFirstLineChengeTask = setStateFirstLineChengeTask_;
export const SET_STATE_FIRST_LINE_SIGN_IN_ADMIN = SET_STATE_FIRST_LINE_SIGN_IN_ADMIN_;
export const setStateFirstLineSignInAdmin = setStateFirstLineSignInAdmin_;
export const SET_STATE_FIRST_LINE_SIGN_IN_USER = SET_STATE_FIRST_LINE_SIGN_IN_USER_;
export const setStateFirstLineSignInUser = setStateFirstLineSignInUser_;
export const SET_STATE_FIRST_LINE_TOKEN = SET_STATE_FIRST_LINE_TOKEN_;
export const setStateFirstLineToken = setStateFirstLineToken_;
export const SET_STATE_FIRST_LINE_BROAD_CAST_CHANNEL = SET_STATE_FIRST_LINE_BROAD_CAST_CHANNEL_;
export const setStateFirstLineBroadCastChannel = setStateFirstLineBroadCastChannel_;

export const broadcastChannel = new BroadcastChannel("Sign In/Sign Out");

export function sendPostRequest(data) {
  return (dispatch, useSelector) => {
    const stateStore = useSelector(state => state);
    return axios(data)
      .then(responsePost => {
        dispatch(setDataPostRequest({ dataPostRequest: responsePost }));
        alert("Data successfully uploaded to server");
      })
      .then(() => {
        setTimeout(() => {
          dispatch(
            sendGetRequest({
              url:
                "https://uxcandy.com/~shapoval/test-task-backend/v2?developer=UsovVitaliy",
              method: "GET",
              params: stateStore.reduserParameterGetRequest
            })
          );
        }, 100);
      })
      .catch(responsePost => console.log("error", responsePost));
  };
}

export function sendPostRequestSignIn(data) {
  return (dispatch, useSelector) => {
    const stateStore = useSelector(state => state);
    dispatch(setDataPostRequest({ token: null }));
    dispatch(setDataPostRequest({ dataPostRequest: null }));
    return axios(data)
      .then(responsePost => {
        if (responsePost.data.message.token) {
          dispatch(
            setStateFirstLineToken({ token: responsePost.data.message.token })
          );
        } else {
          if (stateStore.reduserStateFirstLine.signInAdmin) {
            alert("Password for admin is wrong");
          }
        }
        dispatch(setDataPostRequest({ dataPostRequest: responsePost }));
        broadcastChannel.postMessage({
          signIn: {
            user: stateStore.reduserStateFirstLine.signIn.user,
            password: stateStore.reduserStateFirstLine.signIn.password
          },
          signInAdmin: stateStore.reduserStateFirstLine.signInAdmin,
          signInUser: stateStore.reduserStateFirstLine.signInUser,
          token: responsePost.data.message.token
        });
      })
      .catch(responsePost => console.log("error", responsePost));
  };
}

export function sendGetRequest(data) {
  return dispatch => {
    return axios(data)
      .then(responseGet => {
        dispatch(setDataPosts(responseGet));
      })
      .catch(responseGet => console.log("error", responseGet));
  };
}
