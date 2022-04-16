import React, { forwardRef, InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
  error_caption?: string;
  container_classes?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <div className={`flex flex-col ${props.container_classes}`}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={ref}
        {...props}
        className='mt-2 rounded focus:border-yellow-500 focus:ring-yellow-500 ring-offset-yellow-500 '
      />
      {props.error && (
        <small className='text-red-500'>{props.error.message}</small>
      )}
    </div>
  );
});

Input.displayName = 'Input';
