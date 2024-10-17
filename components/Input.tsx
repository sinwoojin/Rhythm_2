"use client";

import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, PropsWithChildren } from "react";

type InputProps = InputVariantsType & ComponentProps<"input">;

const inputVariants = cva(
  "transition hover:brightness-90 active:brightness-75",
  {
    variants: {
      size: {
        sm: "text-xs px-1.5 py-0.5 font-medium",
        md: "text-base w-full",
        lg: "text-[17px] px-3.5 py-2 font-bold",
      },
      padding: {
        md: "px-4 py-4",
      },
      intent: {
        play: "bg-red-500",
        warning: "bg-yellow-500",
        primary: ["bg-white", "bg-opacity-20"],
        secondary: "bg-gray-400",
      },
      outline: {
        true: "border",
        false: "text-white",
      },
      rounded: {
        normal: "rounded-md",
        pill: "rounded-full",
      },
    },
    compoundVariants: [
      {
        outline: true,
        intent: "primary",
        className: "bg-white text-sky-500 border-sky-500",
      },
    ],
    defaultVariants: {
      size: "md",
      intent: "primary",
      outline: false,
      rounded: "normal",
      padding: "md",
    },
  }
);

type InputVariantsType = VariantProps<typeof inputVariants>;

function Input({
  size,
  padding,
  intent,
  outline,
  rounded,
  children,
  className,
  ...props
}: PropsWithChildren<InputProps>) {
  return (
    <input
      className={inputVariants({
        className,
        padding,
        size,
        intent,
        outline,
        rounded,
      })}
      {...props}
    >
      {children}
    </input>
  );
}

export default Input;
