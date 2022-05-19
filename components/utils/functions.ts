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
