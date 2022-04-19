export const PersonalDetailsFields = [
  {
    container_classes: 'col-span-1',
    type: 'text',
    name: 'firstName',
    id: 'firstName',
    autoComplete: 'name',
    label: 'Firstname',
    placeholder: 'Firstname...',
  },
  {
    container_classes: 'col-span-1',
    name: 'lastName',
    type: 'text',
    id: 'lastName',
    autoComplete: 'name',
    label: 'Lastname',
    placeholder: 'Lastname...',
  },
  {
    container_classes: 'col-span-2',
    name: 'email',
    type: 'email',
    id: 'email',
    autoComplete: 'email',
    label: 'Email',
    placeholder: 'Email...',
  },
];

const provinces = [
  {
    title: 'dolnośląskie',
    value: 0,
  },
  {
    title: 'zachodniopomrskie',
    value: 1,
  },
  {
    title: 'wielkopolskie',
    value: 2,
  },
  {
    title: 'warmińsko-mazurskie',
    value: 3,
  },
  {
    title: 'świętokrzyskie',
    value: 4,
  },
  {
    title: 'śląskie',
    value: 5,
  },
  {
    title: 'pomorskie',
    value: 6,
  },
  {
    title: 'podlaskie',
    value: 7,
  },
  {
    title: 'podkarpackie',
    value: 8,
  },
  {
    title: 'opolskie',
    value: 9,
  },
  {
    title: 'mazowieckie',
    value: 10,
  },
  {
    title: 'małopolskie',
    value: 11,
  },
  {
    title: 'łódzkie',
    value: 12,
  },
  {
    title: 'lubuskie',
    value: 13,
  },
  {
    title: 'lubelskie',
    value: 14,
  },
  {
    title: 'kujawsko-pomorskie',
    value: 15,
  },
];

export const AddressDetailsFields = [
  {
    container_classes: 'col-span-3',
    name: 'city',
    type: 'text',
    id: 'city',
    autoComplete: 'street-address',
    label: 'City',
    placeholder: 'City...',
  },
  {
    container_classes: 'col-span-3',
    name: 'street',
    type: 'text',
    id: 'street',
    autoComplete: 'street-address',
    label: 'Street',
    placeholder: 'Street...',
  },
  {
    container_classes: 'col-span-2',
    name: 'homeNumber',
    type: 'number',
    id: 'homeNumber',
    autoComplete: 'street-address',
    label: 'Home number',
    placeholder: 'Home number...',
  },
  {
    container_classes: 'col-span-2',
    type: 'select',
    name: 'province',
    options: provinces,
    id: 'province',
    label: 'Province',
    placeholder: 'Province...',
  },
  {
    container_classes: 'col-span-2',
    type: 'text',
    name: 'postalCode',
    id: 'postalCode',
    label: 'Postal code',
    placeholder: 'Postal code...',
  },
];

export const CardDetailsFields = [
  {
    container_classes: 'col-span-full',
    name: 'cardName',
    type: 'text',
    id: 'cardName',
    autoComplete: 'cc-name',
    label: 'Name on card',
    placeholder: 'Name on card...',
  },
  {
    container_classes: 'col-span-full',
    name: 'cardNumber',
    type: 'text',
    id: 'cardNumber',
    autoComplete: 'cc-number',
    label: 'Card number',
    placeholder: 'Cart number...',
  },
  {
    container_classes: 'col-span-2',
    name: 'expiration',
    type: 'text',
    id: 'expiration',
    autoComplete: 'cc-exp',
    label: 'Expiration date',
    placeholder: 'Expiration date...',
  },
  {
    container_classes: 'col-span-2',
    name: 'cvv',
    type: 'text',
    id: 'cvv',
    autoComplete: 'cc-csc',
    label: 'CVV',
    placeholder: 'CVV...',
  },
];
