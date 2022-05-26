import Link from 'next/link';
import { AfterPaymentInfo } from '../../components/AfterPaymentInfo';

const CheckoutCancelPage = () => {
  return (
    <div className='flex items-center justify-center flex-grow w-full max-w-2xl mx-auto'>
      <AfterPaymentInfo>
        <h2 className='my-3 text-xl text-center font-bolder'>
          Twoje zamówienie zostało anulowane
        </h2>
        <p className='w-10/12 mx-auto text-sm text-justify text-gray-500'>
          Zamówienie, które próbowałeś złożyć zostało anulowane. Przedmioty,
          które cie interesują nadal znajdują się w twoim koszyku. Mamy
          nadzieję, że jeszcze nas odwiedzisz.
        </p>

        <div className='my-3 text-center'>
          <Link href={'/offer'}>
            <a className='mb-2 text-lg text-yellow-500 transition duration-300 hover:text-yellow-600'>
              Przejdź do oferty
            </a>
          </Link>
        </div>
      </AfterPaymentInfo>
    </div>
  );
};

export default CheckoutCancelPage;
