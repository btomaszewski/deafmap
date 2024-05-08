"use client";
import { ReactElement, useContext } from "react";
import { FormContext } from "../FormContext";
import { useFormStatus } from "react-dom";
import "./ButtonStyles.css";
import { redirect } from "next/navigation";

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
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="form-button large-button my-2 mx-10 header-3"
      disabled={pending}
    >
      Submit
    </button>
  );
}

interface RedirectButtonProps {
  children: ReactElement | ReactElement[];
  destination: string;
}

export function RedirectButton({ children, destination }: RedirectButtonProps) {
  return (
    <button
      className="form-button large-button my-3"
      onClick={(e) => {
        e.preventDefault();
        redirect(destination);
      }}
    >
      {children}
    </button>
  );
}
