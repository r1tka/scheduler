import React from "react";
import className from "classnames";
import "components/Button.scss";

export default function Button({ confirm, danger, disabled, onClick, children }) {

  let buttonClass = className("button",
    {
      "button--confirm": confirm,
      "button--danger": danger
    }
  );

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}