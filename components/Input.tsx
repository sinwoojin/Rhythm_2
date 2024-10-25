'use client';

import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps, PropsWithChildren } from 'react';

const inputVariants = cva(
  'transition hover:brightness-90 active:brightness-75',
  {
    variants: {
      size: {
        sm: 'text-xs px-1.5 py-0.5 font-medium',
        md: 'text-base w-full',
        lg: 'text-[17px] px-3.5 py-2 font-bold',
      },
      padding: {
        md: 'px-4 py-4',
      },
      intent: {
        primary: 'bg-white bg-opacity-20',
      },
      rounded: {
        normal: 'rounded-md',
        pill: 'rounded-full',
      },
    },
    defaultVariants: {
      size: 'md',
      intent: 'primary',
      rounded: 'normal',
      padding: 'md',
    },
  },
);

function Input({
  size,
  padding,
  intent,
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
        rounded,
      })}
      {...props}
    >
      {children}
    </input>
  );
}

type InputVariantsType = VariantProps<typeof inputVariants>;
type InputProps = InputVariantsType & Omit<ComponentProps<'input'>, 'size'>;

export default Input;
