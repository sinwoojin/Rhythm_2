"use client";
import { useState } from "react";
import { FaCheckSquare, FaSquare } from "react-icons/fa";

function PublicCheckButton() {
  const [isClickedCheck, setIsClickedCheck] = useState(false);
  const handleClickCheckButton = () => {
    setIsClickedCheck((prev) => !prev);
  };
  return (
    <button onClick={handleClickCheckButton}>
      <span className="text-3xl opacity-20">
        {isClickedCheck ? <FaCheckSquare /> : <FaSquare />}
      </span>
    </button>
  );
}

export default PublicCheckButton;
