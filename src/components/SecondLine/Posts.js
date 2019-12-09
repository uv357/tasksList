import React from "react";
import { useDispatch } from "react-redux";
import { setStateFirstLineChangedValue } from "../../actions";

const Posts = ({ posts }) => {
  const dispatch = useDispatch();

  const handlerClick = post => {
    const changedValuesObject = { text: "", status: "", id: "" };
    let selectedElement = document.getElementById(post.id);
    let selectedElementCollection = selectedElement.childNodes;
    selectedElementCollection.forEach(element => {
      if (element.className === "text cell list-group-item width-35") {
        changedValuesObject.text = post.text;
      }
      if (element.className === "status cell list-group-item width-20") {
        changedValuesObject.status = post.status.toString(10);
      }
      changedValuesObject.id = post.id.toString(10);
    });
    dispatch(
      setStateFirstLineChangedValue({ changedValues: changedValuesObject })
    );
  };

  let statusLocal;
  const isDone = status => {
    if (status === 0) statusLocal = "Not done";
    if (status === 10) statusLocal = "Done";
  };

  return (
    <ul className="list-group mb-4">
      {posts.map(post => (
        <li key={post.id}>
          <div
            id={post.id}
            className=" table-result-posts"
            onClick={() => handlerClick(post)}
          >
            <div className="username cell list-group-item width-20">
              {post.username}
            </div>
            <div className="email cell list-group-item width-25">
              {post.email}
            </div>
            <div className="text cell list-group-item width-35">
              {post.text}
            </div>
            <div
              onLoad={isDone(post.status)}
              className="status cell list-group-item width-20"
            >
              {statusLocal}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Posts;
