import * as yup from 'yup';

yup.setLocale({
  mixed: {
    required: 'To pole jest wymagane',
  },
  string: {
    email: 'To pole musi być poprawnym adresem email',
  },
});

export default yup;
