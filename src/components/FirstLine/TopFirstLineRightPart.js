import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setStateFirstLineSignIn,
  setStateFirstLineSignInAdmin,
  setStateFirstLineSignInUser,
  sendPostRequestSignIn,
  setStateFirstLineBroadCastChannel,
  broadcastChannel
} from "../../actions/index";
import StartSignIn from "./TopFirstLineElements/StartSignIn";
import SignInAdmin from "./TopFirstLineElements/SignInAdmin";
import SignInUser from "./TopFirstLineElements/SignInUser";

const TopFirstLineRightPart = () => {
  const dispatch = useDispatch();

  const stateStore = useSelector(state => state);
  const stateFirstLine = useSelector(state => state.reduserStateFirstLine);

  broadcastChannel.onmessage = bcData => {
    if (bcData.data === "LoadNewTab") {
      broadcastChannel.postMessage({
        signIn: {
          user: stateStore.reduserStateFirstLine.signIn.user,
          password: stateStore.reduserStateFirstLine.signIn.password
        },
        signInAdmin: stateStore.reduserStateFirstLine.signInAdmin,
        signInUser: stateStore.reduserStateFirstLine.signInUser,
        token: stateStore.reduserStateFirstLine.token
      });
    } else {
      dispatch(setStateFirstLineBroadCastChannel(bcData.data));
    }
  };

  useEffect(() => {
    broadcastChannel.postMessage("LoadNewTab");
  }, []);

  let usernameLocal;
  let passwordLocal;

  const signIn = () => {
    usernameLocal = document.getElementById("username").value;
    passwordLocal = document.getElementById("password").value;

    if (usernameLocal === "admin" && passwordLocal) {
      dispatch(setStateFirstLineSignInAdmin({ signInAdmin: true }));
      dispatch(setStateFirstLineSignInUser({ signInUser: false }));
    } else if (usernameLocal && passwordLocal) {
      dispatch(setStateFirstLineSignInAdmin({ signInAdmin: false }));
      dispatch(setStateFirstLineSignInUser({ signInUser: true }));
    } else {
      alert("Fill in the field Username and Password");
      return null;
    }

    dispatch(
      setStateFirstLineSignIn({
        signIn: {
          user: usernameLocal,
          password: passwordLocal
        }
      })
    );

    const form = new FormData();
    form.append("username", usernameLocal);
    form.append("password", passwordLocal);

    dispatch(
      sendPostRequestSignIn({
        url:
          "https://uxcandy.com/~shapoval/test-task-backend/v2/login?developer=UsovVitaliy",
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

  if (!stateFirstLine.signInAdmin && !stateFirstLine.signInUser) {
    return (
      <div className="first-line-right-part">
        <StartSignIn onClick={signIn} />
      </div>
    );
  } else if (stateFirstLine.signInAdmin && stateFirstLine.token) {
    return (
      <div className="first-line-right-part">
        <SignInAdmin onClick={signIn} />
      </div>
    );
  } else if (!stateFirstLine.token && stateFirstLine.signInAdmin) {
    return (
      <div className="first-line-right-part">
        <StartSignIn onClick={signIn} />
      </div>
    );
  } else if (stateFirstLine.signInUser) {
    return (
      <div className="first-line-right-part">
        <SignInUser />
      </div>
    );
  } else {
    return (
      <div className="first-line-right-part">
        <p>Server request in progress</p>
      </div>
    );
  }
};

export default TopFirstLineRightPart;
