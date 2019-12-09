import React from "react";
import { useDispatch } from "react-redux";
import { setStateFirstLineAddNewTask } from "../../actions/index";

const TopFirstLineLeftPart = () => {
  const dispatch = useDispatch();

  return (
    <div className="first-line">
      <input
        className="first-line-add-task"
        value="Add the new task"
        onClick={() => {
          dispatch(setStateFirstLineAddNewTask({ addNewTask: true }));
        }}
        type="button"
      />
    </div>
  );
};

export default TopFirstLineLeftPart;
