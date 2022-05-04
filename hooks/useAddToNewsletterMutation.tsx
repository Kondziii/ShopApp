import { useMutation } from 'react-query';

export const useAddToNewsletterMutation = () => {
  return useMutation('add-to-newsletter', async (email: string) => {
    await fetch('http://localhost:3000/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email }),
    });
  });
};
