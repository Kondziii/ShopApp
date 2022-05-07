import { useMutation } from 'react-query';

export const useAddToNewsletterMutation = () => {
  return useMutation('add-to-newsletter', async (email: string) => {
    await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email }),
    });
  });
};
