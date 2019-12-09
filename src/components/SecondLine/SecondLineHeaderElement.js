import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  sendGetRequest,
  setParameterGetRequestSortDirection,
  setParameterGetRequestSortField
} from "../../actions";

const SecondLineHeaderElement = props => {
  const dispatch = useDispatch();

  const parametersGetRequest = useSelector(
    state => state.reduserParameterGetRequest
  );

  const requestParameters = {
    sort_field: parametersGetRequest.sort_field,
    sort_direction: parametersGetRequest.sort_direction,
    page: parametersGetRequest.page
  };

  let title;
  let style = "cell-title";

  if (props.typeHeaderElement === "username") {
    title = "Username";
    style = style.concat(" width-20");
    requestParameters.sort_field = "username";
  }

  if (props.typeHeaderElement === "email") {
    title = "E-mail";
    style = style.concat(" width-25");
    requestParameters.sort_field = "email";
  }

  if (props.typeHeaderElement === "status") {
    title = "Status";
    style = style.concat(" width-20");
    requestParameters.sort_field = "status";
  }

  const setFilterId = direction => {
    requestParameters.sort_direction = direction;
    dispatch(setParameterGetRequestSortField(requestParameters.sort_field));
    dispatch(setParameterGetRequestSortDirection(direction));
    dispatch(
      sendGetRequest({
        url:
          "https://uxcandy.com/~shapoval/test-task-backend/v2?developer=UsovVitaliy",
        method: "GET",
        params: {
          sort_field: requestParameters.sort_field,
          sort_direction: requestParameters.sort_direction,
          page: requestParameters.page
        }
      })
    );
  };

  return (
    <div className={style}>
      <div className="cell-title-value">{title}</div>
      <div className="filter">
        <div
          className="filter-button"
          onClick={() => {
            const parentNode =
              document.activeElement.parentNode.parentNode.parentNode
                .parentNode;
            for (let i = 0; i < parentNode.childNodes.length; i++) {
              if (
                parentNode.childNodes[i].className === "cell-title width-20" ||
                parentNode.childNodes[i].className === "cell-title width-25"
              ) {
                parentNode.childNodes[
                  i
                ].childNodes[1].childNodes[0].childNodes[0].classList.remove(
                  "gray"
                );
                parentNode.childNodes[
                  i
                ].childNodes[1].childNodes[0].childNodes[0].classList.add(
                  "white"
                );
                parentNode.childNodes[
                  i
                ].childNodes[1].childNodes[0].childNodes[1].classList.remove(
                  "gray"
                );
                parentNode.childNodes[
                  i
                ].childNodes[1].childNodes[0].childNodes[1].classList.add(
                  "white"
                );
              }
            }
            document.activeElement.classList.remove("white");
            document.activeElement.classList.add("gray");
          }}
        >
          <input
            className="filter-button white"
            type="button"
            onClick={() => {
              setFilterId("asc");
            }}
            value="ASC"
          />
          <input
            className="filter-button white"
            type="button"
            onClick={() => {
              setFilterId("desc");
            }}
            value="DESC"
          />
        </div>
        <div className="filter-button"></div>
      </div>
    </div>
  );
};

export default SecondLineHeaderElement;
