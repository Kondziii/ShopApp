import { ApolloQueryResult } from '@apollo/client';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  GetAllCategoriesDocument,
  GetAllCategoriesQuery,
  GetAllCategoriesQueryVariables,
  GetCategoryFiltersDocument,
  GetCategoryFiltersQuery,
  GetCategoryFiltersQueryVariables,
  GetSexFiltersDocument,
  GetSexFiltersQuery,
  GetSexFiltersQueryVariables,
} from '../generated/graphql';
import { apolloClient } from '../graphql/graphqlClient';

const resetFilterArrays = (array: filterBoxType[]) => {
  return array.map((item) => {
    return {
      ...item,
      checked: false,
    };
  });
};

interface filterBoxType {
  title: string;
  value: string;
  checked: boolean;
  type?: string;
}

interface FilterState {
  sexFilterOptions: Array<filterBoxType>;
  setSexFilterOptions: Dispatch<SetStateAction<filterBoxType[]>>;
  searchValue: String;
  setSearchValue: Dispatch<SetStateAction<string>>;
  categoryFilterOptions: Array<filterBoxType>;
  setCategoryFilterOptions: Dispatch<SetStateAction<filterBoxType[]>>;
  generalCategories: Array<string>;
  resetFilters: () => void;
}

const optionCaption = (val: String) => {
  switch (val) {
    case 'MAN':
      return 'Mężczyzna';
    case 'WOMAN':
      return 'Kobieta';
    case 'CHILD':
      return 'Dziecko';
    case 'UNISEX':
      return 'Uniwersalne';
    default:
      return '';
  }
};

const FilterContext = createContext<FilterState | null>(null);

export const FilterContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [sexFilterOptions, setSexFilterOptions] = useState<filterBoxType[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [categoryFilterOptions, setCategoryFilterOptions] = useState<
    filterBoxType[]
  >([]);

  const [generalCategories, setGeneralCategories] = useState<Array<string>>([]);

  useEffect(() => {
    getFilterOptions();
    getGeneralCategories();
    getCategoryFilterOptions();
  }, []);

  const getFilterOptions = async () => {
    const options = await apolloClient.query<
      GetSexFiltersQuery,
      GetSexFiltersQueryVariables
    >({
      query: GetSexFiltersDocument,
    });
    if (options.data.sexOptions && options.data.sexOptions.enumValues) {
      setSexFilterOptions(
        options.data.sexOptions.enumValues?.map((item) => ({
          title: optionCaption(item.name),
          value: item.name,
          checked: false,
        }))
      );
    }
  };

  const getCategoryFilterOptions = async () => {
    const options = await apolloClient.query<
      GetAllCategoriesQuery,
      GetAllCategoriesQueryVariables
    >({
      query: GetAllCategoriesDocument,
    });

    setCategoryFilterOptions(
      options.data.categories.map((item) => ({
        title: item.name,
        value: item.name,
        type: item.type,
        checked: false,
      }))
    );
  };

  const getGeneralCategories = async () => {
    const options = await apolloClient.query<
      GetCategoryFiltersQuery,
      GetCategoryFiltersQueryVariables
    >({
      query: GetCategoryFiltersDocument,
    });

    if (options.data.__type && options.data.__type.enumValues) {
      setGeneralCategories(
        options.data.__type?.enumValues.map((item) => item.name)
      );
    }
  };

  const resetFilters = () => {
    setSexFilterOptions((prev) => resetFilterArrays(prev));
    setCategoryFilterOptions((prev) => resetFilterArrays(prev));
    setSearchValue('');
  };

  return (
    <FilterContext.Provider
      value={{
        sexFilterOptions,
        setSexFilterOptions,
        searchValue,
        setSearchValue,
        categoryFilterOptions,
        setCategoryFilterOptions,
        generalCategories,
        resetFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterState = () => {
  const filterState = useContext(FilterContext);

  if (!filterState)
    throw Error("You haven't registered filter context provider!");
  return filterState;
};
