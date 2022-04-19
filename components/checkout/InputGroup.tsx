import React, { FieldsetHTMLAttributes } from 'react';
import {
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';
import { Input, InputProps } from '../Input';
import { Select } from '../Select';

export interface InputGroupProps<T extends FieldValues>
  extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
  title?: string;
  register: UseFormRegister<T>;
  errors: Partial<DeepMap<T, FieldError>>;
  fields: Array<
    {
      name: string;
      options?: Array<{ title: string; value: number | string }>;
    } & InputProps
  >;
}
export const InputGroup = <T extends FieldValues>({
  register,
  errors,
  title,
  fields,
  ...props
}: InputGroupProps<T>) => {
  return (
    <fieldset
      className={`grid grid-cols-2 gap-x-6 ${props.className}`}
      {...props}
    >
      <legend className='col-span-2 mb-2 text-xl font-bold tracking-wide'>
        {title}
      </legend>

      {fields.map((field) => {
        if (field.type !== 'select') {
          return (
            <Input
              key={field.id}
              container_classes={field.container_classes}
              {...register(field.name as Path<T>)}
              type={field.type}
              id={field.name}
              autoComplete={field.autoComplete}
              label={field.label}
              placeholder={field.placeholder}
              error={errors[field.name]}
            ></Input>
          );
        } else if (field.type === 'select') {
          return (
            <Select
              key={field.id}
              container_classes={field.container_classes}
              items={field.options!}
              {...register(field.name as Path<T>)}
              id={field.id}
              label={field.label}
              placeholder={field.placeholder}
              error={errors[field.name]}
            />
          );
        }
      })}
    </fieldset>
  );
};
