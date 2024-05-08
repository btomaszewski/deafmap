import { ReactElement } from "react";
import { SubmitButton } from "../Buttons/ControlButtons";
import { Question, QuestionState } from "./Question";
import "./QuestionStyles.css";
import "../Buttons/ButtonStyles.css";
interface SummaryProps {
  summaryObjects: ReactElement[];
}

export function Summary({ summaryObjects }: SummaryProps) {
  return (
    <>
      <div key="summary-parent">
        <p key="summary-title" className="header-2 my-8">
          Summary of Your Report
        </p>
        {summaryObjects}
      </div>
      <SubmitButton />
    </>
  );
}

export function SummaryObject({
  title,
  content,
  onEditSelect,
}: {
  title: string;
  content: ReactElement[] | ReactElement;
  onEditSelect: () => void;
}) {
  return (
    <div className="summary-box" key={`${title}-box`}>
      <p className="header-4 mb-2">{title}</p>
      <div className="px-2">{content}</div>
      <button
        className="header-4 small-button form-button mt-7"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          onEditSelect;
        }}
      >
        Edit
      </button>
    </div>
  );
}
