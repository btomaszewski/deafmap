"use client";
import { ChangeEventHandler, useState } from "react";

import "./ButtonStyles.css";

interface ToggleButtonProps {
  name: string;
  id: string;
  selected: string;
  value: string;
  imgPath: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
}
export function ToggleButton({
  name,
  id,
  selected,
  value,
  imgPath,
  handleChange,
}: ToggleButtonProps) {
  return (
    <>
      <div className="toggle-button-container">
        <label className="header-3">
          <input
            type="radio"
            id={id}
            name={name}
            value={value}
            onChange={handleChange}
            checked={selected === value}
          />
          <div
            className={
              (selected === value
                ? "toggle-button-selected "
                : "toggle-button-unselected ") + "toggle-button-img-container"
            }
          >
            <img src={imgPath} alt={value} />
          </div>
          {value.replace("_", " ")}
        </label>
      </div>
    </>
  );
}
