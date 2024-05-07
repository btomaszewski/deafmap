"use client";

import { ChangeEventHandler, ReactElement } from "react";

import "./LabeledInput.css";

interface LabeledInputProps {
  label?: string;
  pattern?: string;
  value: string | number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  type?: string;
  name?: string;
  id?: string;
}

export default function LabeledInput({
  label,
  pattern,
  value,
  onChange,
  type,
  name,
  id,
}: LabeledInputProps) {
  return (
    <div className="labeled-input-container">
      <input
        onChange={onChange}
        pattern={pattern}
        value={value}
        type={type}
        name={name}
        id={id}
      />
      <label className={value ? "input-filled" : ""}>{label}</label>
    </div>
  );
}
