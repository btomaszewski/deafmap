"use client";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { ToggleButton } from "../Buttons/ToggleButton";

export type RadioOption = {
  group: string;
  id: string;
  imgPath: string;
  children?: RadioOption[];
};

interface OptionListProps {
  options: Array<RadioOption>;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  isVisible: boolean;
}

export function OptionList({
  options,
  handleChange,
  isVisible,
}: OptionListProps) {
  const [selected, setSelected] = useState("");

  const onSelectedChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value);
    handleChange(e);
  };

  return (
    <ul key={options[0].group + "-list"}>
      {options.map((o, i) => {
        return (
          <li
            key={o.id + "-li"}
            style={{ display: isVisible ? "list-item" : "none" }}
          >
            <ToggleButton
              id={o.id}
              value={o.id}
              name={o.group}
              imgPath={o.imgPath}
              selected={selected}
              handleChange={onSelectedChange}
            />
            {o.children ? (
              <OptionList
                options={o.children}
                handleChange={handleChange}
                isVisible={selected === o.id}
              />
            ) : (
              <></>
            )}
          </li>
        );
      })}
    </ul>
  );
}
