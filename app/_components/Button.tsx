"use client";

import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, PropsWithChildren } from "react";

type ButtonProps = ButtonVariantsType & ComponentProps<"button">;

const buttonVariants = cva(
	"transition hover:brightness-90 active:brightness-75",
	{
		variants: {
			size: {
				sm: "text-xs px-1.5 py-0.5 font-medium",
				md: "text-[15px] px-2.5 py-1 font-semibold",
				lg: "text-[17px] px-3.5 py-2 font-bold",
			},
			intent: {
				play: "bg-red-500",
				spotify: "bg-green-500 hover:-translate-y-2 transition-all",
				warning: "bg-yellow-500",
				primary: ["bg-white", "bg-opacity-20"],
				secondary: "bg-gray-400",
				none: "bg-none",
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
		},
	}
);

type ButtonVariantsType = VariantProps<typeof buttonVariants>;

function Button({
	size,
	intent,
	outline,
	rounded,
	children,
	className,
	...props
}: PropsWithChildren<ButtonProps>) {
	return (
		<button
			className={buttonVariants({
				className,
				size,
				intent,
				outline,
				rounded,
			})}
			{...props}
		>
			{children}
		</button>
	);
}

export default Button;
