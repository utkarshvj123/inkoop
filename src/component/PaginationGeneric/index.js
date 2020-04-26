import React from "react";
import './style.css';

export default function PaginationGeneric(props) {
  const { totalPageToShow, handlePageChange, prev, next,containerStyle } = props;
  return (
    <div style={containerStyle}>
      <button
        disabled={prev !== "" ? false : true}
        onClick={() => handlePageChange("prev",prev)}
      >
        {"<<"}
      </button>
      {totalPageToShow
        ? totalPageToShow.map((value) => (
            <button className={props.currentSelected === value ? 'active' :null} key={value} onClick={() => handlePageChange(value)}>
              {value}
            </button>
          ))
        : null}
      <button
        onClick={() => handlePageChange("next",next)}
        disabled={next !== "" ? false : true}
      >
        {">>"}
      </button>
    </div>
  );
}
