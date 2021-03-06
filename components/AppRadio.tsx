import React, { forwardRef, InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
  error_caption?: string;
  container_classes?: string;
  is_btn_visible?: boolean;
}

export const AppRadio = forwardRef<HTMLInputElement, InputProps>(
  ({ is_btn_visible, ...props }, ref) => {
    if (is_btn_visible) {
      return (
        <div
          className={`inline-flex flex-col items-center gap-2 ${
            props.container_classes || ''
          }`}
        >
          <input
            ref={ref}
            {...props}
            type='radio'
            value={props.value}
            className='hidden rounded-full peer checked:bg-slate-500 hover:checked:bg-slate-400 active:bg-slate-500 checked:focus:bg-slate-500 focus:border-slate-500 focus:ring-slate-500 ring-offset-slate-500'
          />
          <label
            className='px-4 py-2 text-lg transition duration-300 bg-gray-200 border rounded-full cursor-pointer peer-checked:border-slate-900 peer-checked:bg-slate-700 peer-checked:text-white hover:bg-gray-300 '
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
      <div
        className={`flex items-center gap-2 ${props.container_classes || ''}`}
      >
        <input
          ref={ref}
          {...props}
          type='radio'
          className='rounded-full checked:bg-yellow-500 hover:checked:bg-yellow-400 active:bg-yellow-500 checked:focus:bg-yellow-500 focus:border-yellow-500 focus:ring-yellow-500 ring-offset-yellow-500'
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
