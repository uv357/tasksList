import React from "react";

const SignInAdminElementChecked = props => {
  return (
    <input
      type="checkbox"
      id="changed-value-status"
      className="is-admin-checkbox"
      name="status"
      onChange={props.onChange}
      checked
    ></input>
  );
};

export default SignInAdminElementChecked;
