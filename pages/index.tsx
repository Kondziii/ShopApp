import { InferGetStaticPropsType } from 'next';
import { AppCarousel } from '../components/AppCarousel';
import { AppMarquee } from '../components/AppMarquee';
import { NewsLetterForm } from '../components/NewsLetterForm';
import { SectionItem } from '../components/SectionItem';
import { SectionTitle } from '../components/SectionTitle';
import { TrustPilot } from '../components/TrustPilot';
import {
  GetCarouselDataDocument,
  GetCarouselDataQuery,
  GetCarouselDataQueryVariables,
  GetSocksSectionDocument,
  GetSocksSectionQuery,
  GetSocksSectionQueryVariables,
} from '../generated/graphql';
import { apolloClient } from '../graphql/graphqlClient';

const Home = ({
  slides,
  sections,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const socksSection = sections.filter(
    (section) => section.category?.type === 'Skarpety'
  );

  return (
    <>
      <AppCarousel items={slides} />
      <TrustPilot />
      <section>
        <SectionTitle title='Skarpety' />
        <hr />
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
          {socksSection.map((section) => {
            return <SectionItem key={section.title} item={section} />;
          })}
        </div>
      </section>

      <AppMarquee />

      <NewsLetterForm />
    </>
  );
};

export default Home;

export const getStaticProps = async () => {
  const slides = await apolloClient.query<
    GetCarouselDataQuery,
    GetCarouselDataQueryVariables
  >({
    query: GetCarouselDataDocument,
  });

  const sections = await apolloClient.query<
    GetSocksSectionQuery,
    GetSocksSectionQueryVariables
  >({
    query: GetSocksSectionDocument,
  });

  return {
    props: {
      slides: slides.data.carousels,
      sections: sections.data.sections,
    },
  };
};
