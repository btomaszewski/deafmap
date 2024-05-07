import { ReactElement } from "react";

export type QuestionState = { [index: string]: string };
export interface QuestionProps {
  state: QuestionState;
  active: boolean;
  children?: ReactElement | ReactElement[];
}
export function Question({ state, active, children }: QuestionProps) {
  return (
    <div
      style={{ display: active ? "grid" : "none" }}
      className="question-layout"
    >
      {children}
    </div>
  );
}
