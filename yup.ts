import * as yup from 'yup';

yup.setLocale({
  mixed: {
    required: 'This field is required',
  },
  string: {
    email: 'This field has to be a valid email',
  },
});

export default yup;
