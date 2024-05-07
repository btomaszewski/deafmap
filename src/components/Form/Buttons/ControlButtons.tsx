import { useContext } from "react";
import { FormContext } from "../FormContext";

import "./ButtonStyles.css";

export function BackButton() {
  const { activePage, changeActivePage: changeActivePage } =
    useContext(FormContext);
  return (
    <button
      type="button"
      className="form-button large-button my-2 mx-10 header-3"
      onClick={(e) => {
        e.preventDefault();
        changeActivePage(false);
      }}
    >
      Back
    </button>
  );
}

export function NextButton() {
  const { activePage, changeActivePage } = useContext(FormContext);
  return (
    <button
      type="button"
      className="form-button large-button my-2 mx-10 header-3"
      onClick={(e) => {
        e.preventDefault();
        changeActivePage(true);
      }}
    >
      Next
    </button>
  );
}

export function SubmitButton() {
  return (
    <button
      type="submit"
      className="form-button large-button my-2 mx-10 header-3"
    >
      Submit
    </button>
  );
}
