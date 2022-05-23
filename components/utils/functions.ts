export const formatPrice = (val: number) => {
  return (val / 100).toFixed(2);
};

export const sexCaption = (val: String) => {
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

export const mod = (number1: number, number2: number) => {
  return ((number1 % number2) + number2) % number2;
};

export const formRating = (number: number) => {
  return (number * 5) / 100;
};
