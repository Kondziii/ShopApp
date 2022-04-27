import { useRouter } from 'next/router';

const CheckoutSuccessPage = () => {
  const router = useRouter();

  console.log(router.query.session_id);

  return <pre>{JSON.stringify(router.query.session_id, null, 2)}</pre>;
};

export default CheckoutSuccessPage;
