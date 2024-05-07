"use client";
import Image from "next/image";
import "./SearchBar.css";
import { ChangeEventHandler } from "react";
import { onValue } from "firebase/database";

interface SearchBarProps {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value: string;
}

export function SearchBar({ onChange, value }: SearchBarProps) {
  return (
    <div className="search-bar-container">
      <input onChange={onChange} value={value} />
      <a className={value ? "search-text-hidden" : "search-text"}>Search</a>
      <Image
        src="./Search_Icon.svg"
        alt="search icon"
        width={20}
        height={20}
        className="search-icon"
      />
    </div>
  );
}
