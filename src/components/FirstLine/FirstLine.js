import React from "react";
import { useSelector } from "react-redux";
import AddTaskLine from "./AddTaskLine";
import TopFirstLineLeftPart from "./TopFirstLineLeftPart";
import TopFirstLineRightPart from "./TopFirstLineRightPart";

const FirstLine = () => {
  const stateFirstLine = useSelector(state => state.reduserStateFirstLine);

  if (!stateFirstLine.addNewTask) {
    return (
      <div className="container mt-5">
        <div className=" mt-5 first-line-header">
          <TopFirstLineLeftPart />
          <TopFirstLineRightPart />
        </div>
      </div>
    );
  } else {
    return (
      <div className="container mt-5">
        <div className=" mt-5 first-line-header">
          <TopFirstLineLeftPart />
          <TopFirstLineRightPart />
        </div>
        <AddTaskLine />
      </div>
    );
  }
};

export default FirstLine;
