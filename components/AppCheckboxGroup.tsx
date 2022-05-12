import React, { ChangeEventHandler, EventHandler, useState } from 'react';
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
}

export const AppCheckboxGroup = ({
  items,
  setItems,
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
