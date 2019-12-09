import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setStateFirstLineSignInUser,
  broadcastChannel
} from "../../../actions";

const SignInUser = props => {
  const dispatch = useDispatch();

  const stateFirstLine = useSelector(state => state.reduserStateFirstLine);

  const signOut = () => {
    dispatch(setStateFirstLineSignInUser({ signInUser: false }));
    broadcastChannel.postMessage({
      signInUser: false
    });
  };

  return (
    <div className="first-line">
      <span className="hi-user">Hi, {stateFirstLine.signIn.user}</span>
      <input
        className="first-line-login"
        value="Sign Out"
        onClick={signOut}
        type="button"
      />
    </div>
  );
};
export default SignInUser;
