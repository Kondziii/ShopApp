import React, { forwardRef, InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
  error_caption?: string;
  container_classes?: string;
}

export const AppCheckbox = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    return (
      <div className={`flex items-center gap-2 ${props.container_classes}`}>
        <input
          ref={ref}
          {...props}
          type='checkbox'
          className='checked:bg-yellow-500 hover:checked:bg-yellow-400 active:bg-yellow-500 checked:focus:bg-yellow-500 rounded focus:border-yellow-500 focus:ring-yellow-500 ring-offset-yellow-500'
        />
        <label htmlFor={props.id}>{props.label}</label>
        {props.error && (
          <small className='text-red-500'>{props.error.message}</small>
        )}
      </div>
    );
  }
);

AppCheckbox.displayName = 'AppCheckbox';
