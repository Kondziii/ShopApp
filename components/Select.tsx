import React, { forwardRef, SelectHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  items: Array<{ title: string; value: number | string }>;
  label?: string;
  error?: FieldError;
  error_caption?: string;
  container_classes?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ items, ...props }, ref) => {
    return (
      <div className={`flex flex-col ${props.container_classes}`}>
        <label htmlFor={props.id}>{props.label}</label>
        <select
          ref={ref}
          {...props}
          className='mt-2 rounded focus:border-yellow-500 focus:ring-yellow-500 ring-offset-yellow-500 '
        >
          <option value={''} className='hidden'>
            {props.placeholder}
          </option>
          {items.map((item) => {
            return (
              <option value={item.value.toString()} key={item.title}>
                {item.title}
              </option>
            );
          })}
        </select>
        {props.error && (
          <small className='text-red-500'>{props.error.message}</small>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
