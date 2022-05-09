import { InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';
import { AppDisclosure } from '../components/AppDisclosure';
import {
  GetFaqDataDocument,
  GetFaqDataQuery,
  GetFaqDataQueryVariables,
} from '../generated/graphql';
import { apolloClient } from '../graphql/graphqlClient';

const sections = ['Order', 'Return', 'Product', 'Delivery'];

const faqPage = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log(data);

  const sectionHeaderCaption = (val: String) => {
    switch (val) {
      case 'Order':
        return 'Zamówienie';
      case 'Delivery':
        return 'Wysyłka i płatności';
      case 'Return':
        return 'Reklamacje i zwroty';
      case 'Product':
        return 'Informacje o produkcie';
    }
  };

  return (
    <div className='mb-8'>
      <NextSeo
        title='Stoopki | FAQ'
        description='Najczęściej zadawane pytania związane ze sklepem Stoopki'
      />
      <h1 className='my-6 text-3xl font-bold text-center'>
        Najczęściej zadawane pytania
      </h1>
      <hr />
      <div className='max-w-2xl mx-auto'>
        {sections.map((section) => {
          const sectionData = data.filter((item) => item.section === section);
          return (
            <div key={section}>
              <h2 className='my-4 font-semibold text-center uppercase text-md'>
                {sectionHeaderCaption(section)}
              </h2>
              {sectionData.map((item) => {
                return (
                  <AppDisclosure
                    key={item.id}
                    header={item.question}
                    content={item.answer}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default faqPage;

export const getStaticProps = async () => {
  const data = await apolloClient.query<
    GetFaqDataQuery,
    GetFaqDataQueryVariables
  >({
    query: GetFaqDataDocument,
  });

  return {
    props: {
      data: data.data.faqs,
    },
  };
};
