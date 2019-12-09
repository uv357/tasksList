import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setDataPosts } from "../actions";
import FirstLine from "./FirstLine/FirstLine";
import SecondLine from "./SecondLine/SecondLine";
import "../index.css";

const AsyncApp = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.reduserDataPosts);

  const [didMount, setDidMount] = useState(false);
  const [dataRequest, setDataRequest] = useState({});

  const sendGetRequest = () => {
    axios({
      url: "https://uxcandy.com/~shapoval/test-task-backend/v2",
      method: "GET",
      params: {
        developer: "UsovVitaliy",
        sort_field: "id",
        sort_direction: "asc",
        page: "1"
      }
    })
      .then(response => {
        setDataRequest(response);
        setDidMount(true);
      })
      .catch(response => console.log("error", response));
  };

  useEffect(() => {
    document.location.href = "!#";
  }, []);

  useEffect(() => {
    sendGetRequest();
  }, []);

  if (didMount) {
    dispatch(setDataPosts(dataRequest));
    setDidMount(false);
  }

  if (posts.data) {
    return (
      <div>
        <FirstLine />
        <SecondLine />
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default AsyncApp;
