import { InferGetStaticPropsType } from 'next';
import { AppCarousel } from '../components/AppCarousel';
import { AppMarquee } from '../components/AppMarquee';
import { HomeSection } from '../components/HomeSection';
import { NewsLetterForm } from '../components/NewsLetterForm';
import { NewsSection } from '../components/NewsSection';
import { TrustPilot } from '../components/TrustPilot';
import {
  GetCarouselDataDocument,
  GetCarouselDataQuery,
  GetCarouselDataQueryVariables,
  GetNewsSectionDocument,
  GetNewsSectionQuery,
  GetNewsSectionQueryVariables,
  GetSocksSectionDocument,
  GetSocksSectionQuery,
  GetSocksSectionQueryVariables,
} from '../generated/graphql';
import { apolloClient } from '../graphql/graphqlClient';

const Home = ({
  slides,
  sections,
  news,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const socksSection = sections.filter(
    (section) => section.category?.type === 'Skarpety'
  );

  const underwearSection = sections.filter(
    (section) => section.category?.type === 'Bielizna'
  );

  return (
    <>
      <AppCarousel items={slides} />
      <TrustPilot />
      <HomeSection title='Skarpety' items={socksSection} />
      <HomeSection title='Bielizna' items={underwearSection} />
      <AppMarquee />
      <NewsLetterForm />
      <NewsSection news={news} />
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

  const newsSections = await apolloClient.query<
    GetNewsSectionQuery,
    GetNewsSectionQueryVariables
  >({
    query: GetNewsSectionDocument,
  });

  return {
    props: {
      slides: slides.data.carousels,
      sections: sections.data.sections,
      news: newsSections.data.newsSections,
    },
  };
};
