import React, {
  ChangeEventHandler,
  EventHandler,
  ReactNode,
  useState,
} from 'react';
import { AppCheckbox } from './AppCheckbox';

interface AppCheckboxGroupProps {
  items: { title: string; value: string; checked: boolean }[];
  setItems: React.Dispatch<
    React.SetStateAction<
      {
        title: string;
        value: string;
        checked: boolean;
      }[]
    >
  >;
  flat?: boolean;
}

export const AppCheckboxGroup = ({
  items,
  setItems,
  flat,
}: AppCheckboxGroupProps) => {
  if (!items) {
    return null;
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setItems((prevItems) => {
      return prevItems.map((item) =>
        item.value === e.target.value
          ? { ...item, checked: e.target.checked }
          : item
      );
    });
  };

  if (flat) {
    return (
      <div className='space-x-2'>
        {items.map((item) => (
          <span key={item.title} className='first:ml-2'>
            <input
              id={item.title}
              type='checkbox'
              onChange={handleChange}
              value={item.value}
              className='hidden rounded peer checked:bg-yellow-500 hover:checked:bg-yellow-400 active:bg-yellow-500 checked:focus:bg-yellow-500 focus:border-yellow-500 focus:ring-yellow-500 ring-offset-yellow-500'
            />
            <label
              className='inline-block px-2 py-1 mb-2 text-xs transition rounded-full shadow cursor-pointer first:ml-2 peer-checked:bg-slate-700 peer-checked:text-white hover:opacity-80 bg-slate-200 '
              htmlFor={item.title}
            >
              {item.title}
            </label>
          </span>
        ))}
      </div>
    );
  }

  return (
    <>
      {items.map((item) => (
        <AppCheckbox
          container_classes='my-1'
          key={item.value}
          id={item.value}
          label={item.title}
          value={item.value}
          onChange={handleChange}
          checked={item.checked}
        />
      ))}
    </>
  );
};
