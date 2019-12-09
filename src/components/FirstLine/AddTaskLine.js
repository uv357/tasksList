import React from "react";
import { useDispatch } from "react-redux";
import {
  sendPostRequest,
  setStateFirstLineAddNewTask
} from "../../actions/index";

const AddTaskLine = props => {
  const dispatch = useDispatch();

  let postRequestName;
  let postRequestEmail;
  let postRequestTaskText;
  let postRequestStatus;

  const validEmail = emailAdress => {
    let countAt = 0;
    let countDot = false;
    let count = 0;
    for (let char of emailAdress) {
      if (char === "@") {
        countAt++;
        if (countAt > 1 || count === 0 || count === emailAdress.length - 1)
          return false;
      }
      if (char === ".") {
        countDot = true;
      }
      if (char === " ") {
        return false;
      }
      count++;
    }
    if (!countDot || countAt === 0) {
      return false;
    }
    return true;
  };

  const newTask = () => {
    if (document.getElementById("post-request-name").value) {
      postRequestName = document.getElementById("post-request-name").value;
    } else {
      alert('Fill in the field "Username"');
      return null;
    }
    if (document.getElementById("post-request-email").value) {
      postRequestEmail = document.getElementById("post-request-email").value;
      if (!validEmail(postRequestEmail)) {
        alert("Email is not valid");
        return null;
      }
    } else {
      alert('Fill in the field "E-mail"');
      return null;
    }
    if (document.getElementById("post-request-task-text").value) {
      postRequestTaskText = document.getElementById("post-request-task-text")
        .value;
    } else {
      alert('fill in the field "Task text"');
      return null;
    }
    if (document.getElementById("post-request-status").value) {
      postRequestStatus = document.getElementById("post-request-status").value;
    } else {
      alert('fill in the field "Status"');
      return null;
    }

    const form = new FormData();
    form.append("username", postRequestName);
    form.append("email", postRequestEmail);
    form.append("text", postRequestTaskText);
    form.append("status", postRequestStatus);

    dispatch(
      sendPostRequest({
        url:
          "https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=UsovVitaliy",
        crossDomain: true,
        method: "POST",
        mimeType: "multipart/form-data",
        contentType: false,
        processData: false,
        data: form,
        dataType: "json"
      })
    );
    dispatch(setStateFirstLineAddNewTask({ addNewTask: false }));
  };

  return (
    <div className="wrapper">
      <div className="container mt-5 first-line-header">
        <input
          id="post-request-name"
          className="first-line-button-login"
          placeholder="Username"
          type="text"
        />
        <input
          id="post-request-email"
          className="first-line-button-login"
          placeholder="e-mail"
          type="text"
        />
        <input
          id="post-request-task-text"
          className="first-line-button-login"
          placeholder="task text"
          type="text"
        />
        <input
          id="post-request-status"
          className="first-line-button-login"
          placeholder="status"
          type="text"
        />
        <input
          className="first-line-button-login"
          value="Add New Task"
          onClick={() => newTask()}
          type="button"
        />
      </div>
    </div>
  );
};

export default AddTaskLine;
