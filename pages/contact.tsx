import { NextSeo } from 'next-seo';
import React, { useEffect } from 'react';
import { Input } from '../components/Input';
import yup from '../yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextArea } from '../components/TextArea';
import { useForm } from 'react-hook-form';

const contactFormSchema = yup
  .object({
    email: yup.string().email().required(),
    title: yup.string().required(),
    text: yup.string().required(),
  })
  .required();

export type ContactForm = yup.InferType<typeof contactFormSchema>;

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ContactForm>({
    resolver: yupResolver(contactFormSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    console.log(values);
    await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...values }),
    });
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: '',
        title: '',
        text: '',
      });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className='px-4'>
      <NextSeo
        title='Stoopki | Kontakt'
        description='Sekcja kontaktu ze sklepem internetowym Stoopki.'
      />
      <h1 className='my-6 text-3xl font-bold text-center'>Kontakt</h1>
      <hr />
      <div className='grid sm:grid-cols-2 sm:gap-8'>
        <dl className='my-2 mb-6'>
          <dt className='my-2 font-semibold uppercase text-md'>
            Dane kontaktowe:
          </dt>
          <dd className='pl-4'>ul. Stefana Żeromskiego 116, 90-924 Łódź</dd>
          <dd className='pl-4'>+48 123 456 789</dd>
          <dd className='pl-4'>stoopki@gmail.com</dd>
          <dt className='my-2 font-semibold uppercase text-md'>
            Godziny kontaktowe:
          </dt>
          <dd className='pl-4'>Poniedziałek - Piątek od 8:00 do 16:00</dd>
          <dt className='my-2 font-semibold uppercase text-md'>
            Formularz kontaktowy:
          </dt>
          <dd>
            <form onSubmit={onSubmit} className='space-y-2'>
              <Input
                id='email'
                {...register('email')}
                label='Email'
                error={errors.email}
                autoComplete='email'
                type='text'
              />
              <Input
                id='title'
                {...register('title')}
                label='Tytuł'
                error={errors.title}
                type='text'
              />
              <TextArea
                id='text'
                {...register('text')}
                error={errors.text}
                label='Wiadomość'
                rows={4}
              />
              <div className='text-right'>
                <button
                  className='px-6 py-2 transition-all duration-300 border rounded-full border-slate-700 text-slate-700 w-fit hover:bg-slate-700 hover:text-white'
                  type='submit'
                >
                  Wyślij
                </button>
              </div>
            </form>
          </dd>
        </dl>
        <div className='mb-6'>
          <h2 className='my-2 font-semibold uppercase text-md'>Lokalizacja:</h2>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2469.9125374192054!2d19.447799415746342!3d51.75292287967615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471a34d85d16b6fb%3A0xebbb24f554f0028!2zU3RlZmFuYSDFu2Vyb21za2llZ28gMTE2LCA5MC0wMDEgxYHDs2TFug!5e0!3m2!1spl!2spl!4v1652106035255!5m2!1spl!2spl'
            loading='lazy'
            className='w-full h-auto min-h-[70vh]'
            allowFullScreen={true}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
