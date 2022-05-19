import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from './Input';
import yup from '../yup';
import { AppCheckboxGroup } from './AppCheckboxGroup';
import { useFilterState } from './FilterContext';
import Slider from 'rc-slider';

const searchFormSchema = yup
  .object({
    search: yup.string(),
  })
  .required();

type searchForm = yup.InferType<typeof searchFormSchema>;

export const ProductFilterSection = () => {
  const [renderKey, setRenderKey] = useState(0);
  const {
    sexFilterOptions,
    setSexFilterOptions,
    categoryFilterOptions,
    setCategoryFilterOptions,
    generalCategories,
    resetFilters,
    priceFilters,
    setPriceFilters,
    priceRange,
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
    setPrices([...priceRange]);
    setRenderKey((val) => val + 1);
    resetFilters();
    reset({
      search: '',
    });
    console.log('hvg', prices);
  };

  const [prices, setPrices] = useState<Array<number>>([0, 5000]);

  useEffect(() => {
    if (priceRange) {
      setPrices([...priceRange]);
    }
  }, [priceRange]);

  const handleChangePrice = (values: number | number[]) => {
    if (typeof values !== 'number') {
      setPrices([...values]);
    }
  };

  return (
    <aside className='col-span-3 p-4 bg-white rounded shadow sm:p-8 h-fit min-w-[150px] '>
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

      {priceFilters && (
        <div
          className='my-2 ml-2'
          onMouseLeave={() => setPriceFilters([...prices])}
          key={renderKey}
        >
          <h3 className='-ml-2 font-semibold text-md'>Cena:</h3>
          <Slider
            range
            min={priceRange[0]}
            max={priceRange[1]}
            defaultValue={priceRange}
            trackStyle={{ background: '#334155', height: '5px' }}
            activeDotStyle={{ boxShadow: '0 0 0 5px #334155' }}
            handleStyle={{
              borderColor: '#334155',
              height: '16px',
              width: '16px',
              boxShadow: '0 0 0 1px rgba(51, 65, 85, 0.3)',
            }}
            railStyle={{ height: '5px' }}
            className='mt-2 mb-8'
            onChange={handleChangePrice}
            marks={{
              [priceRange[0]]: Math.round(prices[0] / 100) + 'zł',
              [priceRange[1]]: Math.round(prices[1] / 100) + 'zł',
            }}
          />
        </div>
      )}

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
