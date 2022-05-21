import React, { forwardRef, InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
  error_caption?: string;
  container_classes?: string;
  invisible?: boolean;
}

export const AppRadio = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    if (props.invisible) {
      return (
        <div
          className={`inline-flex items-center gap-2 ${props.container_classes}`}
        >
          <input
            ref={ref}
            {...props}
            type='radio'
            className='hidden peer checked:bg-yellow-500 hover:checked:bg-yellow-400 active:bg-yellow-500 checked:focus:bg-yellow-500 rounded-full focus:border-yellow-500 focus:ring-yellow-500 ring-offset-yellow-500'
          />
          <label
            className='border peer-checked:border-yellow-700 peer-checked:bg-yellow-200 peer-checked:text-yellow-700 text-lg px-4 cursor-pointer hover:bg-gray-300 transition duration-300 py-2 rounded-full bg-gray-200 '
            htmlFor={props.id}
          >
            {props.label}
          </label>
          {props.error && (
            <small className='text-red-500'>{props.error.message}</small>
          )}
        </div>
      );
    }

    return (
      <div className={`flex items-center gap-2 ${props.container_classes}`}>
        <input
          ref={ref}
          {...props}
          type='radio'
          className='checked:bg-yellow-500 hover:checked:bg-yellow-400 active:bg-yellow-500 checked:focus:bg-yellow-500 rounded-full focus:border-yellow-500 focus:ring-yellow-500 ring-offset-yellow-500'
        />
        <label htmlFor={props.id}>{props.label}</label>
        {props.error && (
          <small className='text-red-500'>{props.error.message}</small>
        )}
      </div>
    );
  }
);

AppRadio.displayName = 'AppRadio';
