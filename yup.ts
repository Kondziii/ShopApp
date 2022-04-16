import * as yup from 'yup';

yup.setLocale({
  mixed: {
    required: 'To pole jest wymagane',
  },
  string: {
    email: 'To pole musi zawierać prawidłowy adres email',
  },
});

export default yup;
