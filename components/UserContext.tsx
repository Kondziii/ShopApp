import { useSession } from 'next-auth/react';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  GetAccountByEmailDocument,
  GetAccountByEmailQuery,
  GetAccountByEmailQueryVariables,
} from '../generated/graphql';
import { apolloClient } from '../graphql/graphqlClient';
import {
  FavoriteAction,
  useFavoriteMutation,
} from '../hooks/useFavoriteMutation';

interface UserContextState {
  favorites: string[];
  setFavorites: Dispatch<SetStateAction<string[]>>;
  addToFavorite: (item: string) => void;
  deleteFromFavorite: (item: string) => void;
}

const UserContext = createContext<UserContextState | null>(null);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const session = useSession();
  const favoriteMutation = useFavoriteMutation();

  const fetchUserData = async () => {
    const response = await apolloClient.query<
      GetAccountByEmailQuery,
      GetAccountByEmailQueryVariables
    >({
      query: GetAccountByEmailDocument,
      variables: {
        email: session.data!.user.email,
      },
    });
    console.log('response', response);
    if (response.data && response.data.account) {
      setFavorites(response.data.account.favorites.map((item) => item.id));
    }
  };

  useEffect(() => {
    if (session.status === 'authenticated') {
      fetchUserData();
    }
  }, [session.status]);

  const addToFavorite = async (item: string) => {
    if (session.status !== 'authenticated') {
      return;
    }
    if (favorites.find((el) => el === item)) {
      deleteFromFavorite(item);
      return;
    }
    favoriteMutation.mutate({
      item: item,
      user: session.data.user.email,
      action: FavoriteAction.ADD,
    });
  };

  useEffect(() => {
    if (favoriteMutation.data) {
      setFavorites(favoriteMutation.data.data.map((item: any) => item.id));
    }
  }, [favoriteMutation.isSuccess, favoriteMutation.data]);

  const deleteFromFavorite = (item: string) => {
    if (!session || !session.data) {
      return;
    }
    favoriteMutation.mutate({
      item: item,
      user: session.data.user.email,
      action: FavoriteAction.DELETE,
    });
  };

  return (
    <UserContext.Provider
      value={{ favorites, addToFavorite, deleteFromFavorite, setFavorites }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserState = () => {
  const userState = useContext(UserContext);

  if (!userState) {
    throw new Error('User provider have not been registered');
  }

  return userState;
};
