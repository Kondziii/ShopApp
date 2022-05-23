import { useMutation } from 'react-query';

export enum FavoriteAction {
  ADD = 'ADD',
  DELETE = 'DELETE',
}

export const useFavoriteMutation = () => {
  return useMutation(
    async (data: { user: string; item: string; action: FavoriteAction }) => {
      return await (
        await fetch('/api/favorite', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user: data.user,
            item: data.item,
            action: data.action,
          }),
        })
      ).json();
    },
    {
      async onSuccess(data, variables, context) {
        console.log(data);
      },
      onError() {
        console.log('error');
      },
    }
  );
};
