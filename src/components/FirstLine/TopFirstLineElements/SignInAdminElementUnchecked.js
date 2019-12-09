import React from "react";

const SignInAdminElementUnchecked = props => {
  return (
    <input
      type="checkbox"
      id="changed-value-status"
      className="is-admin-checkbox"
      name="status"
      onChange={props.onChange}
    ></input>
  );
};

export default SignInAdminElementUnchecked;
