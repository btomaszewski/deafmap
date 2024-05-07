"use client";
import LabeledInput from "@/components/LabeledInput/LabeledInput";
import { useState } from "react";
import { BackButton, NextButton } from "../Buttons/ControlButtons";

import "./QuestionStyles.css";

export function OtherQuestion({
  title,
  imagePath,
  name,
}: {
  title: string;
  imagePath: string;
  name: string;
}) {
  const [inputValue, setInputValue] = useState("");
  return (
    <>
      <div className="centered-box my-8">
        <img src={imagePath} alt={title} className="other-question-icon " />
        <p className="header-2 mt-2 mb-6">{title}</p>
        <LabeledInput
          label="Other"
          value={inputValue}
          name={name}
          onChange={(e) => {
            e.preventDefault();
            setInputValue(e.target.value);
          }}
        />
      </div>
      <div className="centered-box">
        <NextButton />
        <BackButton />
      </div>
    </>
  );
}
