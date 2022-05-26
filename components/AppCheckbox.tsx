import React, { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { FieldError } from 'react-hook-form';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
  error_caption?: string;
  container_classes?: string;
  custom_label?: ReactNode;
}

interface AppCheckboxLabelProps {
  label: string;
  id: string;
  custom_label?: ReactNode;
}

const Label = (props: AppCheckboxLabelProps) => {
  if (!props.custom_label) {
    return <label htmlFor={props.id}>{props.label}</label>;
  }
  return <>{props.custom_label}</>;
};

export const AppCheckbox = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    return (
      <>
        <div className={`flex items-center gap-2 ${props.container_classes}`}>
          <input
            ref={ref}
            {...props}
            type='checkbox'
            className='rounded checked:bg-yellow-500 hover:checked:bg-yellow-400 active:bg-yellow-500 checked:focus:bg-yellow-500 focus:border-yellow-500 focus:ring-yellow-500 ring-offset-yellow-500'
          />
          <Label
            id={props.id || ''}
            label={props.label || ''}
            custom_label={props.custom_label}
          />
        </div>
        {props.error && (
          <small className='block text-red-500 '>{props.error.message}</small>
        )}
      </>
    );
  }
);

AppCheckbox.displayName = 'AppCheckbox';
