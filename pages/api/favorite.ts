import { FavoriteAction } from './../../hooks/useFavoriteMutation';
import {
  AddToFavoriteMutation,
  AddToFavoriteDocument,
  AddToFavoriteMutationVariables,
  DeleteFromFavoriteMutation,
  DeleteFromFavoriteMutationVariables,
  DeleteFromFavoriteDocument,
} from './../../generated/graphql';
import { authApolloClient } from './../../graphql/graphqlClient';
import { NextApiHandler } from 'next';

interface favoriteHandlerProps {
  user: string;
  item: string;
  action?: FavoriteAction;
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST').status(405).json({});
    return;
  }

  const { user, item, action } = req.body as favoriteHandlerProps;

  if (!user || !item || !action) {
    return res.status(400).json({});
  }

  let response;

  switch (action) {
    case FavoriteAction.ADD:
      {
        response = await authApolloClient.mutate<
          AddToFavoriteMutation,
          AddToFavoriteMutationVariables
        >({
          mutation: AddToFavoriteDocument,
          variables: {
            user: user,
            item: item,
          },
        });
      }
      break;
    case FavoriteAction.DELETE:
      response = await authApolloClient.mutate<
        DeleteFromFavoriteMutation,
        DeleteFromFavoriteMutationVariables
      >({
        mutation: DeleteFromFavoriteDocument,
        variables: {
          user: user,
          item: item,
        },
      });
  }

  if (!response || !response.data || !response.data.updateAccount) {
    return res.status(500).json({});
  }

  return res.status(201).json({ data: response.data.updateAccount.favorites });
};

export default handler;
