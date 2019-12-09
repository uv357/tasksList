import React from "react";

const StartSignIn = props => {
  return (
    <div className="first-line-right">
      <input
        id="username"
        className="first-line-login"
        placeholder="Userame"
        type="text"
      />
      <input
        id="password"
        className="first-line-login"
        placeholder="Password"
        type="password"
      />
      <input
        className="first-line-login"
        value="Sign In"
        onClick={() => {
          props.onClick();
        }}
        type="button"
      />
    </div>
  );
};

export default StartSignIn;
