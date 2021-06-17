import React from "react";
function Button({clickFunc, cssid, buttonName}) {
  return (
    <div>
      <button
        onClick={clickFunc}
        id={cssid}
      >
        {buttonName}
      </button>
    </div>
  );
}
export default Button;

