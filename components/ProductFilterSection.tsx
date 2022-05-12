import { yupResolver } from '@hookform/resolvers/yup';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from './Input';
import yup from '../yup';
import { AppCheckbox } from './AppCheckbox';
import { AppCheckboxGroup } from './AppCheckboxGroup';
import { useFilterState } from './FilterContext';

const searchFormSchema = yup
  .object({
    search: yup.string(),
  })
  .required();

type searchForm = yup.InferType<typeof searchFormSchema>;

export const ProductFilterSection = () => {
  const {
    sexFilterOptions,
    setSexFilterOptions,
    categoryFilterOptions,
    setCategoryFilterOptions,
    generalCategories,
    resetFilters,
    ...filterState
  } = useFilterState();

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<searchForm>({
    resolver: yupResolver(searchFormSchema),
  });

  const onSubmit = handleSubmit((values) => {
    filterState.setSearchValue(values.search || '');
  });

  const handleReset = () => {
    resetFilters();
    reset({
      search: '',
    });
  };

  return (
    <aside className='col-span-3 p-4 bg-white rounded shadow h-fit'>
      <h2 className='text-xl font-semibold md:text-2xl'>Filtry</h2>
      <form onSubmit={onSubmit} className='mt-2'>
        <Input
          id='search'
          {...register('search')}
          placeholder='Wyszukaj...'
          error={errors.search}
          type='text'
        />

        <div className='text-center'>
          <button
            className='w-full px-4 py-2 mx-auto mt-2 text-sm transition-all duration-300 border rounded-full border-slate-700 text-slate-700 hover:bg-slate-700 hover:text-white'
            type='submit'
          >
            Wyszukaj
          </button>
        </div>
      </form>
      <div className='my-2 ml-2'>
        <h3 className='-ml-2 font-semibold text-md'>Płeć:</h3>
        <AppCheckboxGroup
          items={sexFilterOptions}
          setItems={setSexFilterOptions}
        />
      </div>
      {generalCategories.map((category) => (
        <div key={category} className='my-2 ml-2'>
          <h3 className='my-1 -ml-2 font-semibold text-md'>{category}:</h3>
          <AppCheckboxGroup
            items={categoryFilterOptions.filter(
              (item) => item.type === category
            )}
            setItems={setCategoryFilterOptions}
          />
        </div>
      ))}
      <button
        onClick={handleReset}
        className='w-full px-4 py-2 mx-auto mt-2 text-sm transition-all duration-300 border rounded-full border-slate-700 text-slate-700 hover:bg-slate-700 hover:text-white'
        type='button'
      >
        Wyczyść filtry
      </button>
    </aside>
  );
};
