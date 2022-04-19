import React, {
  forwardRef,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';
import { FieldError } from 'react-hook-form';

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: FieldError;
  error_caption?: string;
  container_classes?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    return (
      <div className={`flex flex-col ${props.container_classes}`}>
        <label htmlFor={props.id}>{props.label}</label>
        <textarea
          ref={ref}
          {...props}
          className='mt-2 rounded focus:border-yellow-500 focus:ring-yellow-500 ring-offset-yellow-500 '
        />
        {props.error && (
          <small className='text-red-500'>{props.error.message}</small>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
