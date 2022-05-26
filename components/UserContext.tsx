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
import { toast } from 'react-toastify';
import { boolean } from 'yup';
import {
  GetAccountByEmailDocument,
  GetAccountByEmailQuery,
  GetAccountByEmailQueryVariables,
  GetAccountFavoriteItemsByEmailDocument,
  GetAccountFavoriteItemsByEmailQuery,
  GetAccountFavoriteItemsByEmailQueryVariables,
  ProductItemFragment,
} from '../generated/graphql';
import { apolloClient } from '../graphql/graphqlClient';
import {
  FavoriteAction,
  useFavoriteMutation,
} from '../hooks/useFavoriteMutation';

interface UserContextState {
  favorites: { id: string }[];
  setFavorites: Dispatch<SetStateAction<{ id: string }[]>>;
  addToFavorite: (item: string) => void;
  deleteFromFavorite: (item: string) => void;
  cookieAgreement: boolean;
  saveCookieAgreement: () => void;
}

const UserContext = createContext<UserContextState | null>(null);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<{ id: string }[]>([]);
  const session = useSession();
  const favoriteMutation = useFavoriteMutation();
  const [cookieAgreement, setCookieAgreement] = useState(false);

  const saveCookieAgreement = () => {
    localStorage.setItem('COOKIE_AGREEMENT', 'true');
    setCookieAgreement(true);
  };

  const getCookieAgreement = () => {
    const agreement = localStorage.getItem('COOKIE_AGREEMENT');
    setCookieAgreement(Boolean(agreement));
  };

  useEffect(() => {
    getCookieAgreement();
  }, []);

  const fetchUserData = async () => {
    const response = await apolloClient.query<
      GetAccountFavoriteItemsByEmailQuery,
      GetAccountFavoriteItemsByEmailQueryVariables
    >({
      query: GetAccountFavoriteItemsByEmailDocument,
      variables: {
        email: session.data!.user.email,
      },
    });
    if (response.data && response.data.account) {
      setFavorites(
        response.data.account.favorites.map((el) => {
          return {
            id: el.id,
          };
        })
      );
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
    if (favorites.find((el) => el.id === item)) {
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
    if (favoriteMutation.isSuccess) {
      if (favoriteMutation.variables?.action === FavoriteAction.ADD) {
        toast('Produkt został dodany do ulubionych', {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
        });
      } else {
        toast('Produkt został usunięty z ulubionych', {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
        });
      }
    }
  }, [favoriteMutation.isSuccess]);

  useEffect(() => {
    if (favoriteMutation.data) {
      setFavorites(favoriteMutation.data.data);
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
      value={{
        favorites,
        addToFavorite,
        deleteFromFavorite,
        setFavorites,
        cookieAgreement,
        saveCookieAgreement,
      }}
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
