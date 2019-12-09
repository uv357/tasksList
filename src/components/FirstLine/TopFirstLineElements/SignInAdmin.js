import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setStateFirstLineChangedValue,
  sendPostRequest,
  setStateFirstLineSignInAdmin,
  broadcastChannel
} from "../../../actions";
import SignInAdminElementChecked from "./SignInAdminElementChecked";
import SignInAdminElementUnchecked from "./SignInAdminElementUnchecked";

const SignInAdmin = () => {
  const dispatch = useDispatch();

  const stateFirstLine = useSelector(state => state.reduserStateFirstLine);

  const changedValuesObject = {
    text: "",
    status: "",
    id: stateFirstLine.changedValues.id,
    token: stateFirstLine.token
  };

  const signOut = () => {
    dispatch(setStateFirstLineSignInAdmin({ signInAdmin: false }));
    broadcastChannel.postMessage({
      signInAdmin: false,
      token: null
    });
  };

  const setChangedValue = () => {
    changedValuesObject.text = document.getElementById(
      "changed-value-text"
    ).value;
    if (document.getElementById("changed-value-status").checked) {
      changedValuesObject.status = "10";
    } else {
      changedValuesObject.status = "0";
    }
    dispatch(
      setStateFirstLineChangedValue({ changedValues: changedValuesObject })
    );
  };

  const sendPostRequestChangeValue = () => {
    if (
      stateFirstLine.changedValues.status !== "0" &&
      stateFirstLine.changedValues.status !== "10"
    ) {
      alert("Value of Status is vrong");
      return null;
    }

    const form = new FormData();
    form.append("text", stateFirstLine.changedValues.text);
    form.append("status", stateFirstLine.changedValues.status);
    form.append("token", stateFirstLine.changedValues.token);

    dispatch(
      sendPostRequest({
        url: `https://uxcandy.com/~shapoval/test-task-backend/v2/edit/${stateFirstLine.changedValues.id}?developer=UsovVitaliy`,
        crossDomain: true,
        method: "POST",
        mimeType: "multipart/form-data",
        contentType: false,
        processData: false,
        data: form,
        dataType: "json"
      })
    );
  };

  if (stateFirstLine.changedValues.status === "10") {
    return (
      <div className="is-admin">
        <div className="first-line">
          <span className="hi-user">Hi, Admin</span>
          <input
            className="first-line-login"
            value="Sign Out"
            onClick={signOut}
            type="button"
          />
        </div>
        <div className="first-line">
          <input
            id="changed-value-text"
            className="is-admin-input"
            value={stateFirstLine.changedValues.text}
            onChange={setChangedValue}
            placeholder="Changed value - Text"
            type="text"
          />
          <SignInAdminElementChecked onChange={setChangedValue} />
        </div>
        <input
          className="first-line-change"
          value="Edit tasks"
          onClick={sendPostRequestChangeValue}
          type="button"
        />
      </div>
    );
  } else {
    return (
      <div className="is-admin">
        <div className="first-line">
          <span className="hi-user">Hi, Admin</span>
          <input
            className="first-line-login"
            value="Sign Out"
            onClick={signOut}
            type="button"
          />
        </div>
        <div className="first-line">
          <input
            id="changed-value-text"
            className="is-admin-input"
            value={stateFirstLine.changedValues.text}
            onChange={setChangedValue}
            placeholder="Changed value - Text"
            type="text"
          />
          <SignInAdminElementUnchecked onChange={setChangedValue} />
        </div>
        <input
          className="first-line-change"
          value="Edit tasks"
          onClick={sendPostRequestChangeValue}
          type="button"
        />
      </div>
    );
  }
};

export default SignInAdmin;
