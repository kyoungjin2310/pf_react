import React from "react";

const NewsForm = ({ className, Children, btnCancel, btnSave }) => {
  return (
    <article className={className}>
      <div className="inputBox">{Children}</div>
      <div className="btnSet">
        <button onClick={btnCancel}>CANCEL</button>
        <button onClick={btnSave}>SAVE</button>
      </div>
    </article>
  );
};

export default NewsForm;
