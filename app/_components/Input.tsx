"use client";

import { ComponentProps } from "react";

interface InputProps {
  id: string;
  type: string;
  width: string;
  height: string;
  value?: string;
  labelValue: string;
  onchange?: () => void;
  ref?: ComponentProps<"input">["ref"];
}

/**
 *
 * 크기 조정시 w, h 붙여서 작성 예) w-[100px]
 *
 *  지정가능
 */
function Input(props: InputProps) {
  return (
    <>
      <label htmlFor={props.id}>{props.labelValue}</label>
      <input
        id={props.id}
        type={props.type}
        className={`${props.width} ${props.height} border border-black`}
        onChange={props.onchange}
        value={props.value}
        ref={props.ref}
      />
    </>
  );
}

export default Input;
