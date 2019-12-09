import React, { useState } from "react";
import { useSelector } from "react-redux";
import Posts from "./Posts";
import Pagination from "./Pagination";
import SecondLineHeaderElement from "./SecondLineHeaderElement";

const SecondLine = () => {
  const posts = useSelector(state => state.reduserDataPosts);
  const postsTasks = posts.data.message.tasks;

  const [postsPerPage] = useState(3);

  return (
    <div className="container mt-5">
      <h2 className="text-primary mb-3">Task List</h2>
      <div className=" table-title table-result-posts">
        <SecondLineHeaderElement typeHeaderElement="username" />
        <SecondLineHeaderElement typeHeaderElement="email" />
        <div className="cell-title-simple width-35">
          <div>Task text</div>
        </div>
        <SecondLineHeaderElement typeHeaderElement="status" />
      </div>
      <Posts posts={postsTasks} />
      <Pagination postsPerPage={postsPerPage} />
    </div>
  );
};

export default SecondLine;
