import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendGetRequest, setParameterGetRequestPage } from "../../actions";

const Pagination = ({ postsPerPage }) => {
  const dispatch = useDispatch();

  const posts = useSelector(state => state.reduserDataPosts);
  const parametersGetRequest = useSelector(
    state => state.reduserParameterGetRequest
  );

  useEffect(() => {
    document.getElementById("1").classList.add("gray");
  }, []);

  const pageNumbers = [];

  for (
    let i = 1;
    i <= Math.ceil(posts.data.message.total_task_count / postsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <a
              id={number.toString(10)}
              onClick={() => {
                const parentNode = document.activeElement.parentNode.parentNode;
                for (let i = 0; i < parentNode.childNodes.length; i++) {
                  parentNode.childNodes[i].childNodes[0].classList.remove(
                    "gray"
                  );
                }
                document.activeElement.classList.add("gray");
                dispatch(setParameterGetRequestPage(number.toString(10)));
                dispatch(
                  sendGetRequest({
                    url:
                      "https://uxcandy.com/~shapoval/test-task-backend/v2?developer=UsovVitaliy",
                    method: "GET",
                    params: {
                      sort_field: parametersGetRequest.sort_field,
                      sort_direction: parametersGetRequest.sort_direction,
                      page: number.toString(10)
                    }
                  })
                );
              }}
              href="!#"
              className="page-link"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
